import React, { useState } from 'react';
import Card from './card';
import { useCurrentBoard } from '../context/CurrentBoardContext';

const List = ({ list }) => {
  const { createCard } = useCurrentBoard();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!cardTitle.trim()) return;
    createCard(list.id, cardTitle);
    setCardTitle('');
    setIsAddingCard(false);
  };

  return (
    <div style={{
      background: '#f1f2f4',
      width: '272px',
      padding: '12px',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 'bold', color: '#172b4d' }}>{list.title}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {list.cards.map(card => (
          <Card key={card.id} card={card} listId={list.id} />
        ))}
      </div>

      {/* Conditional Rendering Form for creating cards */}
      {isAddingCard ? (
        <form onSubmit={handleAddCardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <input 
            type="text" 
            placeholder="Card title..."
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            autoFocus
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' }}
          />
          <div style={{ display: 'flex', gap: '4px' }}>
            <button type="submit" style={{ background: '#0079bf', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
            <button type="button" onClick={() => setIsAddingCard(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}>✕</button>
          </div>
        </form>
      ) : (
        <button 
          onClick={() => setIsAddingCard(true)}
          style={{ background: 'none', border: 'none', color: '#5e6c84', textAlign: 'left', padding: '6px', cursor: 'pointer', borderRadius: '6px' }}
        >
          + Add a card
        </button>
      )}
    </div>
  );
};

export default List;