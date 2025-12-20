import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Pagination } from 'react-bootstrap';
import { Inertia } from '@inertiajs/inertia';
import { useTranslation } from 'react-i18next';

const UserEmailsModal = ({ show, onHide }) => {
  const { t } = useTranslation();
  const [emails, setEmails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedEmailId, setExpandedEmailId] = useState(null);

  const handleClose = () => {
    onHide();
    setTimeout(() => {
      window.location.reload();
    }, 500); // Refresh page after 500ms to ensure smooth closure
  };

  const fetchEmails = () => {
    fetch(route('help.emails.index'), {
      headers: { 'Accept': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
        setLoading(false);
        // For each unread email with a short message, mark it as read in the background.
        data.data.forEach((email) => {
          if (!email.read && email.message.length <= 40) {
            const csrfToken = document
              .querySelector('meta[name="csrf-token"]')
              ?.getAttribute('content');
            if (!csrfToken) {
              console.error("CSRF token not found. Please ensure it is included in your HTML head.");
              return;
            }
            fetch(route('help.email.markAsRead', email.id), {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
              },
            })
              .then((res) => res.json())
              .then(() => {
                // Update the local state for this email.
                setEmails((prevEmails) => {
                  const updatedEmails = { ...prevEmails };
                  updatedEmails.data = updatedEmails.data.map((e) =>
                    e.id === email.id ? { ...e, read: true } : e
                  );
                  return updatedEmails;
                });
                // Dispatch an event to update the header's unread count.
                window.dispatchEvent(new CustomEvent('unreadCountUpdated'));
              });
          }
        });
      });
  };

  useEffect(() => {
    if (show) {
      setLoading(true);
      fetchEmails();
    }
  }, [show]);

  const toggleExpand = (email) => {
    if (expandedEmailId !== email.id && !email.read) {
      const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content');
      if (!csrfToken) {
        console.error("CSRF token not found. Please ensure it is included in your HTML head.");
        return;
      }
      fetch(route('help.email.markAsRead', email.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
      })
        .then((res) => res.json())
        .then(() => {
          setEmails((prevEmails) => {
            const updatedEmails = { ...prevEmails };
            updatedEmails.data = updatedEmails.data.map((e) =>
              e.id === email.id ? { ...e, read: true } : e
            );
            return updatedEmails;
          });
          window.dispatchEvent(new CustomEvent('unreadCountUpdated'));
        });
    }
    setExpandedEmailId(expandedEmailId === email.id ? null : email.id);
  };

  const handleDelete = (id) => {
    Inertia.delete(route('help.email.destroy', id), {
      onSuccess: () => fetchEmails(),
    });
  };

  const renderPagination = () => {
    if (!emails) return null;
    return (
      <Pagination>
        {emails.links.map((link, index) => (
          <Pagination.Item
            key={index}
            active={link.active}
            disabled={!link.url}
            onClick={() => {
              if (link.url) {
                fetch(link.url, { headers: { 'Accept': 'application/json' } })
                  .then((res) => res.json())
                  .then((data) => setEmails(data));
              }
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: link.label }} />
          </Pagination.Item>
        ))}
      </Pagination>
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton onHide={handleClose} className="bg-dark text-white" closeVariant="white">
        <Modal.Title>{t('help.emails.support_emails_title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          <p>{t('help.emails.loading')}</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>{t('help.emails.table.email_address')}</th>
                <th>{t('help.emails.table.date')}</th>
                <th>{t('help.emails.table.message')}</th>
                <th>{t('help.emails.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {emails.data.map((email) => (
                <tr key={email.id}>
                  <td>{email.user_email}</td>
                  <td>{new Date(email.created_at).toLocaleString()}</td>
                  <td>
                    {expandedEmailId === email.id
                      ? email.message
                      : email.message.length > 40
                      ? email.message.substring(0, 40) + '...'
                      : email.message}
                    {email.message.length > 40 && (
                      <Button variant="link" onClick={() => toggleExpand(email)}>
                        {expandedEmailId === email.id ? t('help.emails.show_less') : t('help.emails.read_more')}
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(email.id)}>
                      <i className="fas fa-trash"></i>
                    </Button>{' '}
                    <Button variant="primary" size="sm">
                      <i className="fas fa-reply"></i>
                    </Button>{' '}
                    {email.attachment && (
                      <a href={`/storage/${email.attachment}`} download className="btn btn-secondary btn-sm">
                        <i className="fas fa-download"></i>
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-dark text-white d-flex justify-content-between">
        {renderPagination()}
        <Button variant="secondary" onClick={handleClose}>
          {t('help.emails.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserEmailsModal;
