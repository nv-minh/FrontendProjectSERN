import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logowithoutbg.png';
import { Button, User } from '../../components';
import icons from '../../ultils/icons';
import path from '../../ultils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { AuthAction, RootState } from '../../store/interface';
import DropdownMenu from './DropdownMenu';

const { FaPlusCircle } = icons;
const Header = () => {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  useEffect(() => {
    if (headerRef) {
      headerRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const goLogin = useCallback((flag: string) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  const goRegister = useCallback((flag: string) => {
    navigate(path.REGISTER, { state: { flag } });
  }, []);

  // handle event dropdown
  const dropdownButton = document.getElementById('dropdown-button');
  const dropdownMenu = dropdownButton?.nextElementSibling;

  dropdownButton?.addEventListener('click', () => {
    dropdownMenu?.classList.toggle('hidden');
  });

  document.addEventListener('click', (event) => {
    if (
      !(event.target instanceof Node) ||
      (!dropdownButton?.contains(event.target) && !dropdownMenu?.contains(event.target))
    ) {
      dropdownMenu?.classList.add('hidden');
    }
  });
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
            <>
              <User />
              <DropdownMenu buttonLabel={'quản lý tài khoản'} />
            </>
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
