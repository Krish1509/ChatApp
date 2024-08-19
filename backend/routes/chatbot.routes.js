// routes/chatbot.routes.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt,
            max_tokens: 150,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error communicating with GPT API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
