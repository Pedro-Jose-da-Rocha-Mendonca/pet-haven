import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './services/AuthContext';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/styles.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
