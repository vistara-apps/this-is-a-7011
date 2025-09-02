import React from 'react';

/**
 * Tabs component
 * @param {Object} props - Component props
 * @param {string} props.value - Current active tab value
 * @param {Function} props.onChange - Function called when tab changes
 * @param {React.ReactNode} props.children - Tab components
 * @param {string} [props.className=''] - Additional CSS classes
 */
export function Tabs({
  value,
  onChange,
  children,
  className = '',
  ...rest
}) {
  // Filter out only Tab components
  const tabs = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && child.type === Tab
  );
  
  return (
    <div className={`${className}`} {...rest}>
      <div className="glass-card rounded-lg p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const isActive = tab.props.value === value;
            
            return React.cloneElement(tab, {
              key: tab.props.value,
              isActive,
              onClick: () => onChange(tab.props.value)
            });
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Tab component
 * @param {Object} props - Component props
 * @param {string} props.value - Tab value
 * @param {string} props.label - Tab label
 * @param {React.ReactNode} [props.icon] - Tab icon
 * @param {boolean} [props.isActive=false] - Whether the tab is active
 * @param {Function} [props.onClick] - Function called when tab is clicked
 * @param {string} [props.className=''] - Additional CSS classes
 */
export function Tab({
  value,
  label,
  icon: Icon,
  isActive = false,
  onClick,
  className = '',
  ...rest
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-md transition-all duration-200 ${
        isActive
          ? 'bg-primary-500 text-white shadow-lg'
          : 'text-slate-400 hover:text-white hover:bg-white/10'
      } ${className}`}
      {...rest}
    >
      {Icon && <Icon size={18} />}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

/**
 * Tab panels component
 * @param {Object} props - Component props
 * @param {string} props.value - Current active tab value
 * @param {React.ReactNode} props.children - TabPanel components
 * @param {string} [props.className=''] - Additional CSS classes
 */
export function TabPanels({
  value,
  children,
  className = '',
  ...rest
}) {
  // Filter out only TabPanel components
  const panels = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && child.type === TabPanel
  );
  
  // Find the active panel
  const activePanel = panels.find(panel => panel.props.value === value);
  
  return (
    <div className={`mt-4 ${className}`} {...rest}>
      {activePanel}
    </div>
  );
}

/**
 * Tab panel component
 * @param {Object} props - Component props
 * @param {string} props.value - Panel value (should match tab value)
 * @param {React.ReactNode} props.children - Panel content
 * @param {string} [props.className=''] - Additional CSS classes
 */
export function TabPanel({
  value,
  children,
  className = '',
  ...rest
}) {
  return (
    <div className={`animate-fade-in ${className}`} {...rest}>
      {children}
    </div>
  );
}

