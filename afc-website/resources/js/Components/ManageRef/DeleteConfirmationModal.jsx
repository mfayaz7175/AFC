import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";

const DeleteConfirmationModal = ({
  deleteData,
  closeDeleteConfirmation,
  confirmDeletion,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      show={deleteData.show}
      onHide={closeDeleteConfirmation}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <i className="fas fa-exclamation-triangle me-2"></i>{" "}
          {t("delete_confirmation.title")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <i className="fas fa-trash-alt text-danger display-4 mb-3"></i>
        <p className="text-muted">
          <Trans
            i18nKey="delete_confirmation.message"
            values={{ type: deleteData.type }}
            components={[
              <span key="bold" className="fw-bold text-danger" />,
              <span key="strong" className="fw-bold" />,
            ]}
          />
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" className="px-4" onClick={closeDeleteConfirmation}>
          <i className="fas fa-times"></i> {t("delete_confirmation.cancel")}
        </Button>
        <Button variant="danger" className="px-4 fw-bold" onClick={confirmDeletion}>
          <i className="fas fa-trash"></i> {t("delete_confirmation.delete")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
