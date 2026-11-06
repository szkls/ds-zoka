import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../styles/index.css';
import { FormPage } from './FormPage';

const html = document.documentElement;
html.dataset.theme = 'light';
html.dataset.brand ??= 'boreal';
html.dataset.device ??= window.innerWidth < 768 ? 'mobile' : 'desktop';
createRoot(document.getElementById('root')!).render(<React.StrictMode><FormPage /></React.StrictMode>);
