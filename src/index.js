import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context, { FirebaseContext } from './store/FirebaseContext';
import { db } from './firebase/config';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{db}}>
        <Context>
            <App />
        </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);