import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Pastikan Bootstrap diimpor

const FooterKasir = () => {
  return (
    <footer className="bg-light text-center py-3">
      <div className="container">
        <p className="mb-0">© {new Date().getFullYear()} Aplikasi Kasir. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default FooterKasir;
