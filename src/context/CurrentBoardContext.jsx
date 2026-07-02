import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const CurrentBoardContext = createContext();

// 2. Provide the Data State to the App
export const CurrentBoardProvider = ({ children }) => {
  const [board, setBoard] = useState({
    id: 'b1',
    name: 'My Trello Board',
    lists: [
      {
        id: 'l1',
        title: 'To Do',
        cards: [
          { id: 'c1', title: 'Setup project structure', description: 'Move files to root and verify layout' },
          { id: 'c2', title: 'Create context state', description: 'Add CurrentBoardContext' }
        ]
      },
      {
        id: 'l2',
        title: 'In Progress',
        cards: [
          { id: 'c3', title: 'Building UI components', description: 'Render board, lists, and cards' }
        ]
      }
    ]
  });

  // Mock functions we can use later to add items
  const createCard = (listId, cardTitle) => {
    console.log(`Adding "${cardTitle}" to list ${listId}`);
  };

  return (
    <CurrentBoardContext.Provider value={{ board, createCard }}>
      {children}
    </CurrentBoardContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useCurrentBoard = () => {
  return useContext(CurrentBoardContext);
};