import React from 'react';
import { useCurrentBoard } from '../context/CurrentBoardContext';
import List from './list';

const Board = () => {
  const { board } = useCurrentBoard();

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>{board.name}</h1>
      
      <div className="board-columns" style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start'
      }}>
        {board.lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default Board;