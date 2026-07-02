import React from 'react';
import { useCurrentBoard } from '../context/CurrentBoardContext';

const Card = ({ card, listId }) => {
  const { board, moveCard } = useCurrentBoard();

  return (
    <div style={{
      background: '#fff',
      padding: '12px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{card.title}</span>
      
      {/* Action: Move Card feature via event handling menu */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontSize: '11px', color: '#777' }}>Move to:</span>
        <select 
          value={listId}
          onChange={(e) => moveCard(card.id, listId, e.target.value)}
          style={{ fontSize: '12px', padding: '2px 4px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          {board.lists.map(l => (
            <option key={l.id} value={l.id}>{l.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Card;