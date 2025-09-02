import React, { createContext, useContext, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    
    setToasts(prevToasts => [...prevToasts, newToast]);
    
    // Auto-remove toast after duration
    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  };

  // Remove a toast by ID
  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  // Helper functions for different toast types
  const showSuccess = (message, duration) => addToast(message, 'success', duration);
  const showError = (message, duration) => addToast(message, 'error', duration);
  const showWarning = (message, duration) => addToast(message, 'warning', duration);
  const showInfo = (message, duration) => addToast(message, 'info', duration);

  // Toast icon based on type
  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={18} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={18} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={18} />;
      case 'info':
      default:
        return <Info className="text-blue-500" size={18} />;
    }
  };

  // Toast background color based on type
  const getToastBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20';
      case 'error':
        return 'bg-red-500/10 border-red-500/20';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20';
      case 'info':
      default:
        return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  const value = {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast container */}
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
          {toasts.map(toast => (
            <div
              key={toast.id}
              className={`glass-card rounded-lg p-3 border ${getToastBgColor(toast.type)} animate-slide-up flex items-start gap-3`}
            >
              {getToastIcon(toast.type)}
              <div className="flex-1 text-white text-sm">{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

