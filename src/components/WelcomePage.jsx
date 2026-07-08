import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initializeUserWorkspace } from '../store/boardSlice';

const WelcomePage = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Send the name to Redux to build your dynamic board title
    dispatch(initializeUserWorkspace({ name: name.trim() }));
    
    // Redirect instantly to your board layout
    navigate('/boards/b1');
  };

  return (
    <div className="min-h-screen bg-[#1a1b23] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full flex flex-col gap-6 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-[#172b4d] tracking-tight">Welcome to Trello</h1>
          <p className="text-sm text-gray-500 mt-2">Enter your name to initialize your personal workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="e.g. Najiullah"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border border-solid border-gray-300 text-sm focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900 font-medium transition-colors"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer shadow-sm text-sm"
          >
            Create My Board &rarr;
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomePage;