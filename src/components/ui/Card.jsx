import React from 'react';

/**
 * Card component with variants
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Card variant (default, gig, project, profile)
 * @param {boolean} [props.interactive=false] - Whether the card is interactive (hover effects)
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className=''] - Additional CSS classes
 */
export function Card({
  variant = 'default',
  interactive = false,
  children,
  className = '',
  ...rest
}) {
  // Base classes
  const baseClasses = 'glass-card rounded-lg p-4 animate-fade-in';
  
  // Variant classes
  const variantClasses = {
    default: '',
    gig: 'border-l-4 border-primary-500',
    project: 'border-l-4 border-accent-500',
    profile: 'border border-white/20'
  };
  
  // Interactive classes
  const interactiveClasses = interactive ? 'hover:bg-white/15 transition-all duration-200 cursor-pointer' : '';
  
  // Combined classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`;
  
  return (
    <div className={combinedClasses} {...rest}>
      {children}
    </div>
  );
}

/**
 * Card header component
 */
Card.Header = function CardHeader({ children, className = '', ...rest }) {
  return (
    <div className={`flex items-start justify-between mb-3 ${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card title component
 */
Card.Title = function CardTitle({ children, className = '', ...rest }) {
  return (
    <h3 className={`font-semibold text-white text-base mb-1 ${className}`} {...rest}>
      {children}
    </h3>
  );
};

/**
 * Card description component
 */
Card.Description = function CardDescription({ children, className = '', ...rest }) {
  return (
    <p className={`text-slate-300 text-sm leading-relaxed ${className}`} {...rest}>
      {children}
    </p>
  );
};

/**
 * Card content component
 */
Card.Content = function CardContent({ children, className = '', ...rest }) {
  return (
    <div className={`${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card footer component
 */
Card.Footer = function CardFooter({ children, className = '', ...rest }) {
  return (
    <div className={`flex items-center justify-between mt-4 ${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card badge component
 */
Card.Badge = function CardBadge({ children, variant = 'default', className = '', ...rest }) {
  const variantClasses = {
    default: 'bg-slate-500/20 text-slate-400',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    danger: 'bg-red-500/20 text-red-400',
    info: 'bg-blue-500/20 text-blue-400',
    primary: 'bg-primary-500/20 text-primary-400',
    accent: 'bg-accent-500/20 text-accent-400'
  };
  
  return (
    <span 
      className={`inline-block px-2 py-1 rounded text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
};

