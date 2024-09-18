"use client";

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const option = {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    }

    const [ resQR, resLink ] = await Promise.all([
      fetch('/api/gen-qrcode', option),
      fetch('/api/gen-shorturl', option)
    ])
    
    const dataQrCode = await resQR.json();
    const dataLink = await resLink.json();

    if (resQR.ok && resLink.ok) {
      setLink(dataLink.shortUrl);
      setQrCode(dataQrCode.qrCode);
    } else {
      alert('Failed to generate Please refresh page');
    }
  };

  const copyLink = (e) => {
    navigator.clipboard.writeText(link)
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
            <div className='clipboard' onClick={copyLink}>COPY</div>
          </div>
        )}
      </div>
    </div>
  );
}
