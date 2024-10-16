import React from 'react';
import ReactDOM from 'react-dom';
import App from './kasir'; // Mengimpor komponen App

ReactDOM.render(
  <React.StrictMode>
    <App /> {/* Merender komponen App */}
  </React.StrictMode>,
  document.getElementById('root') // Menentukan elemen DOM sebagai tempat merender
);
