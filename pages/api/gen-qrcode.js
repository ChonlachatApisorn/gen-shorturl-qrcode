import QRCode from 'qrcode';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required to generate QR code' });
  }

  try {
    // Generate the QR code
    const qrCodeDataURL = await QRCode.toDataURL(text);

    // Return the generated QR code as a response
    return res.status(200).json({ qrCode: qrCodeDataURL });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return res.status(500).json({ message: 'Failed to generate QR code' });
  }
}
