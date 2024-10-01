import React from 'react';

const Button = ({ type, label, onClick, disabled, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full sm:w-auto ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
