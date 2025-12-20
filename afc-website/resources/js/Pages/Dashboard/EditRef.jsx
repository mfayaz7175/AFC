
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import {
  MdTitle,
  MdDescription,
  MdMessage,
  MdUploadFile,
  MdVideoLibrary,
  MdFormatListBulleted,
  MdNumbers,
  MdLibraryBooks,
  MdQuiz,
  MdLooksOne,
  MdLooksTwo,
  MdLooks3,
  MdLooks4,
  MdCheckCircle,
} from "react-icons/md";

export const EditReferenceModal = ({ show, handleClose, referenceData, onSuccess }) => {
  const { auth } = usePage().props;
  const [reference, setReference] = useState({
    topic: "",
    description: "",
    message: "",
    video_link: "",
    file: null,
  });

  useEffect(() => {
    if (referenceData) {
      setReference({
        topic: referenceData.topic || "",
        description: referenceData.description || "",
        message: referenceData.message || "",
        video_link: referenceData.video_link || "",
        file: null,
      });
    }
  }, [referenceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReference((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setReference((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("topic", reference.topic);
    formData.append("description", reference.description);
    formData.append("message", reference.message);
    formData.append("video_link", reference.video_link);
    if (reference.file) {
      formData.append("file", reference.file);
    }
    formData.append("_method", "PUT");

    Inertia.post(route("manage.ref.updateReference", referenceData.id), formData, {
      forceFormData: true,
      onSuccess: () => {
        onSuccess?.();
        handleClose();
      },
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdropClassName="bg-transparent backdrop-blur-sm bg-white/5"
      contentClassName="bg-transparent border-0 p-0"
    >
      <div
        className="relative rounded-2xl overflow-hidden mx-3"
        style={{
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-50"
          style={{ filter: "blur(12px)" }}
        />
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="relative z-10 text-white p-4"
        >
          <Modal.Header closeButton className="border-0 bg-transparent">
            <Modal.Title className="text-lg font-semibold">
              <i className="fas fa-edit mr-2"></i>Edit Reference
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <div className="flex items-center mb-1">
                <MdTitle className="mr-2 text-yellow-400 text-xl" />
                <Form.Label className="m-0 text-gray-100">Topic</Form.Label>
              </div>
              <Form.Control
                type="text"
                name="topic"
                value={reference.topic}
                onChange={handleChange}
                required
                className="bg-gray-800 text-gray-100 border-gray-700"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <div className="flex items-center mb-1">
                    <MdDescription className="mr-2 text-yellow-400 text-xl" />
                    <Form.Label className="m-0 text-gray-100">Description</Form.Label>
                  </div>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={reference.description}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 text-gray-100 border-gray-700"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <div className="flex items-center mb-1">
                    <MdMessage className="mr-2 text-yellow-400 text-xl" />
                    <Form.Label className="m-0 text-gray-100">Message</Form.Label>
                  </div>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={reference.message}
                    onChange={handleChange}
                    className="bg-gray-800 text-gray-100 border-gray-700"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <div className="flex items-center mb-1">
                    <MdUploadFile className="mr-2 text-yellow-400 text-xl" />
                    <Form.Label className="m-0 text-gray-100">Upload File</Form.Label>
                  </div>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    className="bg-gray-800 text-gray-100"
                  />
                  {referenceData.file && (
                    <Form.Text className="text-gray-400">
                      Current File: {referenceData.file}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <div className="flex items-center mb-1">
                    <MdVideoLibrary className="mr-2 text-yellow-400 text-xl" />
                    <Form.Label className="m-0 text-gray-100">Video Link</Form.Label>
                  </div>
                  <Form.Control
                    type="text"
                    name="video_link"
                    value={reference.video_link}
                    onChange={handleChange}
                    className="bg-gray-800 text-gray-100 border-gray-700"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          {auth.can.viewAdminPanel && (
            <Modal.Footer className="bg-transparent border-0">
              <Button variant="outline-secondary" onClick={handleClose}>
                <i className="fas fa-times mr-1"></i>Cancel
              </Button>
              <Button variant="outline-primary" type="submit">
                <i className="fas fa-save mr-1"></i>Save Changes
              </Button>
            </Modal.Footer>
          )}
        </Form>
      </div>
    </Modal>
  );
};

export const EditQuestionModal = ({ show, handleClose, questionData, onSuccess }) => {
  const { auth, references: referenceList = [] } = usePage().props;
  const [question, setQuestion] = useState({
    type: "four-answer",
    num_questions: 1,
    text: "",
    correct_answer: "",
    options: ["", "", "", ""],
    reference_id: "",
  });

  useEffect(() => {
    if (questionData) {
      setQuestion({
        type: questionData.type,
        num_questions: questionData.num_questions,
        text: questionData.text,
        correct_answer: questionData.correct_answer,
        options: questionData.options || ["", "", "", ""],
        reference_id: questionData.reference_id,
      });
    }
  }, [questionData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (idx, val) => {
    const opts = [...question.options];
    opts[idx] = val;
    setQuestion((prev) => ({ ...prev, options: opts }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(route("manage.ref.updateQuestion", questionData.id), question, {
      onSuccess: () => {
        onSuccess?.();
        handleClose();
      },
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdropClassName="bg-transparent backdrop-blur-sm bg-white/5"
      contentClassName="bg-transparent border-0 p-0"
    >
      <div
        className="relative rounded-2xl overflow-hidden mx-3"
        style={{
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-50"
          style={{ filter: "blur(12px)" }}
        />
        <Form onSubmit={handleSubmit} className="relative z-10 text-white p-4">
          <Modal.Header closeButton className="border-0 bg-transparent">
            <Modal.Title>
              <i className="fas fa-edit mr-2"></i>Edit Question
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="flex items-center mb-1 text-gray-100">
                    <MdFormatListBulleted className="mr-2 text-yellow-400 text-xl" />
                    Question Type
                  </Form.Label>
                  <Form.Select
                    name="type"
                    value={question.type}
                    onChange={handleChange}
                    className="bg-gray-800 text-gray-100 border-gray-700"
                  >
                    <option value="four-answer">Four Answer</option>
                    <option value="written">Written Answer</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="flex items-center mb-1 text-gray-100">
                    <MdNumbers className="mr-2 text-yellow-400 text-xl" />
                    Number of Questions
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="num_questions"
                    value={question.num_questions}
                    min="1"
                    onChange={handleChange}
                    required
                    className="bg-gray-800 text-gray-100 border-gray-700"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="flex items-center mb-1 text-gray-100">
                <MdLibraryBooks className="mr-2 text-yellow-400 text-xl" />
                Reference
              </Form.Label>
              <Form.Select
                name="reference_id"
                value={question.reference_id}
                onChange={handleChange}
                required
                className="bg-gray-800 text-gray-100 border-gray-700"
              >
                <option value="">Select a reference</option>
                {referenceList.map((ref) => (
                  <option key={ref.id} value={ref.id}>
                    {ref.topic}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="flex items-center mb-1 text-gray-100">
                <MdQuiz className="mr-2 text-yellow-400 text-xl" />
                Question
              </Form.Label>
              <Form.Control
                type="text"
                name="text"
                value={question.text}
                onChange={handleChange}
                required
                className="bg-gray-800 text-gray-100 border-gray-700"
              />
            </Form.Group>
            {question.type === "four-answer" ? (
              <>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="flex items-center mb-1 text-gray-100">
                        <MdLooksOne className="mr-2 text-yellow-400 text-xl" />
                        Option 1
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={question.options[0]}
                        onChange={(e) => handleOptionChange(0, e.target.value)}
                        required
                        className="bg-gray-800 text-gray-100 border-gray-700"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="flex items-center mb-1 text-gray-100">
                        <MdLooksTwo className="mr-2 text-yellow-400 text-xl" />
                        Option 2
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={question.options[1]}
                        onChange={(e) => handleOptionChange(1, e.target.value)}
                        required
                        className="bg-gray-800 text-gray-100 border-gray-700"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="flex items-center mb-1 text-gray-100">
                        <MdLooks3 className="mr-2 text-yellow-400 text-xl" />
                        Option 3
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={question.options[2]}
                        onChange={(e) => handleOptionChange(2, e.target.value)}
                        required
                        className="bg-gray-800 text-gray-100 border-gray-700"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="flex items-center mb-1 text-gray-100">
                        <MdLooks4 className="mr-2 text-yellow-400 text-xl" />
                        Option 4
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={question.options[3]}
                        onChange={(e) => handleOptionChange(3, e.target.value)}
                        required
                        className="bg-gray-800 text-gray-100 border-gray-700"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label className="flex items-center mb-1 text-gray-100">
                    <MdCheckCircle className="mr-2 text-yellow-400 text-xl" />
                    Correct Answer
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="correct_answer"
                    value={question.correct_answer}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 text-gray-100 border-gray-700"
                  />
                </Form.Group>
              </>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label className="text-gray-100">Correct Answer</Form.Label>
                <Form.Control
                  as="textarea"
                  name="correct_answer"
                  value={question.correct_answer}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 text-gray-100 border-gray-700"
                />
              </Form.Group>
            )}
          </Modal.Body>
          {auth.can.viewAdminPanel && (
            <Modal.Footer className="border-0 bg-transparent">
              <Button variant="outline-secondary" onClick={handleClose}>
                <i className="fas fa-times mr-1"></i>Cancel
              </Button>
              <Button variant="outline-primary" type="submit">
                <i className="fas fa-save mr-1"></i>Save Changes
              </Button>
            </Modal.Footer>
          )}
        </Form>
      </div>
    </Modal>
  );
};
