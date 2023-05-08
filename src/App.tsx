import './App.css';
import { Route, Routes } from 'react-router-dom';
import path from './ultils/constant';
import Home from './containers/Public/Home';
import React from 'react';

import { DetailPost, HomePage, Login, Register } from './containers/Public';
import { System } from './containers/System/index';

function App() {
  return (
    <div className="w-full h-full bg-primary">
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
          {/*<Route path={path.CREATE_POST} element={<CreatePost />} />*/}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
