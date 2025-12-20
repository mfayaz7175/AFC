import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, onHide, onConfirm, title, body }) => {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="bg-danger text-white" closeVariant="white">
        <Modal.Title>
          <i className="fas fa-exclamation-triangle me-2"></i> {title || 'Confirm Deletion'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <i className="fas fa-trash-alt text-danger display-4 mb-3"></i>
        <p className="text-muted">
          {body || 'Are you sure you want to proceed with this action? This action cannot be undone.'}
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" className="px-4" onClick={onHide}>
          <i className="fas fa-times"></i> Cancel
        </Button>
        <Button variant="danger" className="px-4 fw-bold" onClick={onConfirm}>
          <i className="fas fa-trash"></i> Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
