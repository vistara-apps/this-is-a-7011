import React, { forwardRef } from 'react';

/**
 * Input component
 */
export const Input = forwardRef(({
  type = 'text',
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-slate-300 text-sm font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 disabled:opacity-70 disabled:cursor-not-allowed ${
          error ? 'border-red-500 focus:border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

/**
 * Textarea component
 */
export const Textarea = forwardRef(({
  label,
  error,
  className = '',
  rows = 3,
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-slate-300 text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 resize-none disabled:opacity-70 disabled:cursor-not-allowed ${
          error ? 'border-red-500 focus:border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

/**
 * Search input component
 */
export const SearchInput = forwardRef(({
  onSearch,
  className = '',
  placeholder = 'Search...',
  ...props
}, ref) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input
        type="search"
        ref={ref}
        className={`w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 ${className}`}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

