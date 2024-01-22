import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts/fonts.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
