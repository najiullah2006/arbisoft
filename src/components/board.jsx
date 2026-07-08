import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCard } from '../store/boardSlice';
import List from './list'; // Ensure your List component import path is correct

const Board = () => {
  const dispatch = useDispatch();
  
  // Pull data from the Redux store
  const userName = useSelector((state) => state.workspace.userName);
  const boards = useSelector((state) => state.workspace.boards);
  const currentBoard = boards && boards.length > 0 ? boards[0] : null;

  // Local state for the text input of a new list (if needed)
  const [newListTitle, setNewListTitle] = useState('');

  // Safeguard: If no board exists in state, show an error state instead of crashing
  if (!currentBoard) {
    return (
      <div className="min-h-screen bg-[#1a1b23] flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-xl font-bold mb-2">No Workspace Initialized</h2>
        <p className="text-sm text-gray-400">Please return to the home page and input your name.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1b23] p-6 flex flex-col gap-4">
      
      {/* Header Area */}
      <div className="flex items-center justify-between pb-2 border-b border-solid border-gray-800">
        <h2 className="text-2xl font-bold text-white">
          {userName ? `${userName}'s Board` : "Your Workspace Board"}
        </h2>
      </div>

      {/* Lists Container */}
      <div className="flex items-start gap-4 overflow-x-auto pb-4">
        {/* Safely check for lists and fall back to an empty array if undefined */}
        {(currentBoard.lists || []).map(list => (
          <List key={list.id} list={list} />
        ))}
        
        {/* Placeholder Add List Button */}
        <button className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium text-left p-3 rounded-xl w-68 shrink-0 transition-colors cursor-pointer">
          + Add another list
        </button>
      </div>
    </div>
  );
};

export default Board;