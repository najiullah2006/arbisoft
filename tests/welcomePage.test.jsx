import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

// Note the relative imports pointing back into src/
import boardReducer from '../src/Store/boardSlice';
import WelcomePage from '../src/components/WelcomePage';

const renderWithProviders = (ui, { preloadedState } = {}) => {
  const store = configureStore({
    reducer: { workspace: boardReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

describe('WelcomePage Component', () => {
  it('renders title and input field correctly', () => {
    renderWithProviders(<WelcomePage />);

    expect(screen.getByText(/TaskBoard/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. My Sprint Planning/i)).toBeInTheDocument();
  });

  it('renders existing workspaces from Redux state', () => {
    const preloadedState = {
      workspace: {
        boards: [
          { id: '1', title: 'Project Launch' },
          { id: '2', title: 'Bug Tracker' },
        ],
        status: 'succeeded',
        error: null,
      },
    };

    renderWithProviders(<WelcomePage />, { preloadedState });

    expect(screen.getByText('Project Launch')).toBeInTheDocument();
    expect(screen.getByText('Bug Tracker')).toBeInTheDocument();
  });

  it('allows typing into the board title field', () => {
    renderWithProviders(<WelcomePage />);

    const input = screen.getByPlaceholderText(/e.g. My Sprint Planning/i);
    fireEvent.change(input, { target: { value: 'New Test Board' } });

    expect(input.value).toBe('New Test Board');
  });
});