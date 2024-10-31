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
  const [editedQty, setEditedQty] = useState(null); // State untuk menyimpan qty yang diubah sementara

  const lastProduct = products[products.length - 1]; // Mendapatkan produk terakhir dari daftar produk

  // Fungsi untuk menangani pengiriman formulir login
  const handleSubmit = (e) => {
    e.preventDefault();
    const correctUsername = 'supervisor';
    const correctPassword = 'passwordSuper';

    if (username === correctUsername && password === correctPassword) {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect username or password');
    }
  };

  // Fungsi untuk mengubah qty sementara
  const handleQtyChange = (newQty) => {
    if (newQty >= 0 && lastProduct) {
      setEditedQty(newQty);
    }
  };

  // Fungsi untuk menyimpan perubahan qty
  const handleSave = async () => {
    if (editedQty !== null && lastProduct) {
      try {
        // Mengirimkan permintaan PUT untuk memperbarui qty produk di backend
        const response = await fetch(`/produk/${lastProduct.kode_produk}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ qty: editedQty }), // Mengirimkan qty baru
        });

        if (response.ok) {
          const updatedProduct = await response.json(); // Mendapatkan data produk yang diperbarui dari respons
          const updatedProducts = products.map((product) =>
            product.kode_produk === updatedProduct.kode_produk ? updatedProduct : product
          );

          dispatch(setProducts(updatedProducts)); // Mengupdate Redux store dengan data produk yang baru
          localStorage.setItem('products', JSON.stringify(updatedProducts)); // Menyimpan produk yang diperbarui ke localStorage
        } else {
          console.error('Gagal memperbarui produk'); // Pesan jika terjadi kesalahan pada server
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error); // Menangani kesalahan saat permintaan gagal
      }
    }
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    handleClose();
  };

  return (
    <Modal show={isAuthenticated || showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton={false}>
        <Modal.Title>Supervisor Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isAuthenticated ? (
          <div>
            <h2>You are logged in as a Supervisor</h2>
            <h4>Last item:</h4>
            {lastProduct ? (
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
                        value={editedQty !== null ? editedQty : lastProduct.qty}
                        onChange={(e) => handleQtyChange(parseInt(e.target.value))}
                        style={{ width: '60px', marginLeft: '10px' }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No items available.</p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Button variant="primary" type="submit">Log-in</Button>
          </form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isAuthenticated && (
          <Button variant="success" onClick={handleSave}> {/* Tombol Save untuk menyimpan perubahan */}
            Save
          </Button>
        )}
        <Button variant="secondary" onClick={handleLogout}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSpvKasir;
