import React from 'react';
import { CurrentBoardProvider } from './context/CurrentBoardContext';
import Board from './components/board'; // matching lowercase from your image_8885c5.png

function App() {
  return (
    <CurrentBoardProvider>
      <div className="app-container" style={{ minHeight: '100vh', fontFamily: 'sans-serif', background: '#0079bf', color: '#fff' }}>
        <Board />
      </div>
    </CurrentBoardProvider>
  );
}

export default App;