import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import "./style/ManageRef.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import Header from "@/Pages/Dashboard/BlurHeader";
import { Inertia } from "@inertiajs/inertia";
import { EditReferenceModal, EditQuestionModal } from "./EditRef";
import { DeleteAnimation } from "../../Components/animations/Loading";
import ConfirmationModal from "./ConfirmationModal";

import UploadReferenceForm from "@/Components/ManageRef/UploadReferenceForm";
import AddQuestionForm from "@/Components/ManageRef/AddQuestionForm";
import UploadedReferences from "@/Components/ManageRef/UploadedReferences";
import QuestionsTable from "@/Components/ManageRef/QuestionsTable";
import DeleteConfirmationModal from "@/Components/ManageRef/DeleteConfirmationModal";
import Footer from "@/Components/News/Footer";
import { useTranslation } from "react-i18next";
import FlashMessage from "@/Components/FlashMessage";

const ManageRef = () => {
  const { t } = useTranslation();

  // ---------- Status Toggle State ----------
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [SelectedReferencesStatus, setSelectedReferencesStatus] = useState(null);

  const handleRowClick = (ref) => {
    setSelectedReferencesStatus(ref);
    setShowStatusModal(true);
  };

  const handleCloseModal = () => {
    setShowStatusModal(false);
    setSelectedReferencesStatus(null);
  };

  const handleConfirmToggle = () => {
    if (!SelectedReferencesStatus) return;
    const updatedStatus = SelectedReferencesStatus.status ? 0 : 1;
    Inertia.put(
      route("manage.ref.toggleStatus", SelectedReferencesStatus.id),
      { status: updatedStatus },
      {
        onSuccess: () => {
          setReferences((prev) =>
            prev.map((ref) =>
              ref.id === SelectedReferencesStatus.id ? { ...ref, status: updatedStatus } : ref
            )
          );
          handleCloseModal();
        },
        onError: (errors) => console.error(errors),
      }
    );
  };

  // ---------- Edit Modals State ----------
  const [showEditReferenceModal, setShowEditReferenceModal] = useState(false);
  const [selectedReference, setSelectedReference] = useState(null);
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleOpenEditReference = (ref) => {
    setSelectedReference(ref);
    setShowEditReferenceModal(true);
  };

  const handleCloseEditReference = () => {
    setSelectedReference(null);
    setShowEditReferenceModal(false);
  };

  const handleOpenEditQuestion = (question) => {
    setSelectedQuestion(question);
    setShowEditQuestionModal(true);
  };

  const handleCloseEditQuestion = () => {
    setSelectedQuestion(null);
    setShowEditQuestionModal(false);
  };

  // ---------- Inertia Props & Local State ----------
  const { auth, references: initialReferences, questions: initialQuestions } = usePage().props;
  const [references, setReferences] = useState(initialReferences);
  const [questions, setQuestions] = useState(initialQuestions);

  // ---------- Upload Reference Form State ----------
  const [reference, setReference] = useState({
    topic: "",
    description: "",
    message: "",
    file: null,
    videoLink: "",
  });

  const handleReferenceChange = (e) => {
    const { name, value } = e.target;
    setReference((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setReference((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleAddReference = (e) => {
    e.preventDefault();
    if (!reference.topic || !reference.description) return;
    const formData = new FormData();
    formData.append("topic", reference.topic);
    formData.append("description", reference.description);
    formData.append("message", reference.message);
    formData.append("video_link", reference.videoLink);
    if (reference.file) {
      formData.append("file", reference.file);
    }
    Inertia.post(route("manage.ref.storeReference"), formData, {
      onSuccess: () => {
        setReference({ topic: "", description: "", message: "", file: null, videoLink: "" });
      },
    });
  };

  // ---------- Add Question Form State ----------
  const [question, setQuestion] = useState({
    reference_id: "",
    type: "four-answer",
    num_questions: 1,
    text: "",
    correct_answer: "",
    options: ["", "", "", ""],
  });

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion((prev) => ({ ...prev, options: newOptions }));
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!question.text || (question.type === "four-answer" && question.options.some((opt) => !opt)))
      return;
    Inertia.post(route("manage.ref.storeQuestion"), question, {
      onSuccess: () => {
        setQuestion({
          reference_id: "",
          type: "four-answer",
          num_questions: 1,
          text: "",
          correct_answer: "",
          options: ["", "", "", ""],
        });
      },
    });
  };

  // ---------- Deletion State ----------
  const [deleteData, setDeleteData] = useState({ show: false, type: "", id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteConfirmation = (type, id) => {
    setDeleteData({ show: true, type, id });
  };

  const closeDeleteConfirmation = () => {
    setDeleteData({ show: false, type: "", id: null });
  };

  const confirmDeletion = () => {
    setIsDeleting(true);
    window.__isDeleting = true;
    if (deleteData.type === "reference") {
      setReferences((prev) => prev.filter((ref) => ref.id !== deleteData.id));
      Inertia.delete(route("manage.ref.destroyReference", deleteData.id), {
        preserveState: true,
        onFinish: () => {
          setIsDeleting(false);
          window.__isDeleting = false;
          closeDeleteConfirmation();
        },
        onError: () => {
          setIsDeleting(false);
          window.__isDeleting = false;
        },
      });
    } else if (deleteData.type === "question") {
      setQuestions((prev) => prev.filter((q) => q.id !== deleteData.id));
      Inertia.delete(route("manage.ref.destroyQuestion", deleteData.id), {
        preserveState: true,
        onFinish: () => {
          setIsDeleting(false);
          window.__isDeleting = false;
          closeDeleteConfirmation();
        },
        onError: () => {
          setIsDeleting(false);
          window.__isDeleting = false;
        },
      });
    }
  };

  const deleteAnimationComponent = isDeleting && (
    <div className="delete-animation-overlay">
      <DeleteAnimation />
    </div>
  );

  // ---------- Filter Questions ----------
  const filteredQuestions = selectedReference
    ? questions.filter((q) => q.reference_id == selectedReference)
    : questions;

  // ---------- Modal State for Adding Forms ----------
  const [showAddReferenceModal, setShowAddReferenceModal] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  return (
    <AuthenticatedLayout>
      {deleteAnimationComponent}
      <Container className="container my-4">
        <Header title={t("manageRef.references")} />
        <FlashMessage/>

        {/* Buttons to open modals */}
        {auth.can["viewAdminPanel"] && (
          <div className="d-flex justify-content-end my-3">
            <Button
              variant="primary"
              className="mx-2"
              onClick={() => setShowAddReferenceModal(true)}
            >
              {t("manageRef.add_reference")}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowAddQuestionModal(true)}
            >
              {t("manageRef.add_question")}
            </Button>
          </div>
        )}

        {/* Uploaded References Table */}
        <UploadedReferences
          references={references}
          auth={auth}
          handleRowClick={handleRowClick}
          handleOpenEditReference={handleOpenEditReference}
          openDeleteConfirmation={openDeleteConfirmation}
        />

        {/* Status Confirmation Modal */}
        {SelectedReferencesStatus && (
          <ConfirmationModal
            show={showStatusModal}
            title={
              SelectedReferencesStatus.status
                ? t("manageRef.inactivate_reference")
                : t("manageRef.activate_reference")
            }
            body={
              <p>
                {t("manageRef.are_you_sure", {
                  action: SelectedReferencesStatus.status ? t("manageRef.inactivate") : t("manageRef.activate"),
                  topic: SelectedReferencesStatus.topic,
                })}
              </p>
            }
            confirmLabel={
              SelectedReferencesStatus.status ? (
                <>
                  <i className="fas fa-times-circle"></i> {t("manageRef.inactivate")}
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle"></i> {t("manageRef.activate")}
                </>
              )
            }
            cancelLabel={t("manageRef.cancel")}
            onConfirm={handleConfirmToggle}
            onCancel={handleCloseModal}
          />
        )}

        {/* Questions Table */}
        {auth.can["viewAdminPanel"] && (
          <QuestionsTable
            filteredQuestions={filteredQuestions}
            auth={auth}
            selectedReference={selectedReference}
            setSelectedReference={setSelectedReference}
            references={references}
            handleOpenEditQuestion={handleOpenEditQuestion}
            openDeleteConfirmation={openDeleteConfirmation}
          />
        )}
        <Footer />

        {/* Edit Modals */}
        {selectedReference && (
          <EditReferenceModal
            show={showEditReferenceModal}
            handleClose={handleCloseEditReference}
            referenceData={selectedReference}
            onSuccess={() => {}}
          />
        )}
        {selectedQuestion && (
          <EditQuestionModal
            show={showEditQuestionModal}
            handleClose={handleCloseEditQuestion}
            questionData={selectedQuestion}
            onSuccess={() => {}}
          />
        )}
      </Container>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        deleteData={deleteData}
        closeDeleteConfirmation={closeDeleteConfirmation}
        confirmDeletion={confirmDeletion}
      />

      {/* Add Reference Modal */}
      <Modal show={showAddReferenceModal} onHide={() => setShowAddReferenceModal(false)}>
        <Modal.Header className="dark:bg-blue-500" closeButton>
          <Modal.Title>{t("manageRef.add_reference")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="dark:bg-gray-900">
          <UploadReferenceForm
            reference={reference}
            handleReferenceChange={handleReferenceChange}
            handleFileChange={handleFileChange}
            handleAddReference={(e) => {
              handleAddReference(e);
              setShowAddReferenceModal(false);
            }}
          />
        </Modal.Body>
      </Modal>

      {/* Add Question Modal */}
      <Modal show={showAddQuestionModal} onHide={() => setShowAddQuestionModal(false)}>
        <Modal.Header className="dark:bg-blue-500" closeButton>
          <Modal.Title>{t("manageRef.add_question")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="dark:bg-gray-900">
          <AddQuestionForm
            question={question}
            references={references}
            handleQuestionChange={handleQuestionChange}
            handleOptionChange={handleOptionChange}
            handleAddQuestion={(e) => {
              handleAddQuestion(e);
              setShowAddQuestionModal(false);
            }}
          />
        </Modal.Body>
      </Modal>
    </AuthenticatedLayout>
  );
};

export default ManageRef;
