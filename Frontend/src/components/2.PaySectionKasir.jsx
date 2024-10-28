import React, { useState } from 'react';

// Komponen Modal
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <button style={closeButtonStyle} onClick={onClose}>
          &times; {/* Simbol untuk menutup modal */}
        </button>
        {children}
      </div>
    </div>
  );
};

// Gaya untuk modal
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  width: '300px', // Atur lebar modal sesuai kebutuhan
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '20px',
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
};

// Komponen PaySectionKasir
const PaySectionKasir = ({ infoMessage, onPay }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePayment = () => {
    onPay(); // Memanggil fungsi pembayaran
    handleCloseModal(); // Menutup modal setelah pembayaran
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '5px', marginTop: '20px' }}>
      <div style={{ flex: 1 }}>
        <p>{infoMessage}</p>
      </div>
      <div style={{ flexShrink: 0 }}>
        <button onClick={handleOpenModal}>Membayar</button>
      </div>

      {/* Modal untuk konfirmasi pembayaran */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Konfirmasi Pembayaran</h2>
        <p>Apakah Anda yakin ingin melanjutkan pembayaran?</p>
        <button onClick={handlePayment}>Ya, Bayar</button>
        <button onClick={handleCloseModal}>Batal</button>
      </Modal>
    </div>
  );
};

export default PaySectionKasir; // Pastikan nama sesuai
