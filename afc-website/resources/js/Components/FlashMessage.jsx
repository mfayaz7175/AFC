// resources/js/Components/FlashMessage.jsx
import React from 'react';
import { Alert } from 'react-bootstrap';
import { usePage } from '@inertiajs/react';

const FlashMessage = () => {
  // Provide a default empty object if flash is undefined
  const { flash = {} } = usePage().props;
  // Check both possible keys: message or success.
  const message = flash.message || flash.success;

  if (!message) {
    return null;
  }

  return (
    <Alert variant="success" className="mt-4">
      {message}
    </Alert>
  );
};

export default FlashMessage;


