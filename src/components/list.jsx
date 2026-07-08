import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCard } from '../store/boardSlice';
import Card from './card'; // Make sure this path matches your card component exactly

const List = ({ list }) => {
  const dispatch = useDispatch();
  const [cardTitle, setCardTitle] = useState('');

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!cardTitle.trim()) return;

    // Dispatching directly to your new RTK slice reducer action
    dispatch(createCard({ listId: list.id, title: cardTitle.trim() }));
    setCardTitle('');
  };

  return (
    <div className="bg-[#f1f2f4] w-72 rounded-xl p-3 flex flex-col gap-3 shrink-0 max-h-[80vh] overflow-y-auto shadow-sm">
      {/* List Title Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-[#172b4d]">{list.title}</h3>
      </div>

      {/* Cards Stack Rendering Area */}
      <div className="flex flex-col gap-2">
        {(list.cards || []).map((card) => (
          <Card key={card.id} card={card} listId={list.id} />
        ))}
      </div>

      {/* Form Submission UI to add a new card item */}
      <form onSubmit={handleAddCard} className="flex flex-col gap-2 mt-1">
        <input
          type="text"
          placeholder="+ Add a card title..."
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          className="w-full p-2 bg-white rounded-lg border border-solid border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-blue-500 shadow-xs"
        />
        {cardTitle.trim() && (
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-3 rounded-lg text-xs self-start transition-colors cursor-pointer"
          >
            Add Card
          </button>
        )}
      </form>
    </div>
  );
};

export default List;