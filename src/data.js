export const f1Cards = [
  { id: 1, src: '🏎️', alt: 'F1 Car', name: 'F1 Car' },
  { id: 2, src: '👑', alt: 'Champion', name: 'Champion' },
  { id: 3, src: '🏆', alt: 'Trophy', name: 'Trophy' },
  { id: 4, src: '🏁', alt: 'Checkered Flag', name: 'Checkered Flag' },
  { id: 5, src: '⚡', alt: 'Speed', name: 'Speed' },
  { id: 6, src: '🔥', alt: 'Fire', name: 'Fire' },
  { id: 7, src: '💨', alt: 'Wind', name: 'Wind' },
  { id: 8, src: '⭐', alt: 'Star', name: 'Star' },
  { id: 9, src: '💖', alt: 'Heart', name: 'Heart' },
  { id: 10, src: '🎀', alt: 'Ribbon', name: 'Ribbon' },
  { id: 11, src: '🌸', alt: 'Cherry Blossom', name: 'Cherry Blossom' },
  { id: 12, src: '🦋', alt: 'Butterfly', name: 'Butterfly' },
  { id: 13, src: '🌈', alt: 'Rainbow', name: 'Rainbow' },
  { id: 14, src: '✨', alt: 'Sparkles', name: 'Sparkles' },
  { id: 15, src: '🎪', alt: 'Circus', name: 'Circus' },
  { id: 16, src: '🎠', alt: 'Carousel', name: 'Carousel' },
  { id: 17, src: '🎡', alt: 'Ferris Wheel', name: 'Ferris Wheel' },
  { id: 18, src: '🎢', alt: 'Roller Coaster', name: 'Roller Coaster' },
  { id: 19, src: '🎭', alt: 'Theater', name: 'Theater' },
  { id: 20, src: '🎨', alt: 'Artist', name: 'Artist' },
  { id: 21, src: '🎤', alt: 'Microphone', name: 'Microphone' },
  { id: 22, src: '🎧', alt: 'Headphones', name: 'Headphones' },
  { id: 23, src: '🎵', alt: 'Music', name: 'Music' },
  { id: 24, src: '🎶', alt: 'Musical Notes', name: 'Musical Notes' },
  { id: 25, src: '🎸', alt: 'Guitar', name: 'Guitar' },
  { id: 26, src: '🎹', alt: 'Piano', name: 'Piano' },
  { id: 27, src: '🎺', alt: 'Trumpet', name: 'Trumpet' },
  { id: 28, src: '🎻', alt: 'Violin', name: 'Violin' },
  { id: 29, src: '🥁', alt: 'Drum', name: 'Drum' },
  { id: 30, src: '🎼', alt: 'Sheet Music', name: 'Sheet Music' },
  { id: 31, src: '🎬', alt: 'Movie Camera', name: 'Movie Camera' },
  { id: 32, src: '🎭', alt: 'Performing Arts', name: 'Performing Arts' }
];

// Create pairs for the game (each card appears twice)
export const createGameCards = (difficulty = 'easy') => {
  let cardCount;
  switch (difficulty) {
    case 'easy':
      cardCount = 8; // 4x4 grid
      break;
    case 'medium':
      cardCount = 18; // 6x6 grid
      break;
    case 'hard':
      cardCount = 32; // 8x8 grid
      break;
    default:
      cardCount = 8;
  }
  
  const selectedCards = f1Cards.slice(0, cardCount);
  const gameCards = [...selectedCards, ...selectedCards]; // Duplicate each card
  
  return gameCards.map((card, index) => ({
    ...card,
    id: `${card.id}-${index}`,
    isFlipped: false,
    isMatched: false
  }));
}; 