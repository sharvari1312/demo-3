const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

// Enable CORS for the frontend origin
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.post('/chat', (req, res) => {
    const message = req.body.message;
    // Simple reply logic (you can connect your AI model here)
    const replyText = `You said: '${message}'. This is a response from the Node.js backend!`;
    res.json({ reply: replyText });
});

app.listen(port, '127.0.0.1', () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});
