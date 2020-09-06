import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// serviceWorker.register() for app to work offline and load faster. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// change register to unregister to disable this
serviceWorker.register();
