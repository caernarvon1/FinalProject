import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (products.length > 0) {
      const lastProduct = products[products.length - 1];
      const totalQty = calculateTotalQty(lastProduct.kode_produk);
      setEditedQty(totalQty);
    }
  }, [products]);

  const calculateTotalQty = (kode_produk) => {
    return products
      .filter(product => product.kode_produk === kode_produk)
      .reduce((total, product) => total + product.qty, 0);
  };

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

  const handleQtyDecrement = () => {
    if (editedQty > 0) {
      setEditedQty((prevQty) => prevQty - 1);
    }
  };

  const handleSave = () => {
    if (editedQty !== null && products.length > 0) {
      const lastProduct = products[products.length - 1];
      const qtyDifference = calculateTotalQty(lastProduct.kode_produk) - editedQty;

      if (qtyDifference > 0) {
        const negativeProduct = {
          ...lastProduct,
          qty: -qtyDifference,
        };

        const updatedProducts = products.map((product) =>
          product.kode_produk === lastProduct.kode_produk ? product : product
        );
        
        updatedProducts.push(negativeProduct);

        dispatch(setProducts(updatedProducts));
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      }
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
            {products.length > 0 ? (
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
                    <td>{products[products.length - 1].kode_produk}</td>
                    <td>{products[products.length - 1].nama_produk}</td>
                    <td>
                      <input
                        type="number"
                        value={editedQty}
                        readOnly
                        style={{ width: '60px', marginLeft: '10px' }}
                      />
                      <button
                        type="button"
                        onClick={handleQtyDecrement}
                        disabled={editedQty <= 0}
                        style={{ marginLeft: '5px' }}
                      >
                        ▼
                      </button>
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
