
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";

export default function ShowNotify({ notif }) {
  const { t } = useTranslation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const notifications = notif.data;
  const paginationLinks = notif.links;

  const handleShow = (id) => {
    window.location.href = `/notify/${id}`;
  };
 
  const handleEditClick = (notification) => {
    setSelectedNotification(notification);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedNotification(null);
  };

  const handleDelete = (id) => {
    if (confirm(t("notify.show.modal.confirm_delete"))) {
      Inertia.delete(`/notify/${id}`, {
        onSuccess: () => Inertia.reload(),
        onError: (error) => console.error(t("notify.show.error_deleting"), error),
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedNotification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    Inertia.put(`/notify/${selectedNotification.id}`, selectedNotification, {
      onSuccess: () => {
        handleCloseModal();
        Inertia.reload();
      },
      onError: (error) => console.error(t("notify.show.error_updating"), error),
    });
  };

  const handlePageChange = (url) => {
    if (url) {
      Inertia.visit(url, { preserveState: true, preserveScroll: true });
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center mb-4">{t("notify.show.table_header.title_history")}</h1>

      <div className="card shadow">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="thead-light">
                <tr>
                  <th>{t("notify.show.table.title")}</th>
                  <th>{t("notify.show.table.message")}</th>
                  <th>{t("notify.show.table.target")}</th>
                  <th>{t("notify.show.table.email")}</th>
                  <th>{t("notify.show.table.schedule")}</th>
                  <th>{t("notify.show.table.expires_at")}</th>
                  <th className="text-center">{t("notify.show.table.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {notifications.length > 0 ? (
                  notifications.map((notification) => {
                    const formattedSchedule = notification.schedule
                      ? new Date(notification.schedule).toLocaleString()
                      : t("notify.show.not_scheduled");
                    const formattedExpiresAt = notification.expires_at
                      ? new Date(notification.expires_at * 1000).toLocaleString()
                      : t("notify.show.no_expiration");
                    return (
                      <tr key={notification.id}>
                        <td className="align-middle">{notification.title}</td>
                        <td className="align-middle" dangerouslySetInnerHTML={{ __html: notification.message }} />
                        <td className="align-middle">{notification.target}</td>
                        <td className="align-middle">{notification.email}</td>
                        <td className="align-middle">{formattedSchedule}</td>
                        <td className="align-middle">{formattedExpiresAt}</td>
                        <td className="text-center align-middle">
                          <button
                            onClick={() => handleShow(notification.id)}
                            className="btn btn-link text-info btn-sm"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            onClick={() => handleEditClick(notification)}
                            className="btn btn-link text-primary btn-sm"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="btn btn-link text-danger btn-sm"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      {t("notify.show.no_notifications")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <nav className="mt-4 d-flex justify-content-center">
        <ul className="pagination">
          {paginationLinks.map((link, index) => (
            <li
              key={index}
              className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
            >
              <button
                onClick={() => handlePageChange(link.url)}
                className="page-link"
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Edit Modal */}
      {selectedNotification && (
        <div
          className={`modal fade ${showEditModal ? 'show' : ''}`}
          style={{ display: showEditModal ? 'block' : 'none' }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{t("notify.show.edit_notification")}</h5>
                <button type="button" className="close text-white" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>{t("notify.show.modal.title")}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={selectedNotification.title || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>{t("notify.show.modal.message")}</label>
                  <textarea
                    className="form-control"
                    name="message"
                    value={selectedNotification.message || ''}
                    onChange={handleInputChange}
                    rows="5"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>{t("notify.show.modal.target")}</label>
                      <input
                        type="text"
                        className="form-control"
                        name="target"
                        value={selectedNotification.target || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>{t("notify.show.modal.email")}</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={selectedNotification.email || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>{t("notify.show.modal.schedule")}</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="schedule"
                        value={formatDateForInput(selectedNotification.schedule)}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>{t("notify.show.modal.expires_at")}</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="expires_at"
                        value={formatDateForInput(selectedNotification.expires_at * 1000)}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  {t("notify.show.modal.cancel")}
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  {t("notify.show.modal.save_changes")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}
