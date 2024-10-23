import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Kasir from './1.Kasir'; // Mengimpor komponen Kasir
import Receipt from './components/4.Receipt'; // Mengimpor Receipt
import Supervisor from './components/4.Supervisor'; // Path diperbaiki untuk impor

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Kasir />} /> {/* Halaman kasir */}
        <Route path="/receipt" element={<Receipt />} /> {/* Halaman receipt */}
        <Route path="/supervisor" element={<Supervisor />} /> {/* Halaman supervisor */}
      </Routes>
    </Router>
  );
};

export default App;
