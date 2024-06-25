import express from 'express';
import bodyParser from 'body-parser';
import sendMessageRoute from './routes/sendMessage';
import webhookRoute from './routes/webhook';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/sendMessage', sendMessageRoute);
app.use('/webhook', webhookRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
