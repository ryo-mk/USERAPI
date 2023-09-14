import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApiFetch } from "./components/ApiFetch";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ApiFetch />
  </React.StrictMode>
);
