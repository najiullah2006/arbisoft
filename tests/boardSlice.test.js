import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';

// Note the relative imports pointing back into src/
import boardReducer, {
  clearActiveBoard,
  fetchAllBoards,
  deleteBoardFromServer
} from '../src/Store/boardSlice';

const mockAxios = new MockAdapter(axios);

describe('boardSlice Reducer & Async Thunks', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { workspace: boardReducer },
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should clear active board using clearActiveBoard reducer', () => {
    const initialState = {
      boards: [],
      activeBoard: { id: '1', title: 'Sprint Board' },
      status: 'succeeded',
      error: 'some error',
    };

    const state = boardReducer(initialState, clearActiveBoard());

    expect(state.activeBoard).toBeNull();
    expect(state.status).toBe('idle');
    expect(state.error).toBeNull();
  });

  it('should fetch all boards and update state on success', async () => {
    const mockBoards = [
      { id: '1', title: 'Board One', lists: [] },
      { id: '2', title: 'Board Two', lists: [] },
    ];

    mockAxios.onGet('http://localhost:5000/boards').reply(200, mockBoards);

    await store.dispatch(fetchAllBoards());

    const state = store.getState().workspace;
    expect(state.status).toBe('succeeded');
    expect(state.boards).toHaveLength(2);
    expect(state.boards[0].title).toBe('Board One');
  });

  it('should remove board from state after deleting on server', async () => {
    const preloadedStore = configureStore({
      reducer: { workspace: boardReducer },
      preloadedState: {
        workspace: {
          boards: [{ id: '101', title: 'Board to Delete' }],
          activeBoard: { id: '101', title: 'Board to Delete' },
          status: 'succeeded',
          error: null,
        },
      },
    });

    mockAxios.onDelete('http://localhost:5000/boards/101').reply(200);

    await preloadedStore.dispatch(deleteBoardFromServer('101'));

    const state = preloadedStore.getState().workspace;
    expect(state.boards).toHaveLength(0);
    expect(state.activeBoard).toBeNull();
  });
});