import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>  {/* Added store for redux */}
      <PersistGate loading={null} persistor={persistor}>  {/* Added store for redux persist (localStorage) */}
        <App />
      </PersistGate>
    </Provider>
    </BrowserRouter>
  // </React.StrictMode> 
);

