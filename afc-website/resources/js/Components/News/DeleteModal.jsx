import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';

const DeleteModal = ({ show, onHide, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <i className="fas fa-exclamation-triangle me-2"></i> {t("news.deleteModal.confirm_deletion")}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <i className="fas fa-trash-alt text-danger display-4 mb-3"></i>
        <p className="text-muted">
          <Trans
            i18nKey="news.deleteModal.message"
            components={[
              <span key="bold1" className="fw-bold text-danger" />,
              <span key="bold2" className="fw-bold" />
            ]}
          />
        </p>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" className="px-4" onClick={onHide}>
          <i className="fas fa-times"></i> {t("news.deleteModal.cancel")}
        </Button>
        <Button variant="danger" className="px-4 fw-bold" onClick={onConfirm}>
          <i className="fas fa-trash"></i> {t("news.deleteModal.delete")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

