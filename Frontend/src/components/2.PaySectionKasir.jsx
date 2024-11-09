import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaySectionKasir = ({ onPay, totalAmount }) => {
  const [paymentAmount, setPaymentAmount] = useState(0); // Untuk jumlah yang dibayar
  const [showModal, setShowModal] = useState(false); // Untuk menampilkan modal pembayaran

  // Fungsi untuk membuka dan menutup modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Fungsi untuk menangani perubahan input
  const handlePaymentChange = (e) => {
    const value = e.target.value;
    // Pastikan hanya angka yang diterima
    if (/^\d*\.?\d*$/.test(value)) {
      setPaymentAmount(value ? Number(value) : 0);
    }
  };

  // useEffect untuk memantau perubahan paymentAmount dan totalAmount
  useEffect(() => {
    console.log('paymentAmount:', paymentAmount, 'totalAmount:', totalAmount);
  }, [paymentAmount, totalAmount]); // Akan dipanggil setiap kali paymentAmount atau totalAmount berubah

  // Fungsi untuk konversi totalAmount (jika berformat string dengan simbol seperti 'Rp') menjadi angka
  const getTotalAmountNumber = () => {
    return Number(totalAmount.replace(/[^\d]/g, '')); // Menghapus simbol non-digit dan mengonversi ke angka
  };

  const totalAmountNumber = getTotalAmountNumber(); // Ambil totalAmount yang sudah dikonversi ke angka

  return (
    <>
      <div className="d-flex justify-content-between p-3 bg-light border rounded mt-3">
        <Button onClick={toggleModal} variant="primary">
          Proceed
        </Button>
      </div>

      <Modal show={showModal} onHide={toggleModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <p>Total Amount: {totalAmount}</p> {/* Menampilkan totalAmount di atas */}
            
            <Form.Group controlId="paymentAmount">
              <Form.Label>Amount Paid:</Form.Label>
              <input
                type="text" // Gunakan text agar kita bisa mengontrol inputnya
                value={paymentAmount}
                onChange={handlePaymentChange} // Validasi input angka
                className="form-control" // Gunakan kelas form-control agar tampilannya konsisten
              />
            </Form.Group>
            
            <p>Change: {paymentAmount >= totalAmountNumber ? (paymentAmount - totalAmountNumber).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Not enough payment'}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => onPay(paymentAmount)}>
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaySectionKasir;
