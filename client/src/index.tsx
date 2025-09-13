import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './app/styles.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { store, StoreContext } from './app/stores/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    {/* <React.StrictMode> */}
      <Router>
        <App/>
      </Router>
    {/* </React.StrictMode> */}
  </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
