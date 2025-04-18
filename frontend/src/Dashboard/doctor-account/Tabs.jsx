import {useContext} from 'react';
import { BiMenu } from 'react-icons/bi';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Tabs = ({ tab, setTab }) => {

    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
        navigate('/')
    }

  return (
    <div>
      {/* Menu Icon for Mobile */}
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>

      {/* Tabs for Desktop */}
      <div className="hidden lg:flex flex-col p-5 bg-white shadow-panelShadow items-center h-max rounded-xl">
        {/* Overview Tab */}
        <button
          onClick={() => setTab('overview')}
          className={`${
            tab === 'overview'
              ? 'bg-[#0067FF] text-white shadow-sm'
              : 'bg-transparent text-[#181A1E] hover:bg-[#e0eaff]'
          } w-full py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out`}
        >
          Overview
        </button>

        {/* Appointments Tab */}
        <button
          onClick={() => setTab('appointments')}
          className={`${
            tab === 'appointments'
              ? 'bg-[#0067FF] text-white shadow-sm'
              : 'bg-transparent text-[#181A1E] hover:bg-[#e0eaff]'
          } w-full py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out mt-3`}
        >
          Appointments
        </button>

        {/* Settings Tab */}
        <button
          onClick={() => setTab('settings')}
          className={`${
            tab === 'settings'
              ? 'bg-[#0067FF] text-white shadow-sm'
              : 'bg-transparent text-[#181A1E] hover:bg-[#e0eaff]'
          } w-full py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out mt-3`}
        >
          Settings
        </button>
    
        <div className='mt-[100px] w-full'>
            <button 
            onClick={handleLogout}
            className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
            Logout
            </button>
            <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                Delete Account
            </button>

        </div>

      </div>
    </div>
  );
};

export default Tabs;
