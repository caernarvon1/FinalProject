import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from './store/store'; // Impor store Redux
import App from './App';

// Mengambil elemen root dari DOM
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Merender komponen App ke dalam elemen root, dengan Redux Provider
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
