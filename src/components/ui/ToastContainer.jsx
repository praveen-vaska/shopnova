'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useShop();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => {
        let borderColor = 'border-primary';
        let icon = <Info className="w-5 h-5 text-primary flex-shrink-0" />;

        if (toast.type === 'success') {
          borderColor = 'border-l-4 border-l-success';
          icon = <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />;
        } else if (toast.type === 'error') {
          borderColor = 'border-l-4 border-l-error';
          icon = <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-white px-4 py-3.5 rounded-sm shadow-xl border border-borderSubtle ${borderColor} min-w-[300px] max-w-[420px] flex items-center justify-between gap-3 animate-fade-in transition-all`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <span className="text-sm font-medium text-darkText leading-snug">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-mutedText hover:text-darkText transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
