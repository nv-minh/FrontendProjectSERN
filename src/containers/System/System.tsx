import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { path } from '../../ultils/constant';
import { Header, Sidebar } from './';
import { CurrentUserAction, RootState } from '../../store/interface';
import * as actions from '../../store/actions';

const System = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent() as unknown as CurrentUserAction);
    }, 2000);
  }, [isLoggedIn]);
  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Header />
      <div className="flex w-full flex-auto h-screen">
        <Sidebar />
        <div className="flex-auto bg-white shadow-md h-full p-4 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
