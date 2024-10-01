import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { MdShowChart, MdListAlt, MdAddCircleOutline } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux'; 
import { logout } from '../store/userSlice'; 
import { setTitle } from '../store/headerSlice'; 
import Header from './Header';

const LeftSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/'); 
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-50 flex flex-col h-full items-center justify-between p-4">
        <div></div>
        <div className="space-y-8">
          <MdShowChart
            className="text-3xl cursor-pointer"
            onClick={() => {
              dispatch(setTitle('Dashboard')); 
              navigate('/chart'); 
            }}
          />
          <MdListAlt
            className="text-3xl cursor-pointer"
            onClick={() => {
              dispatch(setTitle('Project Listing'));
              navigate('/list'); 
            }}
          />
          <MdAddCircleOutline
            className="text-3xl cursor-pointer"
            onClick={() => {
              dispatch(setTitle('Create Project'));
              navigate('/dashboard'); 
            }}
          />
        </div>
        <div>
          <FiLogOut
            className="text-2xl cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>

      <Header />
    </div>
  );
};

export default LeftSideBar;
