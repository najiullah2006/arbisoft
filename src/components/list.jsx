import React, { useState } from 'react';
import Card from './card';
import { useCurrentBoard } from '../context/CurrentBoardContext';

const List = ({ list }) => {
  const { createCard } = useCurrentBoard();
  const [isAddingCard, setIsAddingCard] = useState(false); 
  const [cardTitle, setCardTitle] = useState(''); 

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!cardTitle.trim()) return;
    createCard(list.id, cardTitle);
    setCardTitle('');
    setIsAddingCard(false);
  };

  return (
    <div className="bg-[#f1f2f4] w-68 p-3 rounded-xl flex flex-col gap-2 shrink-0 max-h-[85vh] overflow-y-auto">
      <h3 className="text-sm font-bold text-[#172b4d] px-1">{list.title}</h3>
      
      <div className="flex flex-col gap-2">
        {list.cards?.map(card => (
          <Card key={card.id} card={card} listId={list.id} />
        ))}
      </div>

      {isAddingCard ? (
        <form onSubmit={handleAddCardSubmit} className="flex flex-col gap-1.5 mt-1">
          <input 
            type="text" 
            placeholder="Card title..."
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            autoFocus
            className="p-2 rounded-md border border-solid border-gray-300 text-sm focus:outline-none w-full bg-white shadow-sm text-gray-900"
          />
          <div className="flex items-center gap-1.5">
            <button 
              type="submit" 
              className="bg-[#0079bf] text-white text-sm py-1.5 px-3 rounded cursor-pointer font-medium hover:bg-[#026aa7] transition-colors"
            >
              Add card
            </button>
            <button 
              type="button" 
              onClick={() => setIsAddingCard(false)} 
              className="text-[#333] hover:bg-gray-200 p-1.5 rounded transition-colors text-sm cursor-pointer"
            >
              ✕
            </button>
          </div>
        </form>
      ) : (
        <button 
          onClick={() => setIsAddingCard(true)}
          className="bg-transparent text-[#5e6c84] text-sm text-left p-2 rounded-md hover:bg-gray-200 hover:text-[#172b4d] transition-colors w-full mt-1 font-medium cursor-pointer"
        >
          + Add a card
        </button>
      )}
    </div>
  );
};

export default List;