import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; 
import { initializeUserWorkspace } from '../store/boardSlice';

const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize react-hook-form with error tracking configuration
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleJoinWorkspace = (data) => {
    dispatch(initializeUserWorkspace({ name: data.username.trim() }));
    navigate('/boards/b1');
  };

  return (
    <div className="min-h-screen bg-[#1a1b23] flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl border border-solid border-gray-800 shadow-xl backdrop-blur-xs">
        <h1 className="text-3xl font-extrabold text-center mb-2 tracking-tight">
          Welcome to Trello Boards
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          Your personal workspace for organizing tasks and projects. Please enter your name to get started.
        </p>

        <form onSubmit={handleSubmit(handleJoinWorkspace)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g., John Doe"
              className={`w-full p-3 bg-white rounded-xl border text-sm text-gray-900 focus:outline-none ${
                errors.username ? 'border-red-500 focus:border-red-500' : 'border-solid border-gray-300 focus:border-blue-500'
              }`}
              {...register("username", { 
                required: "Name is required to build a workspace board",
                minLength: { value: 2, message: "Name must be at least 2 characters long" }
              })}
            />
            {errors.username && (
              <span className="text-red-400 text-xs px-1 mt-0.5">{errors.username.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 transform active:scale-98 cursor-pointer shadow-md mt-2"
          >
            Launch Workspace &rarr;
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomePage;