import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalSpvKasir = ({ showModal, handleClose, products = [{"id":1,"kode_produk":1001,"nama_produk":"Gula Pasir","qty":3,"harga_jual":"10000","discount":0}], setProducts }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Log data produk yang diterima
  console.log('Products in Supervisor Modal:', products);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctUsername = 'supervisor'; // Username yang benar
    const correctPassword = 'passwordSuper'; // Kata sandi yang benar

    // Validasi username dan password
    if (username === correctUsername && password === correctPassword) {
      setIsAuthenticated(true);
      setErrorMessage('');
      handleClose(); // Menutup modal saat login berhasil
    } else {
      setErrorMessage('Username atau kata sandi salah');
    }
  };

  const handleQtyChange = (index, newQty) => {
    if (newQty >= 0) {
      const updatedProducts = [...products];
      updatedProducts[index].qty = newQty; // Update Qty langsung pada array
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Simpan ke localStorage
    }
  };

  const handleDecrement = (index) => {
    if (products[index].qty > 0) {
      const updatedProducts = [...products];
      updatedProducts[index].qty -= 1; // Decrement Qty langsung pada array
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Simpan ke localStorage
    }
  };

  const handleLogout = () => {
    // Mengatur kembali state untuk logout
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    handleClose(); // Menutup modal
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Supervisor Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isAuthenticated ? (
          <div>
            <h2>Anda telah masuk sebagai Supervisor</h2>
            <h4>Daftar Barang:</h4>
            {products && products.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Kode Item</th>
                    <th>Nama Item</th>
                    <th>Qty</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => (
                    <tr key={item.id}>
                      <td>{item.kode_produk}</td>
                      <td>{item.nama_produk}</td>
                      <td>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => handleQtyChange(index, parseInt(e.target.value))}
                          style={{ width: '60px', marginLeft: '10px' }}
                        />
                      </td>
                      <td>
                        <Button variant="danger" onClick={() => handleDecrement(index)}>
                          Decrement
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Tidak ada barang yang tersedia.</p>
            )}
            <Button variant="secondary" onClick={handleLogout} style={{ marginLeft: '10px' }}>
              Log Out
            </Button>
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
              <label htmlFor="password">Kata Sandi:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Button variant="primary" type="submit">Masuk</Button>
          </form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSpvKasir;
