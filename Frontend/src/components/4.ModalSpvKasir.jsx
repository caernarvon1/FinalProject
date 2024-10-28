// src/components/4.ModalSpvKasir.jsx
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

  const lastProduct = products[products.length - 1];

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctUsername = 'supervisor';
    const correctPassword = 'passwordSuper';

    if (username === correctUsername && password === correctPassword) {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Username atau kata sandi salah');
    }
  };

  const handleQtyChange = (newQty) => {
    if (newQty >= 0 && lastProduct) {
      const updatedProducts = [...products];
      updatedProducts[updatedProducts.length - 1].qty = newQty;
      dispatch(setProducts(updatedProducts));
      localStorage.setItem('products', JSON.stringify(updatedProducts));
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
                        value={lastProduct.qty}
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
        <Button variant="secondary" onClick={handleLogout}>
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSpvKasir;
