const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/buscar-cep/:cep', async (req, res) => {
    const cep = req.params.cep.replace(/\D/g, '');

    if (cep.length !== 8) {
        res.status(400).json({ error: 'CEP invalído' });
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error('CEP não encontrado.');
        }

        const data = await response.json();

        if (data.erro) {
            res.status(404).json({ error: 'CEP não encontrado.' });
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro na busca do CEP.' });
    };
});

app.listen(port, () => {
    console.log(`O servidor está na porta ${port}`);
});