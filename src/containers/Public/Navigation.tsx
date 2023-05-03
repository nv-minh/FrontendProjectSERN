import { useEffect, useState } from 'react';
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { Dispatch } from 'redux';
import { CategoriesAction, PostsAction, RootState } from '../../store/interface';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const dispatch: Dispatch<CategoriesAction> = useDispatch();
  const { categories } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(actions.getCategories() as unknown as CategoriesAction);
    const element = document.getElementById('navigation');

    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        element?.classList.add('fixed');
      }
    });
  }, []);
  const [currentPage, setCurrentPage] = useState<string | undefined>('');
  const onClickNavigate = (categoryCode?: string) => {
    categoryCode ? setCurrentPage(categoryCode) : setCurrentPage('');
    const page = 1;
    categoryCode
      ? dispatch(actions.getPostsLimit(+page, { categoryCode }) as unknown as PostsAction)
      : dispatch(actions.getPostsLimit(+page, {}) as unknown as PostsAction);
  };
  return (
    <div className="navigation w-full h-[40px] bg-secondary1 text-white  top-0 border-0 overflow-y-scroll overflow-x-hidden z-10 sticky">
      <div className="flex justify-center w-full h-full font-medium m-text-sm auto">
        <div
          className={
            '' === currentPage
              ? 'flex items-center justify-center w-20 h-full bg-secondary2'
              : 'flex items-center justify-center w-20 h-full '
          }
        >
          <NavLink to={'/'} onClick={() => onClickNavigate()}>
            Trang chủ
          </NavLink>
        </div>
        {categories &&
          categories?.length > 0 &&
          categories.map((item) => {
            return (
              <div
                key={item.code}
                className={
                  item.code === currentPage
                    ? `flex items-center justify-center h-full px-3 py-0 hover:bg-secondary2 bg-secondary2`
                    : 'flex items-center justify-center h-full px-3 py-0 hover:bg-secondary2'
                }
              >
                <NavLink
                  to={formatVietnameseToString(item.value)}
                  onClick={() => onClickNavigate(item.code)}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
