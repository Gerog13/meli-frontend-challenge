import React from 'react';

const HamburgerIcon: React.FC = () => (
  <span>
    <span
      className="hamburger-top-bread"
      style={{
        display: 'block',
        position: 'absolute',
        width: 20,
        height: 1,
        background: '#333',
        top: 16,
        left: 12.5,
        margin: 0,
        borderRadius: 0,
      }}
    />
    <span
      className="hamburger-patty"
      style={{
        display: 'block',
        position: 'absolute',
        width: 20,
        height: 1,
        background: '#333',
        top: 23.5,
        left: 12.5,
        margin: 0,
        borderRadius: 0,
      }}
    />
    <span
      className="hamburger-bottom-bread"
      style={{
        display: 'block',
        position: 'absolute',
        width: 20,
        height: 1,
        background: '#333',
        top: 30,
        left: 12.5,
        margin: 0,
        borderRadius: 0,
      }}
    />
  </span>
);

export default HamburgerIcon;
