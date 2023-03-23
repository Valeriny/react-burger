import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppHeader from './components/AppHeader/AppHeader';
import Burger from './components/Burger/Burger';


const root = ReactDOM.createRoot(
  document.getElementById('root') 
);

root.render(
  <React.StrictMode>
    <AppHeader/>
    <Burger />
  </React.StrictMode>
);