import { Outlet } from 'react-router';
import Header from './Header';
import Navigation from './Navigation';
import Search from './Search';
import React, { useEffect, useState } from 'react';
import { WhyUs, Contact } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentUserAction, RootState } from '../../store/interface';
import * as actions from '../../store/actions';

const Home = () => {
  const [queriesEmpty, setQueriesEmpty] = useState<{ [key: string]: any }>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { currentData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent() as unknown as CurrentUserAction);
    }, 2000);
  }, [isLoggedIn]);
  return (
    <div className="flex flex-col items-center w-full h-full gap-4">
      <Header />
      <Navigation setQueriesEmpty={setQueriesEmpty} />
      <div className="w-[70%]">
        <Search
          queriesEmpty={
            queriesEmpty || {
              categoriesCode: '',
              categories: '',
              provincesCode: '',
              provinces: '',
              pricesCode: '',
              prices: '',
              areasCode: '',
              areas: '',
            }
          }
        />
      </div>
      <div className="flex flex-col items-center justify-start w-full">
        <Outlet />
      </div>
      <WhyUs />
      <Contact />
      <div className="h-[200px]"></div>
    </div>
  );
};

export default Home;
