import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBoardById,
  addListToServer,
  deleteListFromServer,
  addCardToServer,
  deleteCardFromServer,
  moveCardOnServer
} from '../Store/boardSlice';

function Board() {
  const { boardId } = useParams();
  const dispatch = useDispatch();

  const activeBoard = useSelector((state) => state.workspace.activeBoard);
  const status = useSelector((state) => state.workspace.status);

  const [newListTitle, setNewListTitle] = useState('');
  const [cardInputs, setCardInputs] = useState({});

  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoardById(boardId));
    }
  }, [dispatch, boardId]);

  const handleAddList = async (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    await dispatch(addListToServer({ boardId, title: newListTitle.trim() }));
    setNewListTitle('');
  };

  const handleDeleteList = (listId) => {
    if (window.confirm("Are you sure you want to delete this column?")) {
      dispatch(deleteListFromServer({ boardId, listId }));
    }
  };

  const handleAddCard = async (e, listId) => {
    e.preventDefault();
    const cardText = cardInputs[listId];
    if (!cardText || !cardText.trim()) return;

    await dispatch(addCardToServer({ boardId, listId, text: cardText.trim() }));
    setCardInputs((prev) => ({ ...prev, [listId]: '' }));
  };

  const handleCardInputChange = (listId, value) => {
    setCardInputs((prev) => ({ ...prev, [listId]: value }));
  };

  const handleDeleteCard = (listId, cardId) => {
    dispatch(deleteCardFromServer({ boardId, listId, cardId }));
  };

  const handleMoveCard = (sourceListId, targetListId, cardId) => {
    if (sourceListId === targetListId) return;
    dispatch(moveCardOnServer({ boardId, sourceListId, targetListId, cardId }));
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#1a1b23] text-white flex items-center justify-center">
        <p className="animate-pulse text-gray-400">Loading board...</p>
      </div>
    );
  }

  if (!activeBoard) {
    return (
      <div className="min-h-screen bg-[#1a1b23] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 font-semibold">Board not found.</p>
        <Link to="/" className="text-blue-400 underline">← Back to Welcome</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1b23] text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link to="/" className="text-blue-400 hover:underline text-sm mb-2 inline-block">
            ← Back to Welcome
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight">{activeBoard.title}</h1>
        </div>
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-semibold">
          Connected to local db.json
        </span>
      </div>

      {/* Board Columns */}
      <div className="flex items-start gap-6 overflow-x-auto pb-6">
        {activeBoard.lists && activeBoard.lists.map((list) => (
          <div
            key={list.id}
            className="w-80 bg-[#242630] border border-gray-800 rounded-2xl p-5 flex-shrink-0 flex flex-col gap-4 shadow-xl"
          >
            {/* List Header */}
            <div className="flex justify-between items-center pb-2 border-b border-gray-700/50">
              <h2 className="font-bold text-lg text-gray-100">
                {list.title || list.name || "Untitled Column"}
              </h2>
              <button
                onClick={() => handleDeleteList(list.id)}
                className="text-gray-500 hover:text-red-400 transition text-sm"
                title="Delete List"
              >
                🗑️
              </button>
            </div>

            {/* Cards Area */}
            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {list.cards && list.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-[#1a1b23] border border-gray-700/60 p-3.5 rounded-xl flex flex-col gap-3 group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-sm text-gray-200 break-words">{card.text}</p>
                    <button
                      onClick={() => handleDeleteCard(list.id, card.id)}
                      className="text-gray-500 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Dropdown to Move Card to Another List */}
                  {activeBoard.lists.length > 1 && (
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
                      <span className="text-[10px] uppercase font-semibold text-gray-500">Move to:</span>
                      <select
                        value={list.id}
                        onChange={(e) => handleMoveCard(list.id, e.target.value, card.id)}
                        className="bg-[#242630] text-xs text-gray-300 border border-gray-700 rounded px-2 py-1 focus:outline-none focus:border-blue-500 transition w-full cursor-pointer"
                      >
                        {activeBoard.lists.map((targetList) => (
                          <option key={targetList.id} value={targetList.id}>
                            {targetList.title || targetList.name || "Untitled"} {targetList.id === list.id ? "(Current)" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Card Form */}
            <form onSubmit={(e) => handleAddCard(e, list.id)} className="flex flex-col gap-2 pt-2">
              <input
                type="text"
                placeholder="Add card text..."
                value={cardInputs[list.id] || ''}
                onChange={(e) => handleCardInputChange(list.id, e.target.value)}
                className="bg-[#1a1b23] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/20"
              >
                + Add Card
              </button>
            </form>
          </div>
        ))}

        {/* Create New Column */}
        <div className="w-80 bg-[#242630]/60 border border-dashed border-gray-700 rounded-2xl p-5 flex-shrink-0">
          <h2 className="font-bold text-sm text-gray-400 mb-3">Create New Column</h2>
          <form onSubmit={handleAddList} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="List title (e.g. Done)"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              className="bg-[#1a1b23] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="submit"
              className="bg-[#1a1b23] hover:bg-gray-800 border border-gray-700 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition"
            >
              + Create List
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Board;