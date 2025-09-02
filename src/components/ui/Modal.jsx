import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Modal component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function called when modal is closed
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} [props.variant='dialog'] - Modal variant (dialog, sheet)
 * @param {string} [props.size='md'] - Modal size (sm, md, lg, full)
 * @param {string} [props.className=''] - Additional CSS classes
 */
export function Modal({
  isOpen,
  onClose,
  children,
  variant = 'dialog',
  size = 'md',
  className = '',
  ...rest
}) {
  const modalRef = useRef(null);
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full'
  };
  
  // Variant classes
  const variantClasses = {
    dialog: 'rounded-xl p-6',
    sheet: 'rounded-t-xl p-6 fixed bottom-0 left-0 right-0'
  };
  
  // Animation classes
  const animationClasses = {
    dialog: 'animate-fade-in',
    sheet: 'animate-slide-up'
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className={`glass-card ${sizeClasses[size]} ${variantClasses[variant]} ${animationClasses[variant]} w-full mx-4 ${className}`}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Modal header component
 */
Modal.Header = function ModalHeader({ children, onClose, className = '', ...rest }) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`} {...rest}>
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

/**
 * Modal title component
 */
Modal.Title = function ModalTitle({ children, className = '', ...rest }) {
  return (
    <h3 className={`text-xl font-semibold text-white ${className}`} {...rest}>
      {children}
    </h3>
  );
};

/**
 * Modal body component
 */
Modal.Body = function ModalBody({ children, className = '', ...rest }) {
  return (
    <div className={`${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Modal footer component
 */
Modal.Footer = function ModalFooter({ children, className = '', ...rest }) {
  return (
    <div className={`flex items-center justify-end gap-3 mt-6 ${className}`} {...rest}>
      {children}
    </div>
  );
};

