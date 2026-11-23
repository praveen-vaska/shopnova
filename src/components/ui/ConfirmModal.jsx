'use client';

import React, { useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { AlertTriangle, Trash2, AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function ConfirmModal() {
  const { confirmModal, closeConfirmModal } = useShop();
  const { isOpen, title, message, confirmText, cancelText, type, onConfirm } = confirmModal;

  // Listen to Escape key to dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeConfirmModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeConfirmModal]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
    closeConfirmModal();
  };

  return (
    <div 
      className="fixed inset-0 z-[999999] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={closeConfirmModal}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-borderSubtle max-w-md w-full p-6 sm:p-7 relative animate-scale-in text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeConfirmModal}
          className="absolute top-4 right-4 text-mutedText hover:text-darkText p-1.5 rounded-full hover:bg-surface transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status Icon Badge */}
        <div className="mb-4 flex justify-center">
          {type === 'danger' && (
            <div className="w-14 h-14 rounded-full bg-error/15 text-error flex items-center justify-center shadow-inner">
              <Trash2 className="w-7 h-7" />
            </div>
          )}
          {type === 'warning' && (
            <div className="w-14 h-14 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-7 h-7" />
            </div>
          )}
          {(type === 'info' || type === 'success') && (
            <div className="w-14 h-14 rounded-full bg-accent/20 text-accent flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-extrabold text-xl text-primary tracking-tight mb-2">
          {title || 'Are you sure?'}
        </h3>

        {/* Message */}
        <p className="text-xs sm:text-sm text-mutedText leading-relaxed mb-6 font-normal max-w-sm mx-auto">
          {message || 'This action cannot be reversed. Please confirm if you wish to proceed.'}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={closeConfirmModal}
            className="flex-1 py-3 px-4 rounded-xl font-heading font-semibold text-xs text-darkText bg-surface hover:bg-[#E9E6E0] border border-borderSubtle transition-all active:scale-[0.98]"
          >
            {cancelText || 'Cancel'}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className={`flex-1 py-3 px-4 rounded-xl font-heading font-bold text-xs text-white shadow-md transition-all active:scale-[0.98] ${
              type === 'danger'
                ? 'bg-error hover:bg-red-700 shadow-red-500/20'
                : type === 'warning'
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20'
                : 'bg-primary hover:bg-accent'
            }`}
          >
            {confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
