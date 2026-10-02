import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { useFarm } from "../../context/FarmContext";

export const Toast = () => {
  const { toastMessage } = useFarm();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-in transition-all">
      <div className="flex items-center gap-3 rounded-xl bg-agri-dark text-white px-4 py-3 shadow-2xl border border-emerald-500/30">
        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
        <p className="text-sm font-medium pr-2 text-emerald-50">{toastMessage}</p>
      </div>
    </div>
  );
};
