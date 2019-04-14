import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';


const port = 80;
const url = 'https://api.telegram.org/bot';
const apiToken = '805755787:AAFzSjZOcCIEekNCmdJ44n0ZRMA7ergAxCY';

const app = express();

// Configurations
app.use(bodyParser.json());

// Endpoints
app.post('/', (req, res) => {
    const chatID = req.body.message.chat.id;
    const messageSent = req.body.message.text;

    if (messageSent.match(/hello/gi)) {
        axios.post(`${url}${apiToken}/sendMessage`,
            {
                chat_id: chatID,
                text: 'hello back 👋!'
            })
            .then(response => {
                res.status(200).send(response);
            }).catch(error => {
                res.send(error);
            });
    } else {
        res.status(200).send({});
    }
});

// Listening
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
