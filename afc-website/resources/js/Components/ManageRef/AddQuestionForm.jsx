import React from 'react';
import { MdLibraryBooks, MdFormatListBulleted, MdNumbers, MdQuiz, MdLooksOne, MdLooksTwo, MdLooks3, MdLooks4, MdCheckCircle } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const AddQuestionForm = ({
  question,
  references,
  handleQuestionChange,
  handleOptionChange,
  handleAddQuestion,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-900 backdrop-blur-lg rounded-3xl shadow-xl p-8 sm:p-12 border border-white/30">
      <form onSubmit={handleAddQuestion} className="space-y-4">
        {/* Reference Selection */}
        <div>
          <label className="block text-sm flex font-medium text-gray-100 mb-2">
            <MdLibraryBooks className="mr-2 text-yellow-500 text-base" />
            {t('manageRef.reference_label')}
          </label>
          <select
            name="reference_id"
            value={question.reference_id}
            onChange={handleQuestionChange}
            required
            className="w-full px-4 py-3 rounded-lg dark:bg-gray-300 focus:bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          >
            <option value="">{t('manageRef.select_reference')}</option>
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
            <label className="block text-sm flex font-medium text-gray-100 mb-2">
              <MdFormatListBulleted className="mr-2 text-yellow-500 text-base" />
              {t('manageRef.question_type_label')}
            </label>
            <select
              name="type"
              value={question.type}
              onChange={handleQuestionChange}
              className="w-full px-4 py-3 rounded-lg dark:bg-gray-300 focus:bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            >
              <option value="four-answer">{t('manageRef.four_answer')}</option>
              <option value="written">{t('manageRef.written_answer')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm flex font-medium text-gray-100 mb-2">
              <MdNumbers className="mr-2 text-yellow-500 text-base" />
              {t('manageRef.number_of_questions_label')}
            </label>
            <input
              type="number"
              name="num_questions"
              value={question.num_questions}
              min="1"
              onChange={handleQuestionChange}
              placeholder="1"
              className="w-full px-4 py-3 rounded-lg dark:bg-gray-300 focus:bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
          </div>
        </div>

        {/* Question Text */}
        <div>
          <label className="block text-sm flex font-medium text-gray-100 mb-2">
            <MdQuiz className="mr-2 text-yellow-500 text-base" />
            {t('manageRef.question_label')}
          </label>
          <input
            type="text"
            name="text"
            value={question.text}
            onChange={handleQuestionChange}
            placeholder={t('manageRef.enter_question')}
            className="w-full px-4 py-3 rounded-lg dark:bg-gray-300 focus:bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>

        {/* Options & Correct Answer */}
        {question.type === 'four-answer' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm flex font-medium text-gray-100 mb-2">
                  <MdLooksOne className="mr-2 text-yellow-500 text-base" />
                  {t('manageRef.option1')}
                </label>
                <input
                  type="text"
                  value={question.options[0]}
                  onChange={(e) => handleOptionChange(0, e.target.value)}
                  placeholder={t('manageRef.enter_option1')}
                  className="w-full px-4 py-3 rounded-lg dark:bg-gray-300 focus:bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm flex font-medium text-gray-100 mb-2">
                  <MdLooksTwo className="mr-2 text-yellow-500 text-base" />
                  {t('manageRef.option2')}
                </label>
                <input
                  type="text"
                  value={question.options[1]}
                  onChange={(e) => handleOptionChange(1, e.target.value)}
                  placeholder={t('manageRef.enter_option2')}
                  className="w-full px-4 py-3 rounded-lg dark:bg-gray-300 focus:bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm flex font-medium text-gray-100 mb-2">
                  <MdLooks3 className="mr-2 text-yellow-500 text-base" />
                  {t('manageRef.option3')}
                </label>
                <input
                  type="text"
                  value={question.options[2]}
                  onChange={(e) => handleOptionChange(2, e.target.value)}
                  placeholder={t('manageRef.enter_option3')}
                  className="w-full px-4 py-3 rounded-lg dark:bg-gray-300 focus:bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm flex font-medium text-gray-100 mb-2">
                  <MdLooks4 className="mr-2 text-yellow-500 text-base" />
                  {t('manageRef.option4')}
                </label>
                <input
                  type="text"
                  value={question.options[3]}
                  onChange={(e) => handleOptionChange(3, e.target.value)}
                  placeholder={t('manageRef.enter_option4')}
                  className="w-full px-4 py-3 rounded-lg dark:bg-gray-300 focus:bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm flex font-medium text-gray-100 mb-2">
                <MdCheckCircle className="mr-2 text-yellow-500 text-base" />
                {t('manageRef.correct_answer_label')}
              </label>
              <input
                type="text"
                name="correct_answer"
                value={question.correct_answer}
                onChange={handleQuestionChange}
                placeholder={t('manageRef.enter_correct_answer')}
                className="w-full px-4 py-3 rounded-lg dark:bg-gray-300 focus:bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm flex font-medium text-gray-100 mb-2">
              {t('manageRef.correct_answer_label')}
            </label>
            <textarea
              name="correct_answer"
              value={question.correct_answer}
              onChange={handleQuestionChange}
              placeholder={t('manageRef.enter_correct_answer')}
              className="w-full px-4 py-3 rounded-lg dark:bg-gray-300 focus:bg-gray-100 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none h-24"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg dark:bg-gray-300 focus:bg-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <i className="fas fa-plus mr-2"></i> {t('manageRef.submit_add_question')}
        </button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
