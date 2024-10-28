import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Kasir from './1.Kasir'; // Mengimpor komponen Kasir
import ModalSpvKasir from './components/4.ModalSpvKasir'; // Pastikan nama dan jalur impor sudah benar

const App = () => {
  const [products, setProducts] = useState([]); // State untuk menyimpan daftar produk
  const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal Supervisor

  const handleShowModal = () => {
    if (products.length > 0) {
      setShowModal(true);
    } else {
      alert('Tidak ada produk untuk ditampilkan.'); // Menginformasikan pengguna jika tidak ada produk
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Kasir 
              products={products} 
              setProducts={setProducts} 
              handleShowModal={handleShowModal} 
            />
          } 
        /> {/* Halaman kasir */}
        <Route 
          path="/supervisor" 
          element={
            <ModalSpvKasir 
              showModal={showModal} 
              handleClose={handleCloseModal} 
              products={products} 
              setProducts={setProducts} 
            />
          } 
        /> {/* Halaman supervisor */}
      </Routes>
    </Router>
  );
};

export default App;
