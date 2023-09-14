import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

const App = () => {

    const [purchaseAmount, setPurchaseAmount] = useState('');
    const [money, setMoney] = useState('');
    const [change, setChange] = useState(null);

    const calculateChange = () => {
        axios.get(`http://localhost:3001/calculate?purchaseAmount=${purchaseAmount}&money=${money}`)
            .then((response) => {
                setChange(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className='main-container'>
            <h1>Caixa:</h1>
            <div className='purchase-value'>
                <label htmlFor="valorCompra">Valor da compra:</label>
                <input type="number" name="" id="" value={purchaseAmount} onChange={(e) => setPurchaseAmount(e.target.value)} />
            </div>
            <div className='money-delivered'>
                <label htmlFor="notasEntregues">Notas entregues:</label>
                <input type="number" name="" id="" value={money} onChange={(e) => setMoney(e.target.value)} />
            </div>
            <button onClick={calculateChange} id='btn'>Troco</button>

            {change && (
                <div className='result'>
                    <h2>Troco:</h2>
                    <p>Valor da compra: R$ {purchaseAmount}</p>
                    <p>Valor do troco: R$ {change.total}</p>
                    <p>Notas de R$100: {change.money_100}</p>
                    <p>Notas de R$10: {change.money_10}</p>
                    <p>Notas de R$1: {change.money_1}</p>
                </div>
            )}
        </div>
    )
}

export default App;