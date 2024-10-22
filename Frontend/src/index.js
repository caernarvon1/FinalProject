import React from 'react';
import ReactDOM from 'react-dom/client'; // Impor createRoot
import App from './App'; // Impor komponen utama

// Mengambil elemen root dari DOM
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Merender komponen App ke dalam elemen root
root.render(
//  <React.StrictMode>
    <App />
//  </React.StrictMode>
);
