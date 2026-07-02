import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CurrentBoardProvider } from './context/CurrentBoardContext';
import { ThemeProvider } from './context/ThemeContext'; // 👈 1. IMPORT IT HERE
import { UserProvider } from './context/UserContext';
import BoardListingPage from './components/BoardListingPage';
import Board from './components/board';
import CardDetailsPage from './components/CardDetailsPage';

function App() {
  return (
    <ThemeProvider> {/* 👈 2. WRAP EVERYTHING AT THE VERY TOP */}
      <UserProvider>
        <CurrentBoardProvider>
          <BrowserRouter>
            <Routes>
              {/* Redirect home traffic to /boards */}
              <Route path="/" element={<Navigate to="/boards" replace />} />
              
              {/* Route: Board Listing page */}
              <Route path="/boards" element={<BoardListingPage />} />
              
              {/* Route: Board Details page */}
              <Route path="/boards/:boardId" element={<Board />} >
                {/* Nested Route: Card Details modal */}
                <Route path="card/:cardId" element={<CardDetailsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CurrentBoardProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;