import React from 'react';

/**
 * Avatar component
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text for the image
 * @param {string} [props.size='md'] - Avatar size (xs, sm, md, lg, xl)
 * @param {string} [props.status] - Online status (online, offline, away, busy)
 * @param {string} [props.className=''] - Additional CSS classes
 */
export function Avatar({
  src,
  alt,
  size = 'md',
  status,
  className = '',
  ...rest
}) {
  // Default avatar if src is not provided
  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${alt || 'user'}`;
  
  // Size classes
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  // Status classes and positions
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-slate-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };
  
  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };
  
  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={src || defaultAvatar}
        alt={alt || 'Avatar'}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white/20`}
        {...rest}
      />
      
      {status && (
        <span 
          className={`absolute bottom-0 right-0 block ${statusSizes[size]} ${statusClasses[status]} rounded-full ring-2 ring-white`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * Avatar group component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Avatar components
 * @param {number} [props.max=3] - Maximum number of avatars to show
 * @param {string} [props.size='md'] - Avatar size (xs, sm, md, lg, xl)
 * @param {string} [props.className=''] - Additional CSS classes
 */
Avatar.Group = function AvatarGroup({
  children,
  max = 3,
  size = 'md',
  className = '',
  ...rest
}) {
  // Convert children to array
  const avatars = React.Children.toArray(children);
  
  // Determine overlap based on size
  const overlapSizes = {
    xs: '-ml-1',
    sm: '-ml-2',
    md: '-ml-2.5',
    lg: '-ml-3',
    xl: '-ml-4'
  };
  
  // Size classes for the +X element
  const countSizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };
  
  return (
    <div className={`flex ${className}`} {...rest}>
      {avatars.slice(0, max).map((avatar, index) => (
        <div 
          key={index} 
          className={`${index > 0 ? overlapSizes[size] : ''} relative z-${30 - index}`}
        >
          {React.cloneElement(avatar, { size })}
        </div>
      ))}
      
      {avatars.length > max && (
        <div className={`${overlapSizes[size]} relative z-0`}>
          <div 
            className={`${countSizeClasses[size]} rounded-full bg-slate-700 border-2 border-white/20 flex items-center justify-center text-white font-medium`}
          >
            +{avatars.length - max}
          </div>
        </div>
      )}
    </div>
  );
};

