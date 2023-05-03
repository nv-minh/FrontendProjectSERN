import { text } from '../../ultils/constant';
import { Province } from '../../components/index';
import { ListOfNewpapers, Pagination } from './index';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ItemSidebar } from '../../components';
import { CategoriesAction, PostsAction, RootState } from '../../store/interface';
import { Dispatch } from 'redux';
import { RelatedPost } from '../../components/index';
import * as actions from '../../store/actions';

const HomePage = () => {
  const { posts } = useSelector((state: RootState) => state.posts);
  const { categories, prices, areas } = useSelector((state: RootState) => state.app);
  const [params] = useSearchParams();
  const dispatch: Dispatch<CategoriesAction> = useDispatch();
  let queryPage = params.get('page') || '1';
  useEffect(() => {
    dispatch(actions.getPrice() as unknown as CategoriesAction);
    dispatch(actions.getAreas() as unknown as CategoriesAction);
    dispatch(actions.getProvinces() as unknown as CategoriesAction);
    dispatch(actions.getNewsPost() as unknown as PostsAction);
  }, []);
  return (
    <div className="flex flex-col w-[70%] gap-3 ">
      <div>
        <h1 className="text-[20px] text-bold">{text.HOME_TITLE}</h1>
        <p className="text-sm text-gray-500 ">{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className="flex w-full gap-3 ">
        <div className=" w-[70%]  bg-white rounded-md border border-[#dedede]">
          <ListOfNewpapers queryPage={queryPage} />
        </div>
        <div className="w-[30%]  rounded-md border border-[#dedede] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar
            categories={categories}
            title={'Danh mục cho thuê'}
            twoRows={false}
            key={(Math.random() + 1).toString(36).substring(7)}
          />
          <ItemSidebar
            categories={prices}
            title={'Xem theo giá'}
            twoRows={true}
            key={(Math.random() + 1).toString(36).substring(7)}
          />
          <ItemSidebar
            categories={areas}
            title={'Xem theo diện tích'}
            twoRows={true}
            key={(Math.random() + 1).toString(36).substring(7)}
          />
          <RelatedPost />
        </div>
      </div>
      <div className="mt-5 mb-12 mr-56">
        <Pagination itemsNumber={posts?.length} queryPage={queryPage} />
      </div>
    </div>
  );
};

export default HomePage;
