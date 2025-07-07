import React from 'react';

export const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={props.width || 18}
    height={props.height || 18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <circle cx="9" cy="9" r="8" stroke={props.stroke || '#ccc'} strokeWidth="1.5" fill="none" />
    <path
      d="M9 5.5V9L11.5 11"
      stroke={props.stroke || '#ccc'}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
