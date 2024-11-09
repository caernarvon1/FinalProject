import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaySectionKasir = ({ onPay, totalAmount }) => {
  const [paymentAmount, setPaymentAmount] = useState(0); // Untuk jumlah yang dibayar
  const [showModal, setShowModal] = useState(false); // Untuk menampilkan modal pembayaran

  // Fungsi untuk membuka dan menutup modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="d-flex justify-content-between p-3 bg-light border rounded mt-3">
        <Button onClick={toggleModal} variant="primary">
          Pay
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
              <Form.Control
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
              />
            </Form.Group>
            
            <p>Change: {paymentAmount >= totalAmount ? (paymentAmount - totalAmount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Not enough payment'}</p>
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
