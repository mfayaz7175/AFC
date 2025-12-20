import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const VideoModal = ({ show, onHide, tutorial }) => {
  const { t } = useTranslation();
  // Check if tutorial.video is a full URL (e.g. YouTube embed) or a file path
  const isFullUrl = tutorial.video && (tutorial.video.startsWith('http://') || tutorial.video.startsWith('https://'));
  // If it's a file path, prepend the storage URL.
  const videoSrc = tutorial.video && !isFullUrl 
    ? `/storage/${tutorial.video}` 
    : tutorial.video;

  return ( 
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white" closeVariant="white">
        <Modal.Title>{t('help.video_modal.modal_title', { title: tutorial.title })}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {tutorial.video ? (
          isFullUrl ? (
            // For YouTube embed or other full URLs, use an iframe.
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                src={videoSrc}
                allowFullScreen
                title={tutorial.title}
                style={{ width: '100%', height: '400px', border: 0 }}
              ></iframe>
            </div>
          ) : (
            // For uploaded video files, use a video tag.
            <video width="100%" height="400" controls>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <p>{t('help.video_modal.no_video_available')}</p>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="secondary" onClick={onHide}>
          {t('help.video_modal.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VideoModal;
