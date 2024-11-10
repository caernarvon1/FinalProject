import React, { useState} from 'react';
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
            <Form.Group controlId="totalAmount">
              <Form.Label>Total Amount:</Form.Label>
              <input
                type="text"
                value={totalAmount}
                readOnly
                className="form-control" // Menjaga konsistensi tampilan
                style={{ backgroundColor: '#f0f0f0', color: '#555' }} // Warna latar belakang dan teks langsung
              />
            </Form.Group>

            <Form.Group controlId="paymentAmount">
              <Form.Label>Amount Paid:</Form.Label>
              <input
                type="text" // Gunakan text agar kita bisa mengontrol inputnya
                value={paymentAmount}
                onChange={handlePaymentChange} // Validasi input angka
                className="form-control" // Gunakan kelas form-control agar tampilannya konsisten
              />
            </Form.Group>
            
            <Form.Group controlId="changeAmount">
              <Form.Label>Change:</Form.Label>
              <input
                type="text"
                value={
                  paymentAmount >= totalAmountNumber
                  ? (paymentAmount - totalAmountNumber).toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })
                : 'Not enough payment'
              }
              readOnly
              className="form-control"
              style={{ backgroundColor: '#f0f0f0', color: '#555' }} // Warna latar belakang dan teks langsung
            />
            </Form.Group>
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
