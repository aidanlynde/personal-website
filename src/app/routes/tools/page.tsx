// src/app/routes/tools/page.tsx
"use client";

import { usePathname } from 'next/navigation';
import Layout from '../../components/Layout';
import React, { useState } from 'react';

export default function ToolsPage() {
  const currentPath = usePathname() ?? ''; // Fallback to empty string if null

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<
    { originalName: string; url: string }[]
  >([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListExpanded, setIsListExpanded] = useState(false); // New state for toggling list

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessages([]);
    setConvertedFiles([]);
    setIsListExpanded(false); // Reset the list when new files are selected

    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const filesArray = Array.from(files);
    setSelectedFiles(filesArray);
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessages(['No files selected for conversion.']);
      return;
    }

    setLoading(true);

    const newConvertedFiles: { originalName: string; url: string }[] = [];
    const newErrorMessages: string[] = [];

    // Dynamically import heic2any on the client side
    let heic2any: (options: Heic2AnyOptions) => Promise<Blob | Blob[]>;
    try {
      const heic2anyModule = await import('heic2any');
      heic2any = heic2anyModule.default;
    } catch (error) {
      console.error('Failed to load heic2any:', error);
      setErrorMessages(['Failed to load the conversion library.']);
      setLoading(false);
      return;
    }

    for (const file of selectedFiles) {
      if (file.type !== 'image/heic' && file.type !== 'image/heif') {
        newErrorMessages.push(`File ${file.name} is not a HEIC file.`);
        continue;
      }

      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/png',
        });

        let blob: Blob;
        if (Array.isArray(convertedBlob)) {
          blob = convertedBlob[0];
        } else {
          blob = convertedBlob;
        }

        const url = URL.createObjectURL(blob);
        newConvertedFiles.push({ originalName: file.name, url });
      } catch (e) {
        console.error(e);
        newErrorMessages.push(`Failed to convert file ${file.name}.`);
      }
    }

    setConvertedFiles(newConvertedFiles);
    setErrorMessages(newErrorMessages);
    setLoading(false);
    setIsListExpanded(false); // Reset the list to collapsed state after conversion
  };

  interface Heic2AnyOptions {
    blob: Blob;
    toType?: string;
    quality?: number;
  }

  return (
    <Layout currentPath={currentPath}>
      <h1>Tools</h1>
      <p>*more tools coming soon</p>

      <h2>HEIC to PNG Converter</h2>
      <input type="file" accept=".heic,.HEIC" multiple onChange={handleFileChange} />
      <button onClick={handleConvert} disabled={loading}>
        {loading ? 'Converting...' : 'Convert'}
      </button>

      {errorMessages.length > 0 &&
        errorMessages.map((msg, index) => (
          <p key={index} style={{ color: 'red' }}>
            {msg}
          </p>
        ))}

      {convertedFiles.length > 0 && (
        <div>
          <h3>Converted Files:</h3>
          <button onClick={() => setIsListExpanded(!isListExpanded)}>
            {isListExpanded ? 'Hide Download Links' : 'Show Download Links'}
          </button>

          {isListExpanded && (
            <ul>
              {convertedFiles.map((file, index) => {
                const downloadFileName = file.originalName.replace(/\.[^/.]+$/, '.png');
                return (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <span>{downloadFileName}</span>{' '}
                    <a
                      href={file.url}
                      download={downloadFileName}
                      style={{ color: '#104827' }} // Replace with your site's color or class
                    >
                      Download
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </Layout>
  );
}
