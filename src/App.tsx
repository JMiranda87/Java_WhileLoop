import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

function App() {
  const [number, setNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    generateNumber();
  }, []);

  const generateNumber = () => {
    setNumber(Math.floor(Math.random() * 101));
    setGuess('');
    setMessage('');
    setIsCorrect(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const guessNum = parseInt(guess);

    if (isNaN(guessNum)) {
      setMessage('Please enter a valid number');
    } else if (guessNum === number) {
      setMessage(`Yes, the number is ${number}`);
      setIsCorrect(true);
    } else if (guessNum > number) {
      setMessage('Your guess is too high');
    } else {
      setMessage('Your guess is too low');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Guess the Number</h1>
        <p className="mb-4 text-center">Guess a number between 0 and 100</p>
        <form onSubmit={handleGuess} className="mb-4">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter your guess"
            disabled={isCorrect}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            disabled={isCorrect}
          >
            Guess
          </button>
        </form>
        {message && (
          <p className={`text-center mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        {isCorrect && (
          <button
            onClick={generateNumber}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <RefreshCw className="mr-2" size={18} />
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}

export default App;