import datas from '../../../databases/data';

export default async function handler(req, res) {
    try {
        if (req.method !== 'GET') {
            res.status(405).end(`Method ${req.method} Not Allowed`)
        }
        const { id } = req.query
        const result = datas.filter((data) => (data.id == id))
        console.log(result);
        
        res.redirect(result[0].oldUrl)
    } catch (error) {
        res.status(500).end(`Internal Server Error: ${error.message}`)
    }
}
