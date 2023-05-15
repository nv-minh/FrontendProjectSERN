import { Navigation } from '../Public';
import { NavLink } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <div className="w-full flex flex-none h-[40px]">
      <div className="flex justify-center items-center font-bold bg-secondary1 text-white w-[256px] flex-none">
        <NavLink
          to={'/'}
          onClick={() => {
            window.location.href = '/';
          }}
          className="pt-2 cursor-pointer"
        >
          Phongtro123.com
        </NavLink>
      </div>
      <div className="flex-auto">
        <Navigation isAdmin={true} />
      </div>
    </div>
  );
};

export default Header;
