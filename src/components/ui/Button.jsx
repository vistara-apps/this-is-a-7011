import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button component with variants
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant (primary, secondary, outline)
 * @param {boolean} [props.isLoading=false] - Whether the button is in loading state
 * @param {boolean} [props.fullWidth=false] - Whether the button should take full width
 * @param {string} [props.size='md'] - Button size (sm, md, lg)
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ButtonHTMLAttributes} props.rest - Other button props
 */
export function Button({
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  size = 'md',
  children,
  className = '',
  ...rest
}) {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-accent-500 hover:bg-accent-600 text-white',
    outline: 'border border-white/20 text-slate-300 hover:bg-white/10',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combined classes
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${className}`;
  
  return (
    <button className={combinedClasses} disabled={isLoading || rest.disabled} {...rest}>
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="animate-spin" />
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

