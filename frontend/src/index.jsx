import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { Provider} from 'react-redux';
import store from './Store';

// 로그인 되어 있으면 모든 API 요청에 토큰을 붙인다
axios.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    if (token?.accessToken) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
