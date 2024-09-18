export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
        const random = (Math.random() * 100 )
        return res.status(200).json({ message: `hello world ${random}`})
    } catch (error) {
        return res.status(500).json({error: error})
    }
}