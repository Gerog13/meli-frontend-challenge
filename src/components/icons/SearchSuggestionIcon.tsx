import React from 'react';

const SearchSuggestionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={props.width || 18}
    height={props.height || 18}
    viewBox="0 0 1024 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M398.725 689.682c156.825 0 284.95-128.125 284.95-284.95 0-157.85-128.125-284.95-284.95-284.95s-284.95 127.1-284.95 284.95c0 156.825 128.125 284.95 284.95 284.95zm0 56.375c-188.6 0-341.325-152.725-341.325-341.325S210.125 63.407 398.725 63.407 740.05 216.132 740.05 404.732 587.325 746.057 398.725 746.057zm235.75-65.6l248.05 248.05 39.976-39.975-19.474-20.5-227.55-227.55-20.5-19.475L615 660.982l19.476 19.475z"
      fill={props.fill || '#999999'}
    />
  </svg>
);

export default SearchSuggestionIcon;
