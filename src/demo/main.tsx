import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Demo } from './Demo';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>,
);
