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
    },

    // Adds a new list column to the primary workspace board
    addList: (state, action) => {
          const title = typeof action.payload === 'string' ? action.payload : action.payload?.title;
          if (!title) return;

          // If the board array is empty (e.g., due to a code refresh), initialize it inline!
          if (!state.boards || state.boards.length === 0) {
            state.boards = [
              {
                id: 'b1',
                title: state.userName ? `${state.userName}'s Board` : "Your Workspace Board",
                lists: []
              }
            ];
          }

          // Now we can safely append our brand-new list column
          const board = state.boards[0];
          if (!board.lists) {
            board.lists = [];
          }
          
          board.lists.push({
            id: `l_${Date.now()}`,
            title: title,
            cards: []
          });
        },

  

  // Safely removes a list column from the primary workspace board
    deleteList: (state, action) => {
      const { listId } = action.payload;
      const board = state.boards[0];
      
      if (board && board.lists) {
        // Filter out the list that matches the passed listId
        board.lists = board.lists.filter(l => l.id !== listId);
      }
    }
},
});
 


export const { initializeUserWorkspace, createCard, moveCard, deleteCard, addList, deleteList } = boardSlice.actions;
export default boardSlice.reducer;