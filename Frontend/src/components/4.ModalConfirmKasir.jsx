import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirmKasir = ({ showModal, handleClose, handleConfirm }) => {
  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'justify' }}>
        <p>Attention! Please be careful! This action will <b>ERASED</b> any ordered products in the previous transaction.</p>
        <p>Are you sure you want to create a new transaction?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmKasir;
