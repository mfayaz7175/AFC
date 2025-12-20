

import React from 'react';
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from 'react-i18next';

export default function Detail({ ad }) {
  const { t } = useTranslation();
  return (
    <AuthenticatedLayout>
      <div className="min-h-screen flex items-center justify-center py-8 px-4 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/img/bg5.JPG')" }}>
        <div
          className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-40"
            style={{ filter: 'blur(12px)' }}
          />

          <div className="relative z-10 p-6 text-white">
            <div className="mb-6">
              <PrimaryButton onClick={() => window.history.back()}>
                {t("ads.detail.back")}
              </PrimaryButton>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto text-white">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="px-4 py-2 text-left">{t("ads.detail.title")}</th>
                    <th className="px-4 py-2 text-left">{t("ads.detail.image")}</th>
                    <th className="px-4 py-2 text-left">{t("ads.detail.location")}</th>
                    <th className="px-4 py-2 text-left">{t("ads.detail.price")}</th>
                    <th className="px-4 py-2 text-left">{t("ads.detail.currency")}</th>
                    <th className="px-4 py-2 text-left">{t("ads.detail.description")}</th>
                  </tr>
                </thead>
                <tbody>
                  {ad.map(a => (
                    <tr key={a.id} className="hover:bg-gray-800">
                      <td className="px-4 py-3">{a.title}</td>
                      <td className="px-4 py-3">
                        <img
                          src={`/storage/${a.image}`}
                          alt={a.title}
                          className="w-40 h-auto object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3">{a.location}</td>
                      <td className="px-4 py-3">{a.price}</td>
                      <td className="px-4 py-3">{a.currency}</td>
                      <td className="px-4 py-3 break-all">{a.description}</td>
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
