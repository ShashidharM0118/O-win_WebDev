require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors"); // Import the CORS package

// Twilio credentials from .env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001; // Port can also be stored in .env

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// POST endpoint to send SMS
app.post("/send-message", async (req, res) => {
    const { messageBody } = req.body; // Get the message body from the request

    if (!messageBody) {
        return res.status(400).json({ success: false, error: "Missing 'messageBody' in request body." });
    }

    const msgOptions = {
        from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number
        to: process.env.RECIPIENT_PHONE_NUMBER, // Recipient's phone number
        body: messageBody, // Message to send
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
