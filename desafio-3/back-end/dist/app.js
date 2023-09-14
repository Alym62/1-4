"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const app = (0, express_1.default)();
const port = 3001;
const dbFilePath = 'veiculos.json';
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.listen(port, () => {
    console.log(`O servidor está na porta ${port}`);
});
;
class Carro {
    constructor(modelo, anoFabricacao, quantidadePortas, marca) {
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.quantidadePortas = quantidadePortas;
        this.marca = marca;
    }
}
class Moto {
    constructor(modelo, anoFabricacao, quantidadePortas, marca) {
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.quantidadePortas = quantidadePortas;
        this.marca = marca;
    }
}
app.post('/cadastrar', (req, res) => {
    try {
        const novoVeiculo = req.body;
        const veiculos = fs_extra_1.default.readJSONSync(dbFilePath, { throws: false }) || [];
        veiculos.push(novoVeiculo);
        fs_extra_1.default.writeJSONSync(dbFilePath, veiculos);
        res.status(201).json(novoVeiculo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno no servidor. 🚨' });
    }
});
