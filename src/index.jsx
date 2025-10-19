// src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './main.css'; // Tailwind imports

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error("No #root element found in index.html");
createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
