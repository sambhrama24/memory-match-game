import React, { useState, useEffect, useCallback } from 'react';
import { createGameCards } from './data';
import { shuffleArray } from './utils/shuffle';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [resetTime, setResetTime] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Save high score to localStorage
  const saveHighScore = useCallback(() => {
    const highScores = JSON.parse(localStorage.getItem('f1MemoryHighScores') || '{}');
    const currentScore = { moves, time, difficulty, date: new Date().toISOString() };
    
    if (!highScores[difficulty] || moves < highScores[difficulty].moves) {
      highScores[difficulty] = currentScore;
      localStorage.setItem('f1MemoryHighScores', JSON.stringify(highScores));
    }
  }, [moves, time, difficulty]);

  // Initialize game
  const initializeGame = useCallback(() => {
    const gameCards = createGameCards(difficulty);
    const shuffledCards = shuffleArray(gameCards);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsRunning(true);
    setGameWon(false);
    setResetTime(true);
    // Reset the resetTime flag after a short delay
    setTimeout(() => setResetTime(false), 100);
  }, [difficulty]);

  // Start game on mount
  useEffect(() => {
    if (!showIntro) {
      initializeGame();
    }
  }, [difficulty, showIntro, initializeGame]);

  // Check for win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsRunning(false);
      setGameWon(true);
      saveHighScore();
    }
  }, [cards, saveHighScore]);

  // Handle card click
  const handleCardClick = (cardId) => {
    if (gameWon) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) {
      return;
    }

    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      setTimeout(() => {
        checkForMatch(newFlippedCards);
      }, 1000);
    }
  };

  // Check if flipped cards match
  const checkForMatch = (flippedCardIds) => {
    const [firstId, secondId] = flippedCardIds;
    const firstCard = cards.find(c => c.id === firstId);
    const secondCard = cards.find(c => c.id === secondId);

    if (firstCard.name === secondCard.name) {
      // Match found
      setCards(prev => prev.map(c => 
        flippedCardIds.includes(c.id) 
          ? { ...c, isMatched: true, isFlipped: true }
          : c
      ));
    } else {
      // No match, flip back
      setCards(prev => prev.map(c => 
        flippedCardIds.includes(c.id) 
          ? { ...c, isFlipped: false }
          : c
      ));
    }

    setFlippedCards([]);
  };

  // Get high score for current difficulty
  const getHighScore = () => {
    const highScores = JSON.parse(localStorage.getItem('f1MemoryHighScores') || '{}');
    return highScores[difficulty];
  };

  const handleNewGame = () => {
    initializeGame();
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const handleTimeUpdate = (newTime) => {
    setTime(newTime);
  };

  const handleStartGame = () => {
    setShowIntro(false);
  };

  return (
    <div className="App">
      {showIntro ? (
        <div className="intro-screen">
          <div className="intro-content">
            <div className="car-animation">
              <div className="car">🏎️</div>
            </div>
            <h1 className="intro-title">Memory Match</h1>
            <p className="intro-subtitle">Test your memory with racing-themed cards!</p>
            <button onClick={handleStartGame} className="start-game-btn">
              🚀 Start Race!
            </button>
          </div>
        </div>
      ) : (
        <div className="game-container">
          <Header
            moves={moves}
            time={time}
            isRunning={isRunning}
            onTimeUpdate={handleTimeUpdate}
            onNewGame={handleNewGame}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            resetTime={resetTime}
          />
          
          <GameBoard
            cards={cards}
            onCardClick={handleCardClick}
            difficulty={difficulty}
          />

          {gameWon && (
            <div className="win-overlay">
              <div className="win-modal">
                <h2> Congratulations! 🎉</h2>
                <p>You won in {moves} moves!</p>
                <p>Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
                {getHighScore() && (
                  <p className="high-score">
                    🏆 Best: {getHighScore().moves} moves
                  </p>
                )}
                <button onClick={handleNewGame} className="play-again-btn">
                  🎮 Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
