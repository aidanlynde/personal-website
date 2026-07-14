import { Router, Request, Response } from 'express'
import multer from 'multer'
import OpenAI, { toFile } from 'openai'
import { auth } from '../middleware/auth'

const router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } })

router.post('/', auth, upload.single('audio'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No audio file provided' })
      return
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const audioFile = await toFile(req.file.buffer, 'recording.webm', { type: req.file.mimetype || 'audio/webm' })

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'en',
    })

    res.json({ transcript: transcription.text })
  } catch (err) {
    console.error('Transcription error:', err)
    res.status(500).json({ error: 'Transcription failed' })
  }
})

export default router
