import React from 'react';
import './StarBorder.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = '#57db96',
  speed = '4s',
  borderRadius = '32px',
  children,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        '--star-color': color,
        '--star-speed': speed,
        '--border-radius': borderRadius,
      }}
      {...rest}
    >
      <div className="relative z-10 w-full h-full bg-[#030412] rounded-[calc(var(--border-radius)-2px)]">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
