import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice'; // Make sure this path points right to your slice file!

export const store = configureStore({
  reducer: {
    // This key MUST match the state selector you use in your components (state.workspace)
    workspace: boardReducer 
  }
});