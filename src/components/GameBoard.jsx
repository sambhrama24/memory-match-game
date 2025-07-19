import React from 'react';
import Card from './Card';

const GameBoard = ({ cards, onCardClick, difficulty }) => {
  const getGridClass = () => {
    switch (difficulty) {
      case 'easy':
        return 'grid-4x4';
      case 'medium':
        return 'grid-6x6';
      case 'hard':
        return 'grid-8x8';
      default:
        return 'grid-4x4';
    }
  };

  return (
    <div className="game-board">
      <div className={`cards-grid ${getGridClass()}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => onCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard; 