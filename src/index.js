// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // <-- must match the filename you created

const root = document.getElementById('root');
createRoot(root).render(
  <React.StrictMode><App /></React.StrictMode>
);
