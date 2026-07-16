import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/boards';

// --- ASYNC THUNKS ---

// 1. Fetch ALL boards (for the Welcome Page menu)
export const fetchAllBoards = createAsyncThunk(
  'board/fetchAllBoards',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load workspaces.");
    }
  }
);

// 2. Fetch a SINGLE board by ID (for the Workspace board view)
export const fetchBoardById = createAsyncThunk(
  'board/fetchBoardById',
  async (boardId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${boardId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Board not found.");
    }
  }
);

// 3. Create a NEW board on the server
export const createBoardOnServer = createAsyncThunk(
  'board/createBoardOnServer',
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

// 4. Delete an ENTIRE board workspace from the server
export const deleteBoardFromServer = createAsyncThunk(
  'board/deleteBoardFromServer',
  async (boardId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${boardId}`);
      return boardId; // Return the deleted ID so we can filter it out of Redux state
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete the workspace.");
    }
  }
);

// 5. Add a NEW list/column to a board
export const addListToServer = createAsyncThunk(
  'board/addListToServer',
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
        lists: [...board.lists, newList]
      };

      const response = await axios.put(`${API_URL}/${boardId}`, updatedBoard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add list to the server.");
    }
  }
);

// 6. Delete an entire list/column safely
export const deleteListFromServer = createAsyncThunk(
  'board/deleteListFromServer',
  async ({ boardId, listId }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      
      const updatedLists = board.lists.filter(
        (list) => String(list.id) !== String(listId)
      );
      
      const updatedBoard = { ...board, lists: updatedLists };

      const response = await axios.put(`${API_URL}/${boardId}`, updatedBoard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete list from the server.");
    }
  }
);

// 7. Add a card to a specific list
export const addCardToServer = createAsyncThunk(
  'board/addCardToServer',
  async ({ boardId, listId, text }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      
      const updatedLists = board.lists.map(list => {
        if (String(list.id) === String(listId)) {
          return {
            ...list,
            cards: [...list.cards, { id: `card-${Date.now()}`, text }]
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
  'board/deleteCardFromServer',
  async ({ boardId, listId, cardId }, thunkAPI) => {
    try {
      const { data: board } = await axios.get(`${API_URL}/${boardId}`);
      
      const updatedLists = board.lists.map(list => {
        if (String(list.id) === String(listId)) {
          return {
            ...list,
            cards: list.cards.filter(card => String(card.id) !== String(cardId))
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

// --- SLICE CONFIGURATION ---

const initialState = {
  boards: [],
  activeBoard: null,
  status: 'idle',
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
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Boards
      .addCase(fetchAllBoards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBoards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boards = action.payload;
      })
      .addCase(fetchAllBoards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch Single Board
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

      // Create Board
      .addCase(createBoardOnServer.fulfilled, (state, action) => {
        state.boards.push(action.payload);
        state.activeBoard = action.payload;
      })

      // Delete Board (Removes it from the homepage list instantly)
      .addCase(deleteBoardFromServer.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => String(board.id) !== String(action.payload)
        );
        if (state.activeBoard && String(state.activeBoard.id) === String(action.payload)) {
          state.activeBoard = null;
        }
      })

      // Sync data instantly to UI on nested actions
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

export const { clearActiveBoard } = boardSlice.actions;
export default boardSlice.reducer;