import './index.css';

import * as remote from '@syncstate/remote-client';

import App from './App';
import { CookiesProvider } from 'react-cookie';
import { Provider } from '@syncstate/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createDocStore } from '@syncstate/core';
import reportWebVitals from './reportWebVitals';

const store = createDocStore({ isMenuOpen: false, userIsLoggedIn: false }, [
  remote.createInitializer(),
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
