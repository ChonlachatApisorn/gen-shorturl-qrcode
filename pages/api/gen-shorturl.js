import shortid from 'shortid';

import { config } from '../../config/config';
import datas from '../../databases/data';

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            res.status(405).end(`Method ${req.method} Not Allowed`)
        }
        const body = req.body

        const genId = shortid.generate();
        const data = {
            id: genId,
            oldUrl: body.text,
            shortUrl: `${config.endpoint}/api/shorturl/${genId}`
        }
        datas.push(data)
        res.status(201).json(data)
    } catch (error) {
        res.status(500).end(`Internal Server Error: ${error.message}`)
    }
}
