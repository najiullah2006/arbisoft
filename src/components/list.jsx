import React from 'react';
import Card from './card';

const List = ({ list }) => {
  return (
    <div className="trello-list" style={{
      background: '#f1f2f4',
      width: '272px',
      padding: '12px',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>{list.title}</h3>
      
      <div className="cards-container">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default List;