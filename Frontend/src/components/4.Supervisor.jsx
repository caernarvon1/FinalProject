  import React, { useState } from 'react';
  import { Modal, Button } from 'react-bootstrap';

  const Supervisor = ({ showModal, handleClose }) => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const correctPassword = 'passwordSuper'; // Kata sandi benar

      if (password === correctPassword) {
        setIsAuthenticated(true);
        setErrorMessage('');
        handleClose(); // Menutup modal saat login berhasil
      } else {
        setErrorMessage('Kata sandi salah');
      }
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
              {/* Tambahkan fungsionalitas modifikasi barang di sini */}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
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

  export default Supervisor;
