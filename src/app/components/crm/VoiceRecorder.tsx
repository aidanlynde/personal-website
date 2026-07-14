'use client'

import { useState, useRef, useCallback } from 'react'
import { crmUpload } from '@/lib/crm-api'

interface Props {
  onTranscript: (text: string) => void
  disabled?: boolean
}

type State = 'idle' | 'recording' | 'transcribing' | 'error'

export function VoiceRecorder({ onTranscript, disabled }: Props) {
  const [state, setState] = useState<State>('idle')
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const startRecording = useCallback(async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm'

      const recorder = new MediaRecorder(stream, { mimeType })
      chunks.current = []

      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.current.push(e.data)
      }

      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        clearInterval(timer.current!)
        setDuration(0)

        const blob = new Blob(chunks.current, { type: mimeType })
        setState('transcribing')

        try {
          const form = new FormData()
          form.append('audio', blob, 'recording.webm')
          const res = await crmUpload('/transcribe', form)
          const data = await res.json()
          if (!res.ok) throw new Error(data.error)
          onTranscript(data.transcript)
          setState('idle')
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Transcription failed')
          setState('error')
        }
      }

      recorder.start(250)
      mediaRecorder.current = recorder
      setState('recording')

      setDuration(0)
      timer.current = setInterval(() => setDuration(d => d + 1), 1000)
    } catch {
      setError('Microphone access denied')
      setState('error')
    }
  }, [onTranscript])

  const stopRecording = useCallback(() => {
    mediaRecorder.current?.stop()
  }, [])

  const formatDuration = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  if (state === 'recording') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#E53935', animation: 'pulse 1s infinite' }} />
        <span style={{ fontSize: '0.85rem', color: '#E53935', fontWeight: 500 }}>
          Recording {formatDuration(duration)}
        </span>
        <button onClick={stopRecording} style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #E53935', background: '#fff', color: '#E53935', cursor: 'pointer', fontSize: '0.8rem' }}>
          Stop
        </button>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
      </div>
    )
  }

  if (state === 'transcribing') {
    return <div style={{ fontSize: '0.85rem', color: '#555' }}>Transcribing...</div>
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={startRecording}
        disabled={disabled}
        title="Record voice note"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 6, border: '1px solid #104827',
          background: '#fff', color: '#104827', cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: '0.82rem', fontWeight: 500, opacity: disabled ? 0.5 : 1,
        }}
      >
        <MicIcon /> Voice Note
      </button>
      {state === 'error' && (
        <span style={{ fontSize: '0.78rem', color: '#E53935' }}>{error}</span>
      )}
    </div>
  )
}

function MicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  )
}
