import React from "react";
import { Logo } from "./index.js";
import { FiArrowLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux'; 
import { selectHeaderTitle } from '../store/headerSlice'; 

function Header() {
  const title = useSelector(selectHeaderTitle); 

  return (
    <div className="absolute z-10 top-0 left-0 w-full bg-blue-50">
      <div className="bg-blue-600 ml-14 flex bg-gradient-to-r from-blue-900 to-blue-500 justify-between rounded-[50px] rounded-r rounded-t text-white p-5 text-center">
        <div className="ml-10 flex gap-3 items-center">
          <FiArrowLeft className="text-2xl mt-1" />
          <h1 className="text-2xl font-semibold">{title}</h1> 
        </div>
        <Logo className={"h-20"} />
        <div></div>
      </div>
    </div>
  );
}

export default Header;
