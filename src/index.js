import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppHeader from './components/AppHeader/AppHeader';
import App from './components/App/App';


const root = ReactDOM.createRoot(
  document.getElementById('root') 
);

root.render(
  <React.StrictMode>
    <AppHeader/>
    <App/>
  </React.StrictMode>
);