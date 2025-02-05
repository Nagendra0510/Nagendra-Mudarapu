import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Portfolio from './App';  // Changed from App to Portfolio
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Portfolio />  // Changed from App to Portfolio
  </React.StrictMode>
);

reportWebVitals();