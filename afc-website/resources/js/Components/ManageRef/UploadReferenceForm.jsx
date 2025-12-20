import React from "react";
import { MdDescription, MdTopic, MdMessage, MdUploadFile, MdVideoLibrary } from "react-icons/md";
import { useTranslation } from "react-i18next";

const UploadReferenceForm = ({
  reference,
  handleReferenceChange,
  handleFileChange,
  handleAddReference,
}) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-dark p-4">
      <form onSubmit={handleAddReference} className="space-y-4">
        {/* Topic */}
        <div>
          <label className="block flex text-sm font-medium text-gray-100 mb-2">
            <MdTopic className="mr-2 text-yellow-500 text-base" />
            {t("upload_reference_form.topic_label")}
          </label>
          <input
            type="text"
            name="topic"
            value={reference.topic}
            onChange={handleReferenceChange}
            placeholder={t("upload_reference_form.enter_topic")}
            className="w-full px-4 rounded-lg border focus:bg-gray-100 dark:bg-gray-300 focus:bg-gray-100 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block flex text-sm font-medium text-gray-100 mb-2">
            <MdMessage className="mr-2 text-yellow-500 text-base" />
            {t("upload_reference_form.message_label")}
          </label>
          <textarea
            name="message"
            value={reference.message}
            onChange={handleReferenceChange}
            rows="2"
            placeholder={t("upload_reference_form.enter_message")}
            className="w-full px-4 rounded-lg focus:bg-gray-100 border dark:bg-gray-300 focus:bg-gray-100 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block flex text-sm font-medium text-gray-100 mb-2">
            <MdDescription className="mr-2 text-yellow-500 text-base" />
            {t("upload_reference_form.description_label")}
          </label>
          <textarea
            name="description"
            value={reference.description}
            onChange={handleReferenceChange}
            rows="2"
            placeholder={t("upload_reference_form.enter_description")}
            className="w-full px-4 rounded-lg focus:bg-gray-100 border dark:bg-gray-300 focus:bg-gray-100 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>

        {/* Upload File */}
        <div>
          <label className="block flex text-sm font-medium text-gray-100 mb-2">
            <MdUploadFile className="mr-2 text-yellow-500 text-base" />
            {t("upload_reference_form.upload_file_label")}
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-gray-600 file:mr-4 focus:bg-gray-100 dark:bg-gray-300 focus:bg-gray-100 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition duration-200"
          />
        </div>

        {/* Video Link */}
        <div>
          <label className="block flex text-sm font-medium text-gray-100 mb-2">
            <MdVideoLibrary className="mr-2 text-yellow-500 text-base" />
            {t("upload_reference_form.video_link_label")}
          </label>
          <input
            type="text"
            name="videoLink"
            value={reference.videoLink}
            onChange={handleReferenceChange}
            placeholder={t("upload_reference_form.enter_video_link")}
            className="w-full px-4 rounded-lg focus:bg-gray-100 border dark:bg-gray-300 focus:bg-gray-100 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <i className="fas fa-upload mr-2"></i>
          {t("upload_reference_form.submit")}
        </button>
      </form>
    </div>
  );
};

export default UploadReferenceForm;
