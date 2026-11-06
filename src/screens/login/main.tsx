import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../styles/index.css';
import { Login } from './Login';

// Figma modes → html attributes. The viewer's theme (data-theme) is kept when already set; otherwise follow the OS.
const html = document.documentElement;
if (!html.dataset.theme) html.dataset.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
html.dataset.brand ??= 'boreal';
html.dataset.device ??= window.innerWidth < 768 ? 'mobile' : 'desktop';

createRoot(document.getElementById('root')!).render(<React.StrictMode><Login /></React.StrictMode>);
