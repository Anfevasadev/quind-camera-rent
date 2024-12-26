import React, { useState } from 'react';
import '../styles/pages/Bonus.css';

const Bonus = () => {
  const [phrase, setPhrase] = useState('');
  const [positionMessage, setPositionMessage] = useState('');
  const [number, setNumber] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [maxNumberMessage, setMaxNumberMessage] = useState('');

  const handlePhraseChange = (e) => {
    setPhrase(e.target.value);
  };

  const handleFindPosition = () => {
    const position = phrase.indexOf('a');
    if (position !== -1) {
      setPositionMessage(`La letra 'a' está en la posición: ${position + 1}`);
    } else {
      setPositionMessage('La letra \'a\' no se encuentra en la frase.');
    }
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleAddNumber = () => {
    if (number !== '') {
      setNumbers([...numbers, number]);
      setNumber('');
    }
  };

  const handleCalculateMaxNumber = () => {
    const sortedNumbers = numbers.sort((a, b) => (b + a) - (a + b));
    const maxNumber = sortedNumbers.join('');
    setMaxNumberMessage(`El mayor número posible es: ${maxNumber}`);
  };

  return (
    <div className="bonus">
      <h1>Bonus</h1>
      <div className="bonus__section">
        <h2>Buscar posición de 'a'</h2>
        <input
          type="text"
          value={phrase}
          onChange={handlePhraseChange}
          placeholder="Ingresa una frase"
        />
        <button onClick={handleFindPosition}>Buscar posición de 'a'</button>
        {positionMessage && <p>{positionMessage}</p>}
      </div>
      <div className="bonus__section">
        <h2>Calcular el mayor número posible</h2>
        <input
          type="number"
          value={number}
          onChange={handleNumberChange}
          placeholder="Ingresa un número"
        />
        <button onClick={handleAddNumber}>Agregar</button>
        <div>
          {numbers.map((num, index) => (
            <p key={index}>{num}</p>
          ))}
        </div>
        <button onClick={handleCalculateMaxNumber}>Calcular el mayor número posible</button>
        {maxNumberMessage && <p>{maxNumberMessage}</p>}
        <button onClick={()=>setNumbers([])} >Borrar números</button>
      </div>
    </div>
  );
};

export default Bonus;