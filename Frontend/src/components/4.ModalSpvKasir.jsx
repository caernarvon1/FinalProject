// Mengimpor dependensi yang diperlukan dari React, React-Bootstrap, dan Redux
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../store/productsSlice';

// Komponen ModalSpvKasir menerima props untuk menampilkan modal dan menutupnya
const ModalSpvKasir = ({ showModal, handleClose }) => {
  const dispatch = useDispatch(); // Menginisialisasi dispatch untuk mengirimkan aksi Redux
  const products = useSelector((state) => state.products); // Mengambil data produk dari Redux store
  const [username, setUsername] = useState(''); // State untuk menyimpan username
  const [password, setPassword] = useState(''); // State untuk menyimpan password
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State untuk mengecek status autentikasi
  const [errorMessage, setErrorMessage] = useState(''); // State untuk menyimpan pesan error

  const lastProduct = products[products.length - 1]; // Mendapatkan produk terakhir dari daftar produk

  // Fungsi untuk menangani pengiriman formulir login
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah perilaku default form
    const correctUsername = 'supervisor'; // Username yang benar
    const correctPassword = 'passwordSuper'; // Password yang benar

    // Memeriksa kesesuaian username dan password
    if (username === correctUsername && password === correctPassword) {
      setIsAuthenticated(true); // Menandai sebagai autentikasi berhasil
      setErrorMessage(''); // Menghapus pesan error
    } else {
      setErrorMessage('Username atau kata sandi salah'); // Menampilkan pesan error jika autentikasi gagal
    }
  };

  // Fungsi untuk mengubah jumlah produk
  const handleQtyChange = (newQty) => {
    if (newQty >= 0 && lastProduct) {
      const updatedProducts = [...products]; // Membuat salinan produk
      updatedProducts[updatedProducts.length - 1].qty = newQty; // Memperbarui qty produk terakhir
      dispatch(setProducts(updatedProducts)); // Mengirim aksi untuk memperbarui state produk di Redux
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Menyimpan produk yang diperbarui ke localStorage
    }
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    setIsAuthenticated(false); // Mengubah status autentikasi
    setUsername(''); // Menghapus username
    setPassword(''); // Menghapus password
    handleClose(); // Menutup modal
  };

  return (
    <Modal show={isAuthenticated || showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton={false}>
        <Modal.Title>Supervisor Login</Modal.Title> {/* Judul modal */}
      </Modal.Header>
      <Modal.Body>
        {isAuthenticated ? ( // Jika sudah autentikasi
          <div>
            <h2>You are logged in as a Supervisor</h2>
            <h4>Last item:</h4>
            {lastProduct ? ( // Jika ada produk terakhir
              <table className="table">
                <thead>
                  <tr>
                    <th>Code Item</th>
                    <th>Item Name</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{lastProduct.kode_produk}</td>
                    <td>{lastProduct.nama_produk}</td>
                    <td>
                      <input
                        type="number"
                        value={lastProduct.qty}
                        onChange={(e) => handleQtyChange(parseInt(e.target.value))} // Memperbarui jumlah saat diubah
                        style={{ width: '60px', marginLeft: '10px' }} // Styling untuk input
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No items available.</p> // Pesan jika tidak ada produk
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}> {/* Form untuk login */}
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Memperbarui state username saat diubah
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Memperbarui state password saat diubah
              />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Menampilkan pesan error jika ada */}
            <Button variant="primary" type="submit">Log-in</Button> {/* Tombol untuk login */}
          </form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleLogout}> {/* Tombol untuk keluar */}
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSpvKasir; // Ekspor komponen untuk digunakan di tempat lain
