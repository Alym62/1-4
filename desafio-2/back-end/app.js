const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/calculate', (req, res) => {
    const purchaseAmount = parseFloat(req.query.purchaseAmount);
    const money = parseFloat(req.query.money);

    if (isNaN(purchaseAmount) || isNaN(money)) {
        return res.status(400).json({ error: 'Valor inválido! 🚨' });
    };

    const changeAmount = money - purchaseAmount;

    if (changeAmount < 0) {
        return res.status(400).json({ error: 'Dinheiro insuficiente. 💸' });
    };

    const money_100 = Math.floor(changeAmount / 100);
    const reminingAmount_100 = changeAmount % 100;

    const money_10 = Math.floor(reminingAmount_100 / 10);
    const reminingAmount_10 = reminingAmount_100 % 10;

    const money_1 = Math.floor(reminingAmount_10);

    const change = {
        total: changeAmount.toFixed(2),
        money_100,
        money_10,
        money_1
    };

    res.json(change);
});

app.listen(port, () => {
    console.log(`O servidor está na porta ${port}`);
});