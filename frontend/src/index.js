import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
require('dotenv').config()
console.log(process.env)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
