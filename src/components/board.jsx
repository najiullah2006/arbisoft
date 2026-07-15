import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchBoardById, 
  addListToServer, 
  deleteListFromServer, 
  addCardToServer, 
  deleteCardFromServer 
} from '../Store/boardSlice';
import Button from './button'; 

function Board() {
  const { boardId } = useParams();
  const dispatch = useDispatch();

  const activeBoard = useSelector((state) => state.workspace.activeBoard);
  const status = useSelector((state) => state.workspace.status);
  const error = useSelector((state) => state.workspace.error);

  const [newListTitle, setNewListTitle] = useState('');
  const [newCardTexts, setNewCardTexts] = useState({});

  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoardById(boardId));
    }
  }, [dispatch, boardId]);

  const handleAddList = (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    dispatch(addListToServer({ boardId, listTitle: newListTitle }));
    setNewListTitle('');
  };

  const handleDeleteList = (listId) => {
    if (window.confirm("Are you sure you want to delete this whole column?")) {
      dispatch(deleteListFromServer({ boardId, listId }));
    }
  };

  const handleAddCard = (e, listId) => {
    e.preventDefault();
    const cardText = newCardTexts[listId] || '';
    if (!cardText.trim()) return;
    dispatch(addCardToServer({ boardId, listId, cardText }));
    setNewCardTexts({ ...newCardTexts, [listId]: '' });
  };

  const handleDeleteCard = (listId, cardId) => {
    dispatch(deleteCardFromServer({ boardId, listId, cardId }));
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#1a1b23] text-white flex flex-col items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-xl font-medium text-gray-300">Retrieving workspace...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-[#1a1b23] text-white flex flex-col items-center justify-center p-6">
        <div className="bg-red-500/10 border border-red-500 p-6 rounded-2xl max-w-md text-center shadow-xl">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Connection Error</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => dispatch(fetchBoardById(boardId))}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition font-medium"
            >
              Retry
            </button>
            <Link to="/" className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition font-medium">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!activeBoard) return null;

  return (
    <div className="min-h-screen bg-[#1a1b23] text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div>
          <Link to="/" className="text-sm text-blue-400 hover:underline">← Back to Welcome</Link>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">{activeBoard.title}</h1>
        </div>
        <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/20">
          Connected to local db.json
        </span>
      </header>

      {/* Viewport */}
      <div className="flex gap-6 items-start overflow-x-auto pb-6">
        {/* Lists */}
        {activeBoard.lists?.map((list) => (
          <div key={list.id} className="bg-[#242630] w-80 p-4 rounded-xl flex-shrink-0 shadow-lg border border-gray-800/40">
            <div className="flex justify-between items-center mb-3 border-b border-gray-800 pb-2">
              <h3 className="font-bold text-lg text-gray-200">{list.title}</h3>
              {/* Uses your new custom delete button component */}
              <Button 
                onClick={() => handleDeleteList(list.id)} 
                title="Delete Column" 
              />
            </div>
            
            {/* Cards */}
            <div className="flex flex-col gap-2.5 mb-4 max-h-[50vh] overflow-y-auto">
              {list.cards?.map((card) => (
                <div key={card.id} className="bg-[#2e303f] p-3 rounded-lg border border-gray-700/50 shadow-sm text-gray-300 flex justify-between items-center group">
                  <span className="break-all pr-2">{card.text}</span>
                  {/* Uses your new custom delete button component with custom group-hover opacity */}
                  <Button 
                    onClick={() => handleDeleteCard(list.id, card.id)} 
                    title="Delete Card"
                    className="opacity-0 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            {/* New Card Form */}
            <form onSubmit={(e) => handleAddCard(e, list.id)} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Add card text..."
                value={newCardTexts[list.id] || ''}
                onChange={(e) => setNewCardTexts({ ...newCardTexts, [list.id]: e.target.value })}
                className="bg-[#1a1b23] border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 py-1.5 rounded-lg text-xs font-semibold transition">
                + Add Card
              </button>
            </form>
          </div>
        ))}

        {/* Add List Column */}
        <div className="w-80 bg-[#242630]/40 border border-dashed border-gray-700 p-4 rounded-xl flex-shrink-0">
          <h3 className="font-semibold text-gray-400 mb-3 text-sm">Create New Column</h3>
          <form onSubmit={handleAddList} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="List title (e.g. Done)"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              className="bg-[#1a1b23] border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-gray-700 hover:bg-gray-600 py-1.5 rounded-lg text-xs font-semibold transition">
              + Create List
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Board;