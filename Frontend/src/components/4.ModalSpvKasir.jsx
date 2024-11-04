// Mengimpor dependensi yang diperlukan dari React, React-Bootstrap, dan Redux
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../store/productsSlice';

const ModalSpvKasir = ({ showModal, handleClose }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [editedQty, setEditedQty] = useState(null);

  const lastProduct = products[products.length - 1];

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

  const handleQtyChange = (newQty) => {
    if (newQty >= 0 && lastProduct) {
      setEditedQty(newQty);
    }
  };

  const handleSave = () => {
    if (editedQty !== null && lastProduct) {
      const updatedProduct = {
        ...lastProduct,
        qty: editedQty, // Update qty sesuai nilai editedQty
      };

      const updatedProducts = products.map((product) =>
        product.kode_produk === updatedProduct.kode_produk ? updatedProduct : product
      );

      dispatch(setProducts(updatedProducts)); // Mengupdate store Redux dengan produk yang sudah diperbarui
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Menyimpan ke local storage
    }
  };

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
          <Button variant="success" onClick={handleSave}>
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
