import React from 'react';
import { useParams } from 'react-router-dom';
import { useCurrentBoard } from '../context/CurrentBoardContext';

const Card = ({ card, listId }) => {
  const { boardId } = useParams();
  
  // Make sure to pull your card deletion function alongside boards and moveCard
  const { boards, moveCard, deleteCard } = useCurrentBoard(); 

  const currentBoard = boards?.find(b => b.id === boardId);

  const handleCategoryChange = (e) => {
    const targetListId = e.target.value;
    if (targetListId === listId) return; 
    moveCard(card.id, listId, targetListId);
  };

  const handleDeleteClick = () => {
    // Standard validation guard confirmation check
    if (window.confirm(`Are you sure you want to delete "${card.title}"?`)) {
      // Execute the context action mapping
      deleteCard(listId, card.id);
    }
  };

  return (
    <div className="group bg-white p-2.5 rounded-lg shadow-sm border border-solid border-gray-200 hover:border-blue-400 hover:shadow transition-all text-left flex flex-col gap-2">
      
      {/* Card Header & Title */}
      <div className="flex justify-between items-start gap-2">
        <span className="text-sm font-medium text-[#172b4d] break-words max-w-[90%]">
          {card.title}
        </span>
      </div>

      {/* Action Footer Controls Row */}
      <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400 w-full">
        <span className="shrink-0 text-gray-400">Move:</span>
        
        {/* Dropdown Selector */}
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

        {/* Delete Action Trigger Button */}
        <button
          onClick={handleDeleteClick}
          title="Delete Card"
          className="p-1 rounded text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer shrink-0 font-medium text-sm flex items-center justify-center aspect-square"
        >
          🗑️
        </button>
      </div>

    </div>
  );
};

export default Card;