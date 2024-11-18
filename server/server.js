require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
require('dotenv').config();
const cors = require("cors"); // Import the CORS package

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const recipientPhoneNumber = process.env.RECIPIENT_PHONE_NUMBER;

const client = twilio(accountSid, authToken);


const app = express();
const PORT = 3001;


app.use(cors()); 
app.use(bodyParser.json());


app.post("/send-message", async (req, res) => {
    const { type, comment } = req.body;

    // if (!type || !comment) {
    //     return res.status(400).json({ 
    //         success: false, 
    //         error: "Missing 'type' or 'comment' in request body." 
    //     });
    // }

    const msgOptions = {
       from: twilioPhoneNumber,
         to: recipientPhoneNumber,
        body: `Hey, there is new  ${type} nearby \n  ${comment}`,
    };

    try {
        const message = await client.messages.create(msgOptions);
        res.json({
            success: true,
            message: "SMS sent successfully!",
            messageSid: message.sid,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
