import React from "react";
import { usePage, router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function NotifyCount() {
  const { t } = useTranslation();
  const { notifications } = usePage().props;

  const markAsRead = (id) => {
    router.post(`/notify-user/${id}`, {}, {
      onSuccess: () => {
        console.log(t("notify.count.marked_as_read_log"));
      },
    });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">{t("notify.count.notifications")}</h2>
      <ul>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification.id} className="mb-2 p-2 bg-white rounded shadow">
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
              <span className={`text-xs ${notification.read_at ? "text-green-500" : "text-red-500"}`}>
                {notification.read_at ? t("notify.count.read") : t("notify.count.unread")}
              </span>
              {!notification.read_at && (
                <button
                  className="ml-4 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => markAsRead(notification.id)}
                >
                  {t("notify.count.mark_as_read")}
                </button>
              )}
            </li>
          ))
        ) : (
          <p>{t("notify.count.no_notifications")}</p>
        )}
      </ul>
    </div>
  );
}
