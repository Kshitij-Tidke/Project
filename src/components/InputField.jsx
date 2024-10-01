import React from 'react';

const InputField = ({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
  icon,
  autocomplete,
  className,
  iClassName,
  isError, 
  errorMessage, 
}) => {
  return (
    <div className={`${className} relative`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autocomplete}
        className={`mt-1 w-full px-4 py-2 focus:ring-blue-500 focus:border-blue-500 ${iClassName} ${
          isError ? 'border-red-500' : 'border-gray-600'
        }`} 
      />
      {icon && (
        <div className={`absolute inset-y-0 right-0 flex items-center pr-3  ${isError ? 'pb-6' : ''}`}> 
          {icon}
        </div>
      )}
      {isError && errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p> 
      )}
    </div>
  );
};

export default InputField;
