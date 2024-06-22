import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    // Fetch exchange rates
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount(amount * rate);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div className="container">
      <h1 className="header">Currency Converter</h1>
      <div className="currency-container">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="input"
        />
        <select
          value={fromCurrency}
          onChange={e => setFromCurrency(e.target.value)}
          className="select"
        >
          {Object.keys(rates).map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span>to</span>
        <select
          value={toCurrency}
          onChange={e => setToCurrency(e.target.value)}
          className="select"
        >
          {Object.keys(rates).map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="result">
        <h2>{amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}</h2>
      </div>
    </div>
  );
};

export default CurrencyConverter;
