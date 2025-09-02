import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Loading spinner component
 * @param {Object} props - Component props
 * @param {string} [props.size='md'] - Spinner size (sm, md, lg)
 * @param {string} [props.text='Loading...'] - Loading text
 * @param {string} [props.className=''] - Additional CSS classes
 */
export function LoadingSpinner({
  size = 'md',
  text = 'Loading...',
  className = '',
  ...rest
}) {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  // Text size classes
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`} {...rest}>
      <Loader2 className={`${sizeClasses[size]} text-primary-500 animate-spin`} />
      {text && (
        <p className={`mt-2 text-slate-400 ${textSizeClasses[size]}`}>{text}</p>
      )}
    </div>
  );
}

/**
 * Full page loading spinner
 */
LoadingSpinner.FullPage = function FullPageLoadingSpinner({
  text = 'Loading...',
  ...rest
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm z-50">
      <LoadingSpinner size="lg" text={text} {...rest} />
    </div>
  );
};

/**
 * Inline loading spinner
 */
LoadingSpinner.Inline = function InlineLoadingSpinner({
  size = 'sm',
  className = '',
  ...rest
}) {
  return (
    <Loader2 
      className={`inline ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} text-current animate-spin ${className}`}
      {...rest}
    />
  );
};

