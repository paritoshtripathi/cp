import { Router, Request, Response } from 'express';
import { getErrorMessage, logErrorDetailsToFile } from '../utils/errorHandler';

const router = Router();

// Handle GET request for webhook verification
router.get('/', (req: Request, res: Response) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (token && token === 'Happy') {
        res.status(200).send(challenge+'11');
    } else {
        res.status(403).send('Forbidden');
    }
});

// Handle POST request for webhook events
router.post('/', (req: Request, res: Response) => {
    try {
        const event = req.body;
        console.log('Received webhook event:', event);
        res.status(200).send('Webhook received');
    } catch (error: unknown) {
        logErrorDetailsToFile(error);
        const errorMessage = getErrorMessage(error);
        res.status(500).json({ status: 'error', error: errorMessage });
    }
});

export default router;
