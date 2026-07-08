import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Import Redux architecture tools
import { Provider } from 'react-redux';
import { store } from './store/index.js'; // Points to your store file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap your App inside the Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);