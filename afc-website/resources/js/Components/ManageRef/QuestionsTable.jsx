import React from "react";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const QuestionsTable = ({
  filteredQuestions,
  auth,
  selectedReference,
  setSelectedReference,
  references,
  handleOpenEditQuestion,
  openDeleteConfirmation,
}) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white my-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold mb-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-purple-100 pb-3">
          {t("questions_table.inserted_questions")}
        </h3>
        <select
          value={selectedReference}
          onChange={(e) => setSelectedReference(e.target.value)}
          className="w-72 px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
        >
          <option value="">{t("questions_table.all_references")}</option>
          {references &&
            references.map((ref) => (
              <option key={ref.id} value={ref.id}>
                {ref.topic}
              </option>
            ))}
        </select>
      </div>
      <div className="max-h-[400px] overflow-y-auto rounded-xl">
        <Table hover className="border-collapse w-full">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left rounded-tl-xl">
                {t("questions_table.col_index")}
              </th>
              <th className="px-4 py-3 text-left">
                {t("questions_table.col_question")}
              </th>
              <th className="px-4 py-3 text-left">
                {t("questions_table.col_type")}
              </th>
              <th className="px-4 py-3 text-left rounded-tr-xl">
                {t("questions_table.col_actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredQuestions &&
              filteredQuestions.map((q, index) => (
                <tr
                  key={q.id}
                  className="hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{q.text}</td>
                  <td className="px-4 py-3">{q.type}</td>
                  <td
                    className="px-4 py-3 space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {auth.can["viewAdminPanel"] ? (
                      <>
                        <Button
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 border-0 text-white"
                          onClick={() => handleOpenEditQuestion(q)}
                        >
                          <i className="fas fa-edit mr-2"></i>
                          {t("questions_table.edit")}
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 border-0 text-white"
                          onClick={() =>
                            openDeleteConfirmation("question", q.id)
                          }
                        >
                          <i className="fas fa-trash mr-2"></i>
                          {t("questions_table.delete")}
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white"
                        onClick={() => handleOpenEditQuestion(q)}
                      >
                        <i className="fas fa-info-circle mr-2"></i>
                        {t("questions_table.details")}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default QuestionsTable;
