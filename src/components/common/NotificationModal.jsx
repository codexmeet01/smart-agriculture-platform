import React from "react";
import { Link } from "react-router-dom";
import { X, Bell, Check, ExternalLink } from "lucide-react";
import { useFarm } from "../../context/FarmContext";

export const NotificationModal = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useFarm();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 md:p-6 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-sm rounded-2xl bg-white shadow-2xl border border-emerald-100 overflow-hidden mt-16 md:mt-12"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4 bg-emerald-50/50">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-700" />
            <h3 className="font-display font-semibold text-agri-dark text-base">Farm Alerts & Advisory</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-3 border-b border-gray-100 flex justify-between items-center text-xs">
          <span className="text-gray-500 font-medium">
            {notifications.filter(n => n.unread).length} Unread notifications
          </span>
          <button
            onClick={markAllNotificationsAsRead}
            className="text-emerald-700 font-semibold hover:text-emerald-800 flex items-center gap-1"
          >
            <Check className="h-3.5 w-3.5" />
            Mark all read
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 p-2">
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-3 rounded-xl transition-colors ${
                n.unread ? "bg-emerald-50/70 border-l-4 border-emerald-500" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-agri-dark">{n.title}</span>
                <span className="text-[11px] text-gray-600 whitespace-nowrap">{n.timestamp}</span>
              </div>
              <p className="mt-1 text-xs text-gray-600 leading-relaxed">{n.message}</p>
              {n.route && (
                <div className="mt-2 flex justify-end">
                  <Link
                    to={n.route}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    View Details
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
