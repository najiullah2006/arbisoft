import React from 'react';
import { useCurrentBoard } from '../context/CurrentBoardContext';

const Card = ({ card, listId }) => {
  const { board, moveCard } = useCurrentBoard(); // The Card component represents an individual card within a list. 
  // It displays the card's title and provides a dropdown to move the card to a different list within the same board.

  // The Card component represents an individual card within a list. It displays the card's title and 
  // provides a dropdown to move the card to a different list within the same board.

  return (
    <div style={{
      background: '#fff',
      padding: '12px',
      borderRadius: '30px',
      color: 'rgb(51, 17, 17)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
      // all the visual styling is done here.
    }}>

    
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{card.title} </span> 
      
      {/* Action: Move Card feature via event handling menu */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontSize: '11px', color: '#777' }}>Move to:</span>
        <select 
          value={listId}
          onChange={(e) => moveCard(card.id, listId, e.target.value)} // moves betweem the columns.
          style={{ fontSize: '12px', padding: '2px 4px', borderRadius: '10px', border: '1px solid #ccc' }} //dropdown option 
        >
          {board.lists.map(l => (
            <option key={l.id} value={l.id}>{l.title}</option> // dynamic updating options in the dropdwon menu taken from board.lists.
          ))}
        </select>
      </div>
    </div>
  );
};

export default Card;