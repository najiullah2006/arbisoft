import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveCard, deleteCard } from '../store/boardSlice';

const Card = ({ card, listId }) => {
  const dispatch = useDispatch();
  
  // Grab the list arrays from Redux to build your dynamic move dropdown
  const boards = useSelector((state) => state.workspace.boards);
  const currentBoard = boards[0];

  const handleCategoryChange = (e) => {
    const targetListId = e.target.value;
    if (targetListId === listId) return;
    
    // Dispatch action payload directly to your Redux reducer slice
    dispatch(moveCard({ cardId: card.id, sourceListId: listId, targetListId }));
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete "${card.title}"?`)) {
      dispatch(deleteCard({ listId, cardId: card.id }));
    }
  };

  return (
    <div className="group bg-white p-2.5 rounded-lg shadow-sm border border-solid border-gray-200 hover:border-blue-400 hover:shadow transition-all text-left flex flex-col gap-2">
      <div className="flex justify-between items-start gap-2">
        <span className="text-sm font-medium text-[#172b4d] break-words max-w-[90%]">
          {card.title}
        </span>
      </div>

      <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400 w-full">
        <span className="shrink-0">Move:</span>
        <select
          value={listId}
          onChange={handleCategoryChange}
          className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded p-1 flex-grow focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
        >
          {currentBoard?.lists?.map(list => (
            <option key={list.id} value={list.id}>
              {list.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleDeleteClick}
          className="p-1 rounded text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer shrink-0 font-medium text-sm flex items-center justify-center aspect-square"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Card;