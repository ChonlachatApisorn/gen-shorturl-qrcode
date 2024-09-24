import datas from '../../../databases/data';
import { logger } from '../../../utils/loggerUtill';

export default async function handler(req, res) {
    logger.info(`get short url route`)
    try {
        if (req.method !== 'GET') {
            res.status(405).end(`Method ${req.method} Not Allowed`)
        }
        const { id } = req.query
        const result = datas.find((data) => (data.id == id))
        
        res.redirect(result.oldUrl)
        logger.info(JSON.stringify(result))
    } catch (error) {
        logger.error(JSON.stringify(error.message))
        res.status(500).end(`Internal Server Error: ${error.message}`)
    }
}
