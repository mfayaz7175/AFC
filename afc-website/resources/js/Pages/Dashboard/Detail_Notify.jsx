

import React from 'react';
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";

export default function Detail({ notif }) {
  const { t } = useTranslation();

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen flex flex-col items-center py-8 px-4">
        <div
          className="w-full max-w-4xl relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-50"
            style={{ filter: 'blur(12px)' }}
          />

          {/* Content */}
          <div className="relative z-10 p-6">
            <PrimaryButton
              className="mb-6 inline-block"
              onClick={() => window.history.back()}
            >
              {t("notify.detail.back")}
            </PrimaryButton>

            <div className="overflow-x-auto">
              <table className="w-full text-white table-auto">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="px-4 py-2 text-left">{t("notify.detail.title")}</th>
                    <th className="px-4 py-2 text-left">{t("notify.detail.message")}</th>
                    <th className="px-4 py-2 text-left">{t("notify.detail.target")}</th>
                    <th className="px-4 py-2 text-left">{t("notify.detail.email")}</th>
                    <th className="px-4 py-2 text-left">{t("notify.detail.schedule")}</th>
                    <th className="px-4 py-2 text-left">{t("notify.detail.expires_at")}</th>
                  </tr>
                </thead>
                <tbody>
                  {notif.map(a => (
                    <tr key={a.id} className="border-b border-gray-700 hover:bg-gray-800">
                      <td className="px-4 py-3 align-top">{a.title}</td>
                      <td
                        className="px-4 py-3 align-top break-all"
                        dangerouslySetInnerHTML={{ __html: a.message }}
                      />
                      <td className="px-4 py-3 align-top">{a.target}</td>
                      <td className="px-4 py-3 align-top">{a.email}</td>
                      <td className="px-4 py-3 align-top">
                        {a.schedule
                          ? new Date(a.schedule).toLocaleString()
                          : t("notify.detail.not_scheduled")}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {a.expires_at
                          ? new Date(a.expires_at * 1000).toLocaleString()
                          : t("notify.detail.no_expiration")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
