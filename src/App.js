import React from 'react';
import Kasir from './kasir'; // Mengimpor komponen Kasir

const App = () => {
  return (
    <div>
      <h1>Selamat Datang di Aplikasi Kasir</h1>
      <Kasir /> {/* Memanggil komponen Kasir */}
    </div>
  );
};

export default App;
