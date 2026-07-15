import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/boards';

// 1. THUNK: Create a brand-new board dynamically (No more hardcoding!)
export const createBoardOnServer = createAsyncThunk(
  'board/createBoardOnServer',
  async (boardTitle, thunkAPI) => {
    try {
      const newBoard = {
        id: `board-${Date.now()}`, // Generates a completely unique dynamic ID
        title: boardTitle,
        lists: []
      };
      const response = await axios.post(API_URL, newBoard);
      return response.data; // Returns the newly created board object
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create new board on server.");
    }
  }
);

// 2. THUNK: Fetch a board by its ID
export const fetchBoardById = createAsyncThunk(
  'board/fetchBoardById',
  async (boardId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${boardId}`);
      return response.data; 
    } catch (error) {
      const message = error.response?.status === 404 
        ? "Board not found." 
        : "Failed to connect to the database server.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3. THUNK: Add a new list
export const addListToServer = createAsyncThunk(
  'board/addListToServer',
  async ({ boardId, listTitle }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      const newList = { id: `list-${Date.now()}`, title: listTitle, cards: [] };
      const updatedBoard = { ...board, lists: [...board.lists, newList] };

      const response = await axios.put(`${API_URL}/${boardId}`, updatedBoard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create list.");
    }
  }
);

// 4. THUNK: Delete a list
export const deleteListFromServer = createAsyncThunk(
  'board/deleteListFromServer',
  async ({ boardId, listId }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      // Filter out the selected list
      const updatedLists = board.lists.filter(list => list.id !== listId);
      const updatedBoard = { ...board, lists: updatedLists };

      const response = await axios.put(`${API_URL}/${boardId}`, updatedBoard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete list.");
    }
  }
);

// 5. THUNK: Add a new card
export const addCardToServer = createAsyncThunk(
  'board/addCardToServer',
  async ({ boardId, listId, cardText }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      const updatedLists = board.lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [...list.cards, { id: `card-${Date.now()}`, text: cardText }]
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

// 6. THUNK: Delete a card
export const deleteCardFromServer = createAsyncThunk(
  'board/deleteCardFromServer',
  async ({ boardId, listId, cardId }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      const updatedLists = board.lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.filter(card => card.id !== cardId)
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

const boardSlice = createSlice({
  name: 'workspace',
  initialState: {
    activeBoard: null, 
    status: 'idle',    
    error: null
  },
  reducers: {
    clearActiveBoard: (state) => {
      state.activeBoard = null;
      state.status = 'idle';
    },
    // Left in to keep any old static login setups safe
    initializeUserWorkspace: (state) => {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
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
      // Any database modification updates the active board automatically
      .addCase(createBoardOnServer.fulfilled, (state, action) => {
        state.activeBoard = action.payload;
        state.status = 'succeeded';
      })
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
      });
  }
});

export const { clearActiveBoard, initializeUserWorkspace } = boardSlice.actions;
export default boardSlice.reducer;