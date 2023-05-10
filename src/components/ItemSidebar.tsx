import React, { memo, useState } from 'react';
import icons from '../ultils/icons';
import { ICategories, PostsAction } from '../store/interface';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString';
import { useDispatch } from 'react-redux';
import { apiGetPostsLimit } from '../services';
import * as actions from '../store/actions';
import Swal from 'sweetalert2';

const { GrNext } = icons;

interface props {
  categories: ICategories[] | undefined | null;
  title: string;
  twoRows: boolean;
}

const oneRow =
  'flex gap-2 items-baseline cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed w-full';
const twoRows =
  'flex w-[48.33333%] gap-2 items-baseline cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed';

const ItemSidebar = (props: props) => {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  let queryPage = params.get('page') || '1';
  // console.log(queryPage);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickFilterPost = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    queryFilter: string,
    url: string,
  ) => {
    event.preventDefault();

    if (url.includes('thuê')) {
      navigate(formatVietnameseToString(url), {
        state: {
          queries: {
            categoryCode: queryFilter,
            areaCode: '',
            priceCode: '',
          },
        },
      });
      dispatch(
        actions.getPostsLimit(+queryPage, {
          categoryCode: queryFilter,
        }) as unknown as PostsAction,
      );
    } else if (url.includes('m')) {
      navigate(formatVietnameseToString(url), {
        state: {
          queries: {
            categoryCode: '',
            areaCode: queryFilter,
            priceCode: '',
          },
        },
      });
      dispatch(
        actions.getPostsLimit(+queryPage, {
          areaCode: queryFilter,
        }) as unknown as PostsAction,
      );
    } else {
      navigate(formatVietnameseToString(url), {
        state: {
          queries: {
            categoryCode: '',
            areaCode: '',
            priceCode: queryFilter,
          },
        },
      });
      dispatch(
        actions.getPostsLimit(+queryPage, {
          priceCode: queryFilter,
        }) as unknown as PostsAction,
      );
    }
    Swal.fire('Good job!', `Bạn đã tìm kiếm phòng trọ với tiêu chí : ${url}`, 'success');
  };

  return (
    <div className="p-4 rounded-md bg-white w-full">
      <h2 className="text-xl font-semibold">{props.title}</h2>
      <div
        className={`flex gap-2  pt-2 items-start ${
          props.twoRows ? 'flex-wrap' : 'flex-col'
        }`}
      >
        {props.categories?.length &&
          props.categories.map((item) => {
            return (
              <NavLink
                key={item.code}
                className={props.twoRows ? twoRows : oneRow}
                to={formatVietnameseToString(item.value)}
                onClick={(event) => {
                  handleClickFilterPost(event, item.code, item.value);
                }}
              >
                <GrNext size={10} color={'#eee'} />
                <p>{item.value}</p>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};
export default memo(ItemSidebar);
