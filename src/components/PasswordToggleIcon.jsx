import React from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const PasswordToggleIcon = ({ isVisible, onToggle }) => {
  return (
    <div onClick={onToggle} className="cursor-pointer mt-6">
      {isVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
    </div>
  );
};

export default PasswordToggleIcon;
