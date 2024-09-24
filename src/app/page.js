"use client";

import { useState } from 'react';

import QRCode from 'qrcode';

export default function Home() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const qrCodeDataURL = await QRCode.toDataURL(text);
    
    const resLink = await fetch('/api/gen-shorturl', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    })

    const dataLink = await resLink.json();

    if (resLink.ok) {
      setLink(dataLink.shortUrl);
      setQrCode(qrCodeDataURL)
    } else {
      alert('Failed to generate Please refresh page');
    }
  };

  const copyLink = (e) => {
    navigator.clipboard.writeText(link)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className='div-body'>
      <div className='content'>
        <h1>Lets's Get Generate</h1>
        <form onSubmit={handleSubmit} className='from-div'>
          <input
            type='text'
            placeholder="Enter the link here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Generate</button>
        </form>

        {qrCode && (
          <div className='qr-code'>
            <h3>Your QR Code:</h3>
            <img src={qrCode} alt="Generated QR Code" />
          </div>
        )}

        {link && (
          <div className='short-url'>
            <div className='link-url'>
              <label href={link}> {link} </label>
            </div>
            <div className="copy-container">
              <div className='clipboard' onClick={copyLink}>COPY</div>
              {copied && (
                <div className='copied-popup'>
                  Copied!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
