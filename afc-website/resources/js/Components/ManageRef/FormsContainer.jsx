import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// **AddQuestionForm Component**
const AddQuestionForm = ({
  question,
  references,
  handleQuestionChange,
  handleOptionChange,
  handleAddQuestion,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl p-8 sm:p-12 border border-white/30">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {t("add_question.heading")}
      </h1>
      <form onSubmit={handleAddQuestion} className="space-y-6">
        {/* Reference Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("add_question.reference_label")}
          </label>
          <select
            name="reference_id"
            value={question.reference_id}
            onChange={handleQuestionChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          >
            <option value="">{t("add_question.select_reference")}</option>
            {references &&
              references.map((ref) => (
                <option key={ref.id} value={ref.id}>
                  {ref.topic}
                </option>
              ))}
          </select>
        </div>

        {/* Question Type & Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("add_question.question_type_label")}
            </label>
            <select
              name="type"
              value={question.type}
              onChange={handleQuestionChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            >
              <option value="four-answer">{t("add_question.four_answer")}</option>
              <option value="written">{t("add_question.written")}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("add_question.num_questions_label")}
            </label>
            <input
              type="number"
              name="num_questions"
              value={question.num_questions}
              min="1"
              onChange={handleQuestionChange}
              placeholder="1"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
          </div>
        </div>

        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("add_question.question_label")}
          </label>
          <input
            type="text"
            name="text"
            value={question.text}
            onChange={handleQuestionChange}
            placeholder={t("add_question.enter_question")}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>

        {/* Options & Correct Answer */}
        {question.type === 'four-answer' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("add_question.option1")}
                </label>
                <input
                  type="text"
                  value={question.options[0]}
                  onChange={(e) => handleOptionChange(0, e.target.value)}
                  placeholder={t("add_question.enter_option1")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("add_question.option2")}
                </label>
                <input
                  type="text"
                  value={question.options[1]}
                  onChange={(e) => handleOptionChange(1, e.target.value)}
                  placeholder={t("add_question.enter_option2")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("add_question.option3")}
                </label>
                <input
                  type="text"
                  value={question.options[2]}
                  onChange={(e) => handleOptionChange(2, e.target.value)}
                  placeholder={t("add_question.enter_option3")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("add_question.option4")}
                </label>
                <input
                  type="text"
                  value={question.options[3]}
                  onChange={(e) => handleOptionChange(3, e.target.value)}
                  placeholder={t("add_question.enter_option4")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("add_question.correct_answer_label")}
              </label>
              <input
                type="text"
                name="correct_answer"
                value={question.correct_answer}
                onChange={handleQuestionChange}
                placeholder={t("add_question.enter_correct_answer")}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("add_question.correct_answer_label")}
            </label>
            <textarea
              name="correct_answer"
              value={question.correct_answer}
              onChange={handleQuestionChange}
              placeholder={t("add_question.enter_correct_answer")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none h-24"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <i className="fas fa-plus mr-2"></i> {t("add_question.submit")}
        </button>
      </form>
    </div>
  );
};

// **UploadReferenceForm Component**
const UploadReferenceForm = ({
  reference,
  handleReferenceChange,
  handleFileChange,
  handleAddReference,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl p-8 sm:p-12 border border-white/30">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {t("upload_reference.heading")}
      </h1>
      <form onSubmit={handleAddReference} className="space-y-6">
        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("upload_reference.topic_label")}
          </label>
          <input
            type="text"
            name="topic"
            value={reference.topic}
            onChange={handleReferenceChange}
            placeholder={t("upload_reference.enter_topic")}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>

        {/* Description & Message */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("upload_reference.description_label")}
            </label>
            <textarea
              name="description"
              value={reference.description}
              onChange={handleReferenceChange}
              rows="4"
              placeholder={t("upload_reference.enter_description")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("upload_reference.message_label")}
            </label>
            <textarea
              name="message"
              value={reference.message}
              onChange={handleReferenceChange}
              rows="4"
              placeholder={t("upload_reference.enter_message")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
          </div>
        </div>

        {/* Upload File & Video Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("upload_reference.upload_file_label")}
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("upload_reference.video_link_label")}
            </label>
            <input
              type="text"
              name="videoLink"
              value={reference.videoLink}
              onChange={handleReferenceChange}
              placeholder={t("upload_reference.enter_video_link")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <i className="fas fa-upload mr-2"></i> {t("upload_reference.submit")}
        </button>
      </form>
    </div>
  );
};

// **Parent Component: FormsContainer**
const FormsContainer = () => {
  // State for AddQuestionForm
  const [question, setQuestion] = useState({
    reference_id: '',
    type: 'four-answer',
    num_questions: 1,
    text: '',
    options: ['', '', '', ''],
    correct_answer: '',
  });

  // State for UploadReferenceForm
  const [reference, setReference] = useState({
    topic: '',
    description: '',
    message: '',
    videoLink: '',
  });

  // Sample references data
  const references = [
    { id: 1, topic: 'Reference 1' },
    { id: 2, topic: 'Reference 2' },
    // Add more references as needed
  ];

  // Handler for AddQuestionForm changes
  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  // Handler for option changes in AddQuestionForm
  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
  };

  // Handler for AddQuestionForm submission
  const handleAddQuestion = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Question Added:', question);
    // Add logic to handle form submission, e.g., API call
  };

  // Handler for UploadReferenceForm changes
  const handleReferenceChange = (e) => {
    const { name, value } = e.target;
    setReference({ ...reference, [name]: value });
  };

  // Handler for file changes in UploadReferenceForm
  const handleFileChange = (e) => {
    console.log('File selected:', e.target.files[0]);
    // Add logic to handle file upload
  };

  // Handler for UploadReferenceForm submission
  const handleAddReference = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Reference Added:', reference);
    // Add logic to handle form submission, e.g., API call
  };

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AddQuestionForm
            question={question}
            references={references}
            handleQuestionChange={handleQuestionChange}
            handleOptionChange={handleOptionChange}
            handleAddQuestion={handleAddQuestion}
          />
          <UploadReferenceForm
            reference={reference}
            handleReferenceChange={handleReferenceChange}
            handleFileChange={handleFileChange}
            handleAddReference={handleAddReference}
          />
        </div>
      </div>
    </div>
  );
};

export default FormsContainer;
