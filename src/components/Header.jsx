import React from 'react';
import Timer from './Timer';

const Header = ({ 
  moves, 
  time, 
  isRunning, 
  onTimeUpdate, 
  onNewGame, 
  difficulty, 
  onDifficultyChange,
  resetTime
}) => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="game-title">
          <h1>F1 Memory Match</h1>
        </div>
        
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <span className="stat-label">Moves</span>
            <span className="stat-value">{moves}</span>
          </div>
          
          <div className="stat-item">
            <Timer isRunning={isRunning} onTimeUpdate={onTimeUpdate} resetTime={resetTime} />
          </div>
        </div>
        
        <div className="game-controls">
          <div className="difficulty-selector">
            <label htmlFor="difficulty">Difficulty:</label>
            <select 
              id="difficulty" 
              value={difficulty} 
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="difficulty-select"
            >
              <option value="easy">Easy (4x4)</option>
              <option value="medium">Medium (6x6)</option>
              <option value="hard">Hard (8x8)</option>
            </select>
          </div>
          
          <button onClick={onNewGame} className="new-game-btn">
            🎮 New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header; 