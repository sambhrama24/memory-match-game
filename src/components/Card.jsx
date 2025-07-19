import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ card, isFlipped, onClick, isMatched }) => {
  return (
    <div 
      onClick={onClick} 
      className={`card-container ${isMatched ? 'matched' : ''}`}
      style={{ cursor: isMatched ? 'default' : 'pointer' }}
    >
      <motion.div
        className="card"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.6,
          ease: "easeInOut"
        }}
        style={{ 
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        <div className="card-front">
          <div className="card-content">
            <span className="question-mark">?</span>
          </div>
        </div>
        <div className="card-back">
          <div className="card-content">
            <span className="card-emoji">{card.src}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card; 