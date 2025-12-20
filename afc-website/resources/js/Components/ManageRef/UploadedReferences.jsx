import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const UploadedReferences = ({
  references,
  auth,
  handleRowClick,
  handleOpenEditReference,
  openDeleteConfirmation,
}) => {
  const { t } = useTranslation();
  console.log("ddddddddddddddd", references);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white p-4 my-4">
      <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b-2 border-purple-100 pb-3">
        {t("uploaded_references.heading")}
      </h3>

      <div className="max-h-[400px] overflow-y-auto rounded-xl ">
        <Table hover className="border-collapse w-full ">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left rounded-tl-xl">
                {t("uploaded_references.col_index")}
              </th>
              <th className="px-4 py-3 text-left">
                {t("uploaded_references.col_topic")}
              </th>
              <th className="px-4 py-3 text-left">
                {t("uploaded_references.col_description")}
              </th>
              <th className="px-4 py-3 text-left rounded-tr-xl">
                {t("uploaded_references.col_actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {references &&
              references.map((ref, index) => (
                <tr
                  key={ref.id}
                  className={`${ref.status == 1 ? "bg-blue-50" : ""} hover:bg-blue-50 transition-colors cursor-pointer`}
                  onClick={() => handleRowClick(ref)}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {ref.topic}
                      {ref.status == 1 && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          <i className="fas fa-check-circle mr-1"></i>
                          {t("uploaded_references.active")}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">{ref.description}</td>
                  <td className="px-4 py-3 space-x-2" onClick={(e) => e.stopPropagation()}>
                    {auth.can["viewAdminPanel"] ? (
                      <>
                        <Button
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 border-0 text-white"
                          onClick={() => handleOpenEditReference(ref)}
                        >
                          <i className="fas fa-edit mr-2"></i>
                          {t("uploaded_references.edit")}
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 border-0 text-white"
                          onClick={() => openDeleteConfirmation("reference", ref.id)}
                        >
                          <i className="fas fa-trash mr-2"></i>
                          {t("uploaded_references.delete")}
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white"
                        onClick={() => handleOpenEditReference(ref)}
                      >
                        <i className="fas fa-info-circle mr-2"></i>
                        {t("uploaded_references.details")}
                      </Button>
                    )}
                    {ref.file && (
                      <a
                        href={`/storage/${ref.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg inline-flex items-center ml-2"
                        download
                      >
                        <i className="fas fa-download mr-2"></i>
                        {t("uploaded_references.download")}
                      </a>
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

export default UploadedReferences;
