import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const FullTutorialModal = ({ show, onHide, tutorial }) => {
  const { t } = useTranslation();
  if (!tutorial) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white" closeVariant="white">
        <Modal.Title>{tutorial.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{tutorial.description}</p>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="secondary" onClick={onHide}>
          {t('help.full_tutorial.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FullTutorialModal;
