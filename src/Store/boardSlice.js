import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  boards: []
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    // Sets up the user profile and hooks up their initial empty workspace layout
    initializeUserWorkspace: (state, action) => {
      const { name } = action.payload;
      state.userName = name;
      state.boards = [
        {
          id: 'b1',
          title: `${name}'s Board`,
          lists: [
            { id: 'l1', title: 'To Do', cards: [] },
            { id: 'l2', title: 'In Progress', cards: [] },
            { id: 'l3', title: 'Done', cards: [] }
          ]
        }
      ];
    },
    
    // Creates a brand new card inside a targeted column list segment
    createCard: (state, action) => {
      const { listId, title } = action.payload;
      const board = state.boards[0]; // Interacting with our primary workspace board
      const targetList = board?.lists.find(l => l.id === listId);
      if (targetList) {
        targetList.cards.push({
          id: `c_${Date.now()}`,
          title
        });
      }
    },

    // Shifts an existing discrete card block across category column arrays
    moveCard: (state, action) => {
      const { cardId, sourceListId, targetListId } = action.payload;
      const board = state.boards[0];
      
      const sourceList = board?.lists.find(l => l.id === sourceListId);
      const targetList = board?.lists.find(l => l.id === targetListId);
      
      if (sourceList && targetList) {
        const cardIndex = sourceList.cards.findIndex(c => c.id === cardId);
        if (cardIndex !== -1) {
          const [cardToMove] = sourceList.cards.splice(cardIndex, 1);
          targetList.cards.push(cardToMove);
        }
      }
    },

    // Filters out a card entirely from its parent list array sequence
    deleteCard: (state, action) => {
      const { listId, cardId } = action.payload;
      const board = state.boards[0];
      const targetList = board?.lists.find(l => l.id === listId);
      if (targetList) {
        targetList.cards = targetList.cards.filter(c => c.id !== cardId);
      }
    }
  }
});

export const { initializeUserWorkspace, createCard, moveCard, deleteCard } = boardSlice.actions;
export default boardSlice.reducer;