import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createBoardOnServer, fetchAllBoards, deleteBoardFromServer } from '../Store/boardSlice';

function WelcomePage() {
  const [boardTitle, setBoardTitle] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boards = useSelector((state) => state.workspace.boards || []);
  const status = useSelector((state) => state.workspace.status);

  // Load existing boards on page load
  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!boardTitle.trim()) return;

    setLoading(true);
    try {
      const resultAction = await dispatch(createBoardOnServer(boardTitle.trim())).unwrap();
      navigate(`/boards/${resultAction.id}`);
    } catch (err) {
      alert("Could not connect to database to create board.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBoard = async (e, boardId) => {
    e.preventDefault(); // Stop the Link router navigation from triggering
    e.stopPropagation(); // Stop the event click from bubbling up

    const confirmDelete = window.confirm("Are you sure you want to permanently delete this workspace and all its lists?");
    if (confirmDelete) {
      try {
        await dispatch(deleteBoardFromServer(boardId)).unwrap();
      } catch (err) {
        alert("Failed to delete workspace from database.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1b23] text-white flex flex-col items-center justify-center p-6 gap-6">
      <div className="max-w-md w-full bg-[#242630] p-8 rounded-2xl shadow-xl border border-gray-800">
        <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          TaskBoard
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Create a dynamic, persistent workspace instantly.
        </p>

        {/* Workspace Creation Form */}
        <form onSubmit={handleCreateBoard} className="flex flex-col gap-4 mb-8">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Workspace Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. My Sprint Planning"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              className="w-full bg-[#1a1b23] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold tracking-wide shadow-lg shadow-blue-600/20 active:scale-[0.98] transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Initializing..." : "Create Board →"}
          </button>
        </form>

        {/* Existing Boards Navigation Menu */}
        <div className="border-t border-gray-800 pt-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Your Active Workspaces ({boards.length})
          </h2>

          {status === 'loading' && (
            <p className="text-gray-500 text-sm animate-pulse">Loading workspaces...</p>
          )}

          {status !== 'loading' && boards.length === 0 && (
            <p className="text-gray-500 text-sm italic">No boards found. Create your first one above!</p>
          )}

          <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
            {boards.map((board) => (
              <Link
                key={board.id}
                to={`/boards/${board.id}`}
                className="flex justify-between items-center bg-[#1a1b23] hover:bg-gray-800 border border-gray-700/50 hover:border-blue-500/50 px-4 py-3 rounded-xl transition duration-150 group"
              >
                <span className="font-medium text-gray-200 group-hover:text-white truncate max-w-[200px]">
                  {board.title}
                </span>

                <div className="flex items-center gap-3">
                  {/* Action Link text */}
                  <span className="text-xs text-blue-400 group-hover:translate-x-0.5 transition-transform duration-150">
                    Open →
                  </span>
                  
                  {/* Delete Workspace Button */}
                  <button
                    onClick={(e) => handleDeleteBoard(e, board.id)}
                    className="p-1.5 text-gray-500 hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors duration-150"
                    title="Delete Workspace"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;