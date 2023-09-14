const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`O servidor está na porta ${port}`);
});

app.get('/palindromes', (req, res) => {
    const start = parseInt(req.query.start);
    const end = parseInt(req.query.end);

    const palindromes = findPalindromesInRange(start, end);

    res.json({ palindromes });
});

function findPalindromesInRange(start, end) {
    const palindromes = [];

    for (let i = start; i <= end; i++) {
        if (isPalindrome(i.toString())) {
            palindromes.push(i);
        }
    }

    return palindromes;
}

function isPalindrome(str) {
    return str === str.split('').reverse().join('');
}