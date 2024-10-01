  import React from 'react';
  import LogoImage from '../assets/Logo.png'

  const Logo = ({
    className
  }) => {
    return (
      <div className="relative flex flex-col justify-center items-center">
        <img src={LogoImage} alt="Logo" className={`${className}`} />
      </div>
    );
  };

  export default Logo;
