import React, { createContext, useContext, useState } from 'react';

const CurrentBoardContext = createContext();

export const CurrentBoardProvider = ({ children }) => {
  // We track an array of boards, and store which board id is currently active
  const [boards, setBoards] = useState([
    {
      id: 'b1',
      name: 'My Trello Board',
      lists: [
        { id: 'l1', title: 'To Do', cards: [{ id: 'c1', title: 'Setup architecture' }] },
        { id: 'l2', title: 'In Progress', cards: [{ id: 'c2', title: 'Building UI components' }] }
      ]
    }
  ]);
  const [currentBoardId, setCurrentBoardId] = useState('b1');

  // Find the active board object
  const currentBoard = boards.find(b => b.id === currentBoardId) || boards[0];

  // Spec: Create Board
  const createBoard = (boardName) => {
    const newBoard = {
      id: `b_${Date.now()}`,
      name: boardName,
      lists: []
    };
    setBoards([...boards, newBoard]);
    setCurrentBoardId(newBoard.id); // Switch automatically to the new board
  };

  // Spec: Create List
  const createList = (listTitle) => {
    setBoards(prevBoards => prevBoards.map(b => {
      if (b.id === currentBoardId) {
        return {
          ...b,
          lists: [...b.lists, { id: `l_${Date.now()}`, title: listTitle, cards: [] }]
        };
      }
      return b;
    }));
  };

  // Spec: Create Card
  const createCard = (listId, cardTitle) => {
    setBoards(prevBoards => prevBoards.map(b => {
      if (b.id === currentBoardId) {
        return {
          ...b,
          lists: b.lists.map(l => l.id === listId ? {
            ...l,
            cards: [...l.cards, { id: `c_${Date.now()}`, title: cardTitle }]
          } : l)
        };
      }
      return b;
    }));
  };

  // Spec: Move cards between lists
  const moveCard = (cardId, sourceListId, targetListId) => {
    setBoards(prevBoards => prevBoards.map(b => {
      if (b.id === currentBoardId) {
        let movingCard = null;

        // 1. Remove card from source list
        const updatedLists = b.lists.map(l => {
          if (l.id === sourceListId) {
            movingCard = l.cards.find(c => c.id === cardId);
            return { ...l, cards: l.cards.filter(c => c.id !== cardId) };
          }
          return l;
        });

        // 2. Add card to target list
        if (movingCard) {
          return {
            ...b,
            lists: updatedLists.map(l => l.id === targetListId ? {
              ...l,
              cards: [...l.cards, movingCard]
            } : l)
          };
        }
      }
      return b;
    }));
  };

  return (
    <CurrentBoardContext.Provider value={{ 
      boards, 
      board: currentBoard, 
      setCurrentBoardId, 
      createBoard, 
      createList, 
      createCard, 
      moveCard 
    }}>
      {children}
    </CurrentBoardContext.Provider>
  );
};

export const useCurrentBoard = () => useContext(CurrentBoardContext);