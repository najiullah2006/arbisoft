import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentBoard } from '../context/CurrentBoardContext';
import { useUser } from '../context/UserContext';

const BoardListingPage = () => {
  const { boards, createBoard } = useCurrentBoard();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    const title = prompt('Enter board name:');
    if (title) createBoard(title);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: '#333' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Welcome back, {user?.name || 'User'}!</h2>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: user?.avatarColor || '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
          {user?.initials || 'U'}
        </div>
      </div>

      <h3 style={{ marginBottom: '20px', color: '#555' }}>Your Boards</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {boards.map(b => (
          <div 
            key={b.id} 
            onClick={() => navigate(`/boards/${b.id}`)}
            style={{ background: '#0079bf', color: '#fff', padding: '24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {b.name}
          </div>
        ))}
        <div 
          onClick={handleCreate}
          style={{ background: '#f1f2f4', color: '#172b4d', padding: '24px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          + Create new board
        </div>
      </div>
    </div>
  );
};

export default BoardListingPage;