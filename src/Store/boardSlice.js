import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/boards';

// ==========================================
// ASYNC THUNKS (API Integration)
// ==========================================

// 1. Fetch ALL boards (for the Welcome/Home view)
export const fetchAllBoards = createAsyncThunk(
  'workspace/fetchAllBoards',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load workspaces from database.");
    }
  }
);

// 2. Fetch a SINGLE board by ID
export const fetchBoardById = createAsyncThunk(
  'workspace/fetchBoardById',
  async (boardId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${boardId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Board not found.");
    }
  }
);

// 3. Create a NEW board workspace
export const createBoardOnServer = createAsyncThunk(
  'workspace/createBoardOnServer',
  async (title, thunkAPI) => {
    try {
      const newBoard = {
        title,
        lists: []
      };
      const response = await axios.post(API_URL, newBoard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create new board.");
    }
  }
);

// 4. Delete an ENTIRE board workspace
export const deleteBoardFromServer = createAsyncThunk(
  'workspace/deleteBoardFromServer',
  async (boardId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${boardId}`);
      return boardId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete workspace.");
    }
  }
);

// 5. Add a NEW list/column to the board
export const addListToServer = createAsyncThunk(
  'workspace/addListToServer',
  async ({ boardId, title }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      
      const newList = {
        id: `list-${Date.now()}`,
        title,
        cards: []
      };

      const updatedBoard = {
        ...board,
        lists: [...(board.lists || []), newList]
      };

      const response = await axios.put(`${API_URL}/${boardId}`, updatedBoard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add column.");
    }
  }
);

// 6. Delete a list/column from the board
export const deleteListFromServer = createAsyncThunk(
  'workspace/deleteListFromServer',
  async ({ boardId, listId }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      
      const updatedLists = (board.lists || []).filter(
        (list) => String(list.id) !== String(listId)
      );
      
      const updatedBoard = { ...board, lists: updatedLists };
      const response = await axios.put(`${API_URL}/${boardId}`, updatedBoard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete column.");
    }
  }
);

// 7. Add a card to a specific list
export const addCardToServer = createAsyncThunk(
  'workspace/addCardToServer',
  async ({ boardId, listId, text }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      
      const updatedLists = (board.lists || []).map((list) => {
        if (String(list.id) === String(listId)) {
          return {
            ...list,
            cards: [...(list.cards || []), { id: `card-${Date.now()}`, text }]
          };
        }
        return list;
      });

      const updatedBoard = { ...board, lists: updatedLists };
      const response = await axios.put(`${API_URL}/${boardId}`, updatedBoard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add card.");
    }
  }
);

// 8. Delete a card from a specific list
export const deleteCardFromServer = createAsyncThunk(
  'workspace/deleteCardFromServer',
  async ({ boardId, listId, cardId }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      
      const updatedLists = (board.lists || []).map((list) => {
        if (String(list.id) === String(listId)) {
          return {
            ...list,
            cards: (list.cards || []).filter((card) => String(card.id) !== String(cardId))
          };
        }
        return list;
      });

      const updatedBoard = { ...board, lists: updatedLists };
      const response = await axios.put(`${API_URL}/${boardId}`, updatedBoard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete card.");
    }
  }
);

// 9. Move a card between lists/columns
export const moveCardOnServer = createAsyncThunk(
  'workspace/moveCardOnServer',
  async ({ boardId, sourceListId, targetListId, cardId }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      
      let cardToMove = null;

      // Step 1: Locate card and remove it from the source list
      const updatedLists = (board.lists || []).map((list) => {
        if (String(list.id) === String(sourceListId)) {
          cardToMove = (list.cards || []).find((card) => String(card.id) === String(cardId));
          return {
            ...list,
            cards: (list.cards || []).filter((card) => String(card.id) !== String(cardId)),
          };
        }
        return list;
      });

      // Step 2: Append card to the target list
      if (cardToMove) {
        const finalLists = updatedLists.map((list) => {
          if (String(list.id) === String(targetListId)) {
            return {
              ...list,
              cards: [...(list.cards || []), cardToMove],
            };
          }
          return list;
        });

        const updatedBoard = { ...board, lists: finalLists };
        const response = await axios.put(`${API_URL}/${boardId}`, updatedBoard);
        return response.data;
      }

      return board;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to move card.");
    }
  }
);

// ==========================================
// REDUX SLICE DEFINITION
// ==========================================

const initialState = {
  boards: [],
  activeBoard: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const boardSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    clearActiveBoard: (state) => {
      state.activeBoard = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch All Boards ---
      .addCase(fetchAllBoards.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllBoards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boards = action.payload;
      })
      .addCase(fetchAllBoards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // --- Fetch Single Board ---
      .addCase(fetchBoardById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeBoard = action.payload;
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // --- Create Board ---
      .addCase(createBoardOnServer.fulfilled, (state, action) => {
        state.boards.push(action.payload);
        state.activeBoard = action.payload;
      })

      // --- Delete Board ---
      .addCase(deleteBoardFromServer.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => String(board.id) !== String(action.payload)
        );
        if (state.activeBoard && String(state.activeBoard.id) === String(action.payload)) {
          state.activeBoard = null;
        }
      })

      // --- Board Modifications (Updates activeBoard in state) ---
      .addCase(addListToServer.fulfilled, (state, action) => {
        state.activeBoard = action.payload;
      })
      .addCase(deleteListFromServer.fulfilled, (state, action) => {
        state.activeBoard = action.payload;
      })
      .addCase(addCardToServer.fulfilled, (state, action) => {
        state.activeBoard = action.payload;
      })
      .addCase(deleteCardFromServer.fulfilled, (state, action) => {
        state.activeBoard = action.payload;
      })
      .addCase(moveCardOnServer.fulfilled, (state, action) => {
        state.activeBoard = action.payload;
      });
  },
});

export const { clearActiveBoard } = boardSlice.actions;
export default boardSlice.reducer;