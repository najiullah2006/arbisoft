import React, { useState } from 'react';
import { useCurrentBoard } from '../context/CurrentBoardContext';
import List from './list';

const Board = () => {
  const { boards, board, setCurrentBoardId, createBoard, createList } = useCurrentBoard();
  const [newListTitle, setNewListTitle] = useState('');
  const [newBoardName, setNewBoardName] = useState('');
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);

  const handleListSubmit = (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    createList(newListTitle);
    setNewListTitle('');
  };

  const handleBoardSubmit = (e) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;
    createBoard(newBoardName);
    setNewBoardName('');
    setIsCreatingBoard(false);
  };

  return (
    <div style={{ padding: '20px', height: '100vh', boxSizing: 'border-box' }}>
      {/* Board Navigation Toolbar */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '15px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>{board.name}</h1>
        
        {/* Dropdown to switch boards */}
        <select 
          value={board.id} 
          onChange={(e) => setCurrentBoardId(e.target.value)}
          style={{ padding: '6px', borderRadius: '4px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid #fff' }}
        >
          {boards.map(b => (
            <option key={b.id} value={b.id} style={{ color: '#000' }}>{b.name}</option>
          ))}
        </select>

        {/* Create Board Modal Form Toggle */}
        {isCreatingBoard ? (
          <form onSubmit={handleBoardSubmit} style={{ display: 'flex', gap: '6px' }}>
            <input 
              type="text" 
              placeholder="New board name..." 
              value={newBoardName} 
              onChange={(e) => setNewBoardName(e.target.value)}
              style={{ padding: '6px', borderRadius: '4px', border: 'none' }}
            />
            <button type="submit" style={{ background: '#61bd4f', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Create</button>
            <button type="button" onClick={() => setIsCreatingBoard(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
          </form>
        ) : (
          <button onClick={() => setIsCreatingBoard(true)} style={{ background: 'rgba(255,255,255,0.3)', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
            + New Board
          </button>
        )}
      </div>

      {/* Main Grid View of Columns */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', overflowX: 'auto', paddingBottom: '15px' }}>
        {board.lists.map(list => (
          <List key={list.id} list={list} />
        ))}

        {/* Spec: Inline Form to Create List */}
        <div style={{ background: 'rgba(255,255,255,0.2)', width: '272px', padding: '12px', borderRadius: '12px' }}>
          <form onSubmit={handleListSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="+ Add another list..." 
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              style={{ padding: '8px', borderRadius: '6px', border: 'none', background: 'rgba(255,255,255,0.9)' , color: '#333', fontSize: '14px' }}
            />
            {newListTitle.trim() && (
              <button type="submit" style={{ background: '#61bd4f', color: '#fff', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Add List
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Board;