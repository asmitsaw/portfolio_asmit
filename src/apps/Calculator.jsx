/**
 * Windows 98 Calculator App
 * 
 * Basic calculator with Windows 98 styling
 */

import React, { useState } from 'react';
import Window from '../components/Window';

const Calculator = ({ windowId = 'calculator' }) => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperation = (op) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentValue = prevValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPrevValue(newValue);
    }

    setNewNumber(true);
    setOperation(op);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return secondValue !== 0 ? firstValue / secondValue : 0;
      default: return secondValue;
    }
  };

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const inputValue = parseFloat(display);
      const newValue = calculate(prevValue, inputValue, operation);

      setDisplay(String(newValue));
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setNewNumber(false);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const buttonStyle = {
    width: '50px',
    height: '30px',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: '2px solid',
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#808080',
    borderBottomColor: '#808080',
    background: '#c0c0c0',
  };

  const buttonActiveStyle = {
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderRightColor: '#ffffff',
    borderBottomColor: '#ffffff',
  };

  return (
    <Window windowId={windowId} isDialog={true}>
      <div
        className="p-2"
        style={{ background: 'hsl(var(--win98-gray))' }}
      >
        {/* Display */}
        <div
          style={{
            width: '100%',
            height: '40px',
            background: '#000000',
            color: '#00ff00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            marginBottom: '4px',
            fontFamily: 'Courier New, monospace',
            fontSize: '18px',
            fontWeight: 'bold',
            border: '2px inset #808080',
          }}
        >
          {display}
        </div>

        {/* Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
          {/* Row 1 */}
          <button style={buttonStyle} onClick={handleClear}>C</button>
          <button style={buttonStyle} onClick={() => handleOperation('/')}>/</button>
          <button style={buttonStyle} onClick={() => handleOperation('*')}>*</button>
          <button style={buttonStyle} onClick={() => handleOperation('-')}>-</button>

          {/* Row 2 */}
          <button style={buttonStyle} onClick={() => handleNumber(7)}>7</button>
          <button style={buttonStyle} onClick={() => handleNumber(8)}>8</button>
          <button style={buttonStyle} onClick={() => handleNumber(9)}>9</button>
          <button
            style={{ ...buttonStyle, gridRow: 'span 2', height: '62px' }}
            onClick={() => handleOperation('+')}
          >
            +
          </button>

          {/* Row 3 */}
          <button style={buttonStyle} onClick={() => handleNumber(4)}>4</button>
          <button style={buttonStyle} onClick={() => handleNumber(5)}>5</button>
          <button style={buttonStyle} onClick={() => handleNumber(6)}>6</button>

          {/* Row 4 */}
          <button style={buttonStyle} onClick={() => handleNumber(1)}>1</button>
          <button style={buttonStyle} onClick={() => handleNumber(2)}>2</button>
          <button style={buttonStyle} onClick={() => handleNumber(3)}>3</button>
          <button
            style={{ ...buttonStyle, gridRow: 'span 2', height: '62px' }}
            onClick={handleEquals}
          >
            =
          </button>

          {/* Row 5 */}
          <button
            style={{ ...buttonStyle, gridColumn: 'span 2', width: '102px' }}
            onClick={() => handleNumber(0)}
          >
            0
          </button>
          <button style={buttonStyle} onClick={handleDecimal}>.</button>
        </div>
      </div>
    </Window>
  );
};

export default Calculator;
