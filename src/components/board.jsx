import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addList } from '../store/boardSlice'; 
import List from './list'; 

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userName = useSelector((state) => state.workspace?.userName);
  const boards = useSelector((state) => state.workspace?.boards || []);
  const currentBoard = boards.length > 0 ? boards[0] : null;

  console.log("Current Redux Boards State Object:", boards);
  console.log("Current Board Lists Array:", currentBoard?.lists);

  // Local component states for the Add List interactive form
  const [isAdding, setIsAdding] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const handleCreateList = (e) => {
    e.preventDefault();
    if (!listTitle.trim()) return;

    dispatch(addList({ title: listTitle.trim() }));
    setListTitle('');
    setIsAdding(false);
  };

  // Safe Guard fallback check
  if (!currentBoard) {
    return (
      <div className="min-h-screen bg-[#1a1b23] flex flex-col items-center justify-center text-white gap-4 p-4">
        <h2 className="text-xl font-bold text-red-400">Session Reset</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl text-sm transition-colors cursor-pointer"
        >
          &larr; Return to Welcome Page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1b23] p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-solid border-gray-800">
        <h2 className="text-2xl font-bold text-white">
          {userName ? `${userName}'s Board` : "Your Workspace Board"}
        </h2>
      </div>

      {/* Main Container Layout Row */}
      <div className="flex items-start gap-4 overflow-x-auto pb-4">
        {/* Safely run map operation against fallback empty array sequence */}
        {(currentBoard.lists || []).map((list) => (
          <List key={list.id} list={list} />
        ))}
        
        {/* Interactive Input Form Control Box */}
        <div className="w-72 shrink-0 bg-white/10 p-3 rounded-xl transition-all">
          {!isAdding ? (
            <button 
              onClick={() => setIsAdding(true)}
              className="text-white text-sm font-medium text-left w-full h-full transition-colors cursor-pointer block"
            >
              + Add another list
            </button>
          ) : (
            <form onSubmit={handleCreateList} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Enter list title..."
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                className="w-full p-2 bg-white rounded-lg border border-solid border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
                >
                  Add List
                </button>
                <button
                  type="button"
                  onClick={() => { setIsAdding(false); setListTitle(''); }}
                  className="text-gray-300 hover:text-white text-xs transition-colors cursor-pointer ml-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;