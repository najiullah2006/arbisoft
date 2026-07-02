import React from 'react';

const Card = ({ card }) => {
  return (
    <div className="trello-card" style={{
      background: '#fff',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
    }}>
      <h4>{card.title}</h4>
      {card.description && <p style={{ fontSize: '12px', color: '#666' }}>{card.description}</p>}
    </div>
  );
};

export default Card;