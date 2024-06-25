import { Router, Request, Response } from 'express';
import waClient from '../utils/whatsappClient';
import { getErrorMessage, logErrorDetailsToFile } from '../utils/errorHandler';

const router = Router();

router.post('/', async (req: Request, result: Response) => {
    const { recipient_number, message_body } = req.body;

    // try {
    //     const sentTextMessage = await waClient.messages.text({ body: message_body }, recipient_number);
    //     logErrorDetailsToFile(sentTextMessage)
    //     res.json({ status: 'success', data: sentTextMessage.rawResponse() });
    // } catch (error: unknown) {
    //     logErrorDetailsToFile(error); // Log detailed error information to a file
    //     const errorMessage = getErrorMessage(error); // Get a simplified error message
    //     res.status(500).json({ status: 'error', error: errorMessage }); // Send simplified error message to client
    // }
    try{
        const sent_text_message = waClient.messages.text( { "body" : message_body }, recipient_number );
        await sent_text_message.then( ( res ) =>
        {
            logErrorDetailsToFile(res.rawResponse());
            result.status(200).json({ status: "success", data: res.statusCode });
        } );
        
    }
    catch( e )
    {
        console.log( JSON.stringify( e ) );
        logErrorDetailsToFile(e);
    }
});

export default router;
