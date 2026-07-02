import React, { useState } from 'react';
import { useCurrentBoard } from '../context/CurrentBoardContext';
import { useTheme } from '../context/ThemeContext'; // 👈 Import the theme hook
import List from './list';

const Board = () => {
  const { board, createList } = useCurrentBoard();
  const { currentBg, setCurrentBg, colors } = useTheme(); // 👈 Destructure theme states
  const [newListTitle, setNewListTitle] = useState('');

  const handleListSubmit = (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    createList(newListTitle);
    setNewListTitle('');
  };

  return (
    <div style={{ 
      padding: '20px', 
      height: '100vh', 
      boxSizing: 'border-box',
      background: currentBg, // 👈 THE COLOR IS NOW DYNAMIC
      color: '#fff',
      transition: 'background 0.3s ease' // Makes color switches smooth
    }}>
      
      {/* Header Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '15px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>{board.name}</h1>

        {/* 🎨 Color Scheme Picker Buttons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '500' }}>Change Background:</span>
          {Object.entries(colors).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setCurrentBg(value)}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: value,
                border: currentBg === value ? '2px solid #fff' : '1px solid rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transform: currentBg === value ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.1s'
              }}
              title={key}
            />
          ))}
        </div>
      </div>

      {/* Main Grid View of Columns */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', overflowX: 'auto', paddingBottom: '15px' }}>
        {board.lists.map(list => (
          <List key={list.id} list={list} />
        ))}

        {/* Add list form wrapper */}
        <div style={{ background: 'rgba(255,255,255,0.2)', width: '272px', padding: '12px', borderRadius: '12px' }}>
          <form onSubmit={handleListSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="+ Add another list..." 
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              style={{ padding: '8px', borderRadius: '6px', border: 'none', background: 'rgba(255,255,255,0.9)', color: '#000' }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Board;