const express = require('express');
const tex2svg = require('node-tikzjax').default;
const cors = require('cors'); 

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 9000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/generate', async (req, res) => {
    const input = req.body.code;  
    try {
        const svg = await tex2svg(input, {
            showConsole: true,
        });
        res.json({ "output": svg });  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
