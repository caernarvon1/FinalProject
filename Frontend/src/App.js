import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Kasir from './kasir'; // Mengimpor komponen Kasir
import Receipt from './components/4.Receipt'; // Mengimpor Receipt

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Kasir />} /> {/* Halaman kasir */}
        <Route path="/receipt" element={<Receipt />} /> {/* Halaman receipt */}
      </Routes>
    </Router>
  );
};

export default App;
