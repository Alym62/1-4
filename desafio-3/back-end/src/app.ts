import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs-extra';

const app = express();
const port = 3001;
const dbFilePath = 'veiculos.json';

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`O servidor está na porta ${port}`);
});

interface Veiculo {
    modelo: string;
    anoFabricacao: number;
    quantidadePortas: number;
    marca: string;
};

class Carro implements Veiculo {
    constructor(
        public modelo: string,
        public anoFabricacao: number,
        public quantidadePortas: number,
        public marca: string
    ) { }
}

class Moto implements Veiculo {
    constructor(
        public modelo: string,
        public anoFabricacao: number,
        public quantidadePortas: number,
        public marca: string
    ) { }
}

app.post('/cadastrar', (req, res) => {
    try {
        const novoVeiculo: Veiculo = req.body;
        const veiculos: Veiculo[] = fs.readJSONSync(dbFilePath, { throws: false }) || [];
        veiculos.push(novoVeiculo);
        fs.writeJSONSync(dbFilePath, veiculos);
        res.status(201).json(novoVeiculo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno no servidor. 🚨' });
    }
})