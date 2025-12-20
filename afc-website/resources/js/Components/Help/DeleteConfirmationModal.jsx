import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DeleteConfirmationModal = ({ show, onHide, onConfirm, title, body }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="bg-danger text-white" closeVariant="white">
        <Modal.Title>
          <i className="fas fa-exclamation-triangle me-2"></i> {title || t('delete_confirmation_help.confirm_deletion')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <i className="fas fa-trash-alt text-danger display-4 mb-3"></i>
        <p className="text-muted">
          {body || t('delete_confirmation_help.deletion_warning')}
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" className="px-4" onClick={onHide}>
          <i className="fas fa-times"></i> {t('delete_confirmation_help.cancel')}
        </Button>
        <Button variant="danger" className="px-4 fw-bold" onClick={onConfirm}>
          <i className="fas fa-trash"></i> {t('delete_confirmation_help.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
