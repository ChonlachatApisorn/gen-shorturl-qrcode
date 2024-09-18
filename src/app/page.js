"use client";

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to the API
    const responseQrCode = await fetch('/api/gen-qrcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const responseLink = await fetch('/api/gen-shorturl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const dataQrCode = await responseQrCode.json();
    const dataLink = await responseLink.json();

    if (responseQrCode.ok && responseLink.ok) {
      setLink(dataLink.shortUrl);
      setQrCode(dataQrCode.qrCode);
    } else {
      console.error('Failed to generate QR code:', dataQrCode.message);
      console.error('Failed to generate short URL:', dataLink.message);
    }
  };
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Generate QR Code</button>
      </form>

      {qrCode && (
        <div>
          <h3>Your QR Code:</h3>
          <img src={qrCode} alt="Generated QR Code" />
        </div>
      )}

      {link && (
        <div>
          <a href={link}> {link} </a>
        </div>
      )}
    </div>
  );
}
