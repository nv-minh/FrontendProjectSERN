import './App.css';
import { Route, Routes } from 'react-router-dom';
import path from './ultils/constant';
import Home from './containers/Public/Home';
import React, { useEffect } from 'react';

import { DetailPost, HomePage, Login, Register } from './containers/Public';
import { ManagePost, PostEditor, System } from './containers/System';
import * as actions from './store/actions';
import {
  CategoriesAction,
  CurrentUserAction,
  PostsAction,
  RootState,
} from './store/interface';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch: Dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent() as unknown as CurrentUserAction);
    }, 2000);
  }, [isLoggedIn]);
  useEffect(() => {
    dispatch(actions.getPrice() as unknown as CategoriesAction);
    dispatch(actions.getAreas() as unknown as CategoriesAction);
    dispatch(actions.getProvinces() as unknown as CategoriesAction);
    dispatch(actions.getNewsPost() as unknown as PostsAction);
  }, []);
  return (
    <div className="w-full h-full bg-primary overflow-hidden">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<HomePage />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<HomePage />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<HomePage />} />
          <Route path={path.NHA_CHO_THUE} element={<HomePage />} />
          <Route path={path.DETAIL_POST_TITLE_POSTID} element={<DetailPost />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<PostEditor />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
