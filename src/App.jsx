// commented out code will be used later. 


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CurrentBoardProvider } from './context/CurrentBoardContext';
import { ThemeProvider } from './context/ThemeContext'; // 1. IMPORT IT HERE
import { UserProvider } from './context/UserContext';
// import BoardListingPage from './components/BoardListingPage'; to be used later. 
import Board from './components/board';
// import CardDetailsPage from './components/CardDetailsPage'; to be used later.

//this wrapps everything tog. 
//browser router allows javascript to handle routing in the app and change screens instantly 
//route is like switch case and renders when same is found.
//   <Route path="/boards/:boardId" element={<Board />} > takes me to the board page and the nested route is for the card details modal.

function App() {
  return (
    <ThemeProvider> {/*2. WRAP EVERYTHING AT THE VERY TOP */}
      <UserProvider>
        <CurrentBoardProvider>
          <BrowserRouter> 
            <Routes>
              {/* Redirect home traffic to /boards */}
              <Route path="/" element={<Navigate to="/boards" replace />} />
              
              {/* Route: Board Listing page */}
              {/* <Route path="/boards" element={<BoardListingPage />} / to be used later> */}
              
              {/* Route: Board Details page */}
              <Route path="/boards/:boardId" element={<Board />} >
                {/* Nested Route: Card Details modal */}
                {/* <Route path="card/:cardId" element={<CardDetailsPage />} /> to be used later */}
              </Route>
            </Routes>
          </BrowserRouter>
        </CurrentBoardProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;