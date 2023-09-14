import React, { useState } from 'react';
import './App.css';
import car from './car.png';

const App = () => {

  const [veiculo, setVeiculo] = useState<Veiculo>({
    modelo: '',
    anoFabricacao: 0,
    quatidadePortas: 0,
    marca: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVeiculo((prevVeiculo) => ({
      ...prevVeiculo,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(veiculo)
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar veículo. 🚨');
      }

      setVeiculo({
        modelo: '',
        anoFabricacao: 0,
        quantidadePortas: 0,
        marca: ''
      });

      alert('Veículo cadastrado com sucesso! 🟢');
    } catch (error) {
      console.error(error);
    };
  }
  return (
    <div className="App">
      <div className="left">
        <img src={car} alt="logo carro" />
        <h1>Cadastre o seu veículo.</h1>
        <p>O melhor site para cadastrar o seu veículo.</p>
        <button>Vamos!</button>
      </div>
      <div className="rigth">
        <h1>Cadastro de veículos: 🚗</h1>
        <div>
          <label>Modelo:</label>
          <input
            type="text"
            name="modelo"
            value={veiculo.modelo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Ano de Fabricação:</label>
          <input
            type="number"
            name="anoFabricacao"
            value={veiculo.anoFabricacao}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Quantidade de Portas:</label>
          <input
            type="number"
            name="quantidadePortas"
            value={veiculo.quantidadePortas}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Marca:</label>
          <input
            type="text"
            name="marca"
            value={veiculo.marca}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSubmit}>Cadastrar</button>
      </div>
    </div>
  );
}

export default App;
