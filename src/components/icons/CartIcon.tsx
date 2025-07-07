import React from 'react';

const CartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="29"
    height="29"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <rect width="38" height="38" fill="#FFF159" />
    <path
      d="M2 9.5H6.5L11.5 22H27L31 12H8.5"
      stroke="#333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="13.5" cy="28" r="3" stroke="#333" strokeWidth="1.5" />
    <circle cx="25.5" cy="28" r="3" stroke="#333" strokeWidth="1.5" />
  </svg>
);

export default CartIcon;
