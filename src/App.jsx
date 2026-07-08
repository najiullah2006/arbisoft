import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Board from './components/board';

// No more context providers needed here since Redux handles the state layer!
function App() {
  return (
    <BrowserRouter> 
      <Routes>
        {/* 1. Base path now loads your input form page instead of auto-redirecting */}
        <Route path="/" element={<WelcomePage />} />
        
        {/* 2. Route: Board Details page that you land on after entering your name */}
        <Route path="/boards/:boardId" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;