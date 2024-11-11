import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ModalInvoiceKasir from './4.ModalInvoiceKasir';

const PaySectionKasir = ({ onPay, totalAmount, toggleModal, showModal, onNewTransaction, products }) => {
  const [paymentAmount, setPaymentAmount] = useState('Rp 0');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const handlePaymentChange = (e) => {
    const value = e.target.value.replace(/[Rp.\s]/g, ''); // Hapus "Rp", titik, dan spasi
    if (/^\d*$/.test(value)) { // Hanya menerima angka
      const formattedValue = `Rp ${parseInt(value || '0', 10).toLocaleString('id-ID')}`; // Format dengan "Rp" dan pemisah ribuan
      setPaymentAmount(formattedValue);
    }
  };

  const getTotalAmountNumber = () => {
    return Number(totalAmount.replace(/[^\d]/g, ''));
  };

  const totalAmountNumber = getTotalAmountNumber();

  const handleCancel = () => {
    setPaymentAmount('Rp 0');
    toggleModal();
  };

  const handlePay = () => {
    const payment = Number(paymentAmount.replace(/[Rp.\s]/g, '')); // Hapus "Rp" dan titik sebelum mengirim ke onPay
    const changeAmount = payment >= totalAmountNumber ?
    `Rp ${(payment - totalAmountNumber).toLocaleString('id-ID')}` : 
    'Not enough payment';

    onPay(payment);
    setPaymentAmount('Rp 0');
    toggleModal();
    onNewTransaction();  // Memanggil fungsi untuk mereset tampilan di Kasir.jsx

    // Mengumpulkan data untuk invoice
    const formattedDate = new Date().toLocaleString();
    const items = products.map((product) => ({
      name: product.nama_produk,
      price: 'Rp ' + (product.harga_jual * product.qty).toLocaleString('id-ID'),
      qty: product.qty,
      harga_jual: product.harga_jual
    }));
    const receiptNumber = '12547865';
    const manager = 'Lor T.';
    const address = '007 Slate Quay, Caernarvon, Gwynedd, LL55 2RS, Bandung, Indonesia';

    // Set data invoice
    setInvoiceData({ items, totalAmount, receiptNumber, manager, address, formattedDate, paymentAmount, changeAmount });
    setShowInvoiceModal(true); // Tampilkan modal invoice setelah pembayaran
  };

  return (
    <>
      <div className="d-flex justify-content-between p-3 bg-light border rounded mt-3">
        <Button 
          onClick={toggleModal} 
          variant="primary" 
          style={{ width: '250px' }}
          title="'F8' Proceed"
        >
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
              <Form.Label>Total Price:</Form.Label>
              <input
                type="text"
                value={totalAmount}
                readOnly
                className="form-control"
                style={{ backgroundColor: '#f0f0f0', color: '#555' }}
              />
            </Form.Group>

            <Form.Group controlId="paymentAmount">
              <Form.Label>Amount Paid:</Form.Label>
              <input
                type="text"
                value={paymentAmount}
                onChange={handlePaymentChange}
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="changeAmount">
              <Form.Label>Change:</Form.Label>
              <input
                type="text"
                value={
                  Number(paymentAmount.replace(/[Rp.\s]/g, '')) >= totalAmountNumber
                    ? (Number(paymentAmount.replace(/[Rp.\s]/g, '')) - totalAmountNumber).toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0, // Menampilkan tanpa desimal
                        maximumFractionDigits: 0, // Menampilkan tanpa desimal
                      })
                    : 'Not enough payment'
                }
                readOnly
                className="form-control"
                style={{ backgroundColor: '#f0f0f0', color: '#555' }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handlePay}
            disabled={
              Number(paymentAmount.replace(/[Rp.\s]/g, '')) < totalAmountNumber || totalAmountNumber === 0
            }
          >
            Pay
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Invoice */}
      {showInvoiceModal && invoiceData && (
        <ModalInvoiceKasir
          items={invoiceData.items} // Data produk di-invoice
          totalAmount={invoiceData.totalAmount}
          receiptNumber={invoiceData.receiptNumber}
          manager={invoiceData.manager}
          address={invoiceData.address}
          formattedDate={invoiceData.formattedDate}
          paymentAmount={invoiceData.paymentAmount} 
          changeAmount={invoiceData.changeAmount}
          onClose={() => setShowInvoiceModal(false)} // Fungsi untuk menutup modal invoice
        />
      )}
    </>
  );
};

export default PaySectionKasir;
