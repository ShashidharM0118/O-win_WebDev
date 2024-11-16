const express = require("express");
const twilio = require("twilio");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.use(bodyParser.json());

const accountSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const client = twilio(accountSid, authToken);

app.post("/send-whatsapp", (req, res) => {
    const { phoneNumber, message } = req.body;

    client.messages
        .create({
            body: "hi",
            from: "whatsapp:+14155238886", // Your Twilio Sandbox WhatsApp number
            to: `whatsapp:+919483746823`,
        })
        .then((message) => res.json({ success: true, messageSid: message.sid }))
        .catch((err) =>
            res.status(500).json({ success: false, error: err.message })
        );
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});