import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Header from "@/Pages/Dashboard/BlurHeader";
import Footer from "@/Components/News/Footer";
import FlashMessage from "@/Components/FlashMessage";
import { MdEmail, MdPerson, MdMessage, MdSchedule, MdTitle } from "react-icons/md";
import { useTranslation } from "react-i18next";
import DeleteConfirmationModal from "@/Components/ManageRef/DeleteConfirmationModal";

const NotifyPage = ({ notif }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    message: "",
    target: "all",
    schedule: "",
    email: "",
  });
  const [isSending, setIsSending] = useState(false);

  // Delete-confirmation state
  const [deleteData, setDeleteData] = useState({
    show: false,
    id: null,
    type: "notification",
  });

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const { auth } = usePage().props;
  const notifications = notif.data;
  const paginationLinks = notif.links;

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setNotificationData({
      title: "",
      message: "",
      target: "all",
      schedule: "",
      email: "",
    });
    setShowModal(true);
  };

  const handleEditClick = (notification) => {
    setIsEditing(true);
    setNotificationData({
      title: notification.title || "",
      message: notification.message || "",
      target: notification.target || "all",
      schedule: notification.schedule
        ? new Date(notification.schedule).toISOString().slice(0, 16)
        : "",
      email: notification.email || "",
      id: notification.id,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) =>
    setNotificationData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEditorChange = (value) =>
    setNotificationData((prev) => ({ ...prev, message: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    if (!notificationData.title.trim() || !notificationData.message.trim()) {
      alert(t("notify.modal.title_message_required"));
      setIsSending(false);
      return;
    }

    const payload = {
      ...notificationData,
      email: notificationData.email.trim() || "N/A",
      schedule: notificationData.schedule || null,
    };

    const method = isEditing
      ? () => Inertia.put(`/notify/${notificationData.id}`, payload)
      : () => Inertia.post(route("notify.store"), payload);

    method({
      onSuccess: () => {
        setShowModal(false);
        setIsSending(false);
        Inertia.reload();
      },
      onError: () => setIsSending(false),
    });
  };

  // Open the confirmation dialog
  const handleDelete = (id) => {
    setDeleteData({ show: true, id, type: "notification" });
  };

  const handlePageChange = (url) => {
    if (url) Inertia.visit(url, { preserveState: true, preserveScroll: true });
  };

  const formatDateForInput = (dateString) =>
    dateString ? new Date(dateString).toISOString().slice(0, 16) : "";


  // Called when the user clicks “Delete” in the confirmation modal
  const confirmDeletion = () => {
    Inertia.delete(`/notify/${deleteData.id}`, {
      onSuccess: () => {
        setDeleteData((d) => ({ ...d, show: false }));
        Inertia.reload();
      },
      onError: () => {
        setDeleteData((d) => ({ ...d, show: false }));
      },
    });
  };
  
    // Close without deleting
  const closeDeleteConfirmation = () => {
    setDeleteData((d) => ({ ...d, show: false }));
  };
  
  return (
    <AuthenticatedLayout>
      <div className="min-h-screen py-4">
      <Container className="notify-page mx-auto">
           <Header title={t("notify.header.title")} />

           {/* Show the Flash Message here */}
           <FlashMessage />

           {auth.can["viewAdminPanel"] && (
            <>
              <div className="mb-4 d-flex justify-content-end">
                <Button variant="primary" onClick={handleOpenAddModal}>
                  <i className="fas fa-plus me-2"></i>
                  {t("notify.add_notify")}
                </Button>
              </div>

              <div className="rounded bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white p-4">
                <h1 className="text-center mb-4 text-white">
                  {t("notify.history.title")}
                </h1>
                <div className="card shadow ">
                  <div className="card-body p-0 ">
                    <div className="table-responsive ">
                      <table className="table table-hover mb-0">
                        <thead className="thead-light">
                          <tr>
                            <th>{t("notify.history.table.title")}</th>
                            <th>{t("notify.history.table.message")}</th>
                            <th>{t("notify.history.table.target")}</th>
                            <th>{t("notify.history.table.email")}</th>
                            <th>{t("notify.history.table.schedule")}</th>
                            <th className="text-center">{t("notify.history.table.actions")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {notifications.length > 0 ? (
                            notifications.map((notification) => {
                              const formattedSchedule = notification.schedule
                                ? new Date(notification.schedule).toLocaleString()
                                : t("notify.history.not_scheduled");
                              return (
                                <tr key={notification.id}>
                                  <td className="align-middle">{notification.title}</td>
                                  <td className="align-middle" dangerouslySetInnerHTML={{ __html: notification.message }} />
                                  <td className="align-middle">{notification.target}</td>
                                  <td className="align-middle">{notification.email}</td>
                                  <td className="align-middle">{formattedSchedule}</td>
                                  <td className="text-center align-middle">
                                    <button
                                      onClick={() => (window.location.href = `/notify/${notification.id}`)}
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
                                {t("notify.history.no_notifications")}
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
                        className={`page-item ${link.active ? "active" : ""} ${!link.url ? "disabled" : ""}`}
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
              </div>
            </>
          )}
        </Container>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 backdrop-blur-sm bg-black/20"
              aria-hidden="true"
            />
            <div className="relative w-full max-w-2xl mx-4">
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-40"
                  style={{ filter: "blur(12px)" }}
                />
                <div className="relative z-10 flex justify-between items-center px-6 py-4 bg-gray-900 border-b border-white/20">
                  <h5 className="text-lg font-semibold text-white">
                    {isEditing
                      ? t("notify.modal.edit_notification")
                      : t("notify.modal.add_notification")}
                  </h5>
                  <button
                    className="text-white hover:text-red-400"
                    onClick={handleCloseModal}
                  >
                    &times;
                  </button>
                </div>
                <Form onSubmit={handleSubmit} className="relative z-10 p-6 space-y-6 text-white">
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label className="mb-2 flex items-center">
                          <MdTitle className="mr-2 text-yellow-500 text-base" />
                          {t("notify.modal.title")}
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:ring focus:ring-blue-400"
                          placeholder={t("notify.modal.title_placeholder")}
                          value={notificationData.title}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label className="mb-2 flex items-center">
                          <MdPerson className="mr-2 text-yellow-500 text-base" />
                          {t("notify.modal.target_users")}
                        </label>
                        <select
                          name="target"
                          className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:ring focus:ring-green-400"
                          value={notificationData.target}
                          onChange={handleInputChange}
                        >
                          <option value="all">{t("notify.modal.target_all")}</option>
                          <option value="vip">{t("notify.modal.target_vip")}</option>
                          <option value="traders">{t("notify.modal.target_traders")}</option>
                          <option value="new">{t("notify.modal.target_new")}</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label className="mb-2 flex items-center">
                          <MdEmail className="mr-2 text-yellow-500 text-base" />
                          {t("notify.modal.email_notification")}
                        </label>
                        <InputGroup>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder={t("notify.modal.email_placeholder")}
                            value={notificationData.email}
                            onChange={handleInputChange}
                            className="bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-indigo-400"
                          />
                          <Button variant="link" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            <i className="fas fa-envelope" />
                          </Button>
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label className="mb-2 flex items-center">
                          <MdSchedule className="mr-2 text-yellow-500 text-base" />
                          {t("notify.modal.schedule")}
                        </label>
                        <input
                          type="datetime-local"
                          name="schedule"
                          className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:ring focus:ring-indigo-400"
                          value={formatDateForInput(notificationData.schedule)}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="form-group">
                    <label className="mb-2 flex items-center">
                      <MdMessage className="mr-2 text-yellow-500 text-base" />
                      {t("notify.modal.message")}
                    </label>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-2" style={{ minHeight: '150px' }}>
                      <ReactQuill
                        value={notificationData.message}
                        onChange={handleEditorChange}
                        modules={quillModules}
                        className="bg-transparent text-white h-full"
                      />
                    </div>
                  </div>
                </Form>
                <div className="relative z-10 flex justify-between items-center px-6 py-4 bg-gray-900 border-t border-white/20">
                  <Button variant="secondary" onClick={handleCloseModal}>
                    {t("notify.modal.close")}
                  </Button>
                  <Button variant="primary" onClick={handleSubmit} disabled={isSending}>
                    {isSending
                      ? t("notify.modal.sending")
                      : isEditing
                      ? t("notify.modal.save_changes")
                      : t("notify.modal.send_notification")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        <DeleteConfirmationModal
          deleteData={deleteData}
          closeDeleteConfirmation={closeDeleteConfirmation}
          confirmDeletion={confirmDeletion}
        />
        <Footer className="mt-8" />
      </div>
    </AuthenticatedLayout>
  );
};

export default NotifyPage;
