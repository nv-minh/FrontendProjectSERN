import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logowithoutbg.png';
import { Button } from '../../components';
import icons from '../../ultils/icons';
import path from '../../ultils/constant';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import Swal from 'sweetalert2';

const { FaPlusCircle } = icons;
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  useEffect(() => {
    if (headerRef) {
      headerRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const goLogin = useCallback((flag: string) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  const goRegister = useCallback((flag: string) => {
    navigate(path.REGISTER, { state: { flag } });
  }, []);
  return (
    <div ref={headerRef} className="w-[70%]">
      <div className="flex items-center justify-around w-full">
        <Link to={path.HOME}>
          <img src={logo} alt="logo" className="w-[240px] h-[70px] object-contain" />
        </Link>
        <div className="flex gap-1">
          <small className="pt-2">Phongtro123.com xin chào!</small>
          {!isLoggedIn && (
            <>
              <Button
                text="Đăng Nhập"
                textColor="text-white"
                bgColor="!bg-[#3961fb]"
                onClick={() => goLogin('login')}
              />
              <Button
                text="Đăng Ký"
                textColor="text-white"
                bgColor="!bg-[#3961fb]"
                onClick={() => goRegister('register')}
              />
            </>
          )}
          {isLoggedIn && (
            <Button
              text="Đăng Xuất"
              textColor="text-white"
              bgColor="!bg-[#3961fb]"
              onClick={() => {
                dispatch(actions.logout() as unknown as any);
                Swal.fire('Warning', 'Bạn sẽ đăng xuất!', 'warning');
              }}
            />
          )}
          <Button
            text="Đăng Tin Mới"
            textColor="text-white"
            bgColor="!bg-secondary2"
            IcAfter={FaPlusCircle}
            // onClick={goLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
