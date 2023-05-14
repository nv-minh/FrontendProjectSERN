import { text } from '../../ultils/constant';
import { Province, RelatedPost } from '../../components/index';
import { ListOfNewpapers, Pagination } from './index';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ItemSidebar } from '../../components';
import { RootState } from '../../store/interface';

const HomePage = () => {
  const { posts } = useSelector((state: RootState) => state.posts);
  const { categories, prices, areas } = useSelector((state: RootState) => state.app);
  const [params] = useSearchParams();
  let queryPage = params.get('page') || '1';

  const location = useLocation();

  return (
    <div className="flex flex-col w-[70%] gap-3 ">
      <div>
        <h1 className="text-[20px] text-bold">{text.HOME_TITLE}</h1>
        <p className="text-sm text-gray-500 ">{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div>
        <h1 className="text-[28px] font-bold">
          {location.state?.titleSearch || 'Kết quả tìm kiếm'}
        </h1>
        <p className="text-base text-gray-700">{`${
          location.state?.titleSearch || ''
        } phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</p>
      </div>

      <div className="flex w-full gap-3 ">
        <div className=" w-[70%]  bg-white rounded-md border border-[#dedede] h-full">
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
          {/*<img*/}
          {/*  src={download}*/}
          {/*  alt=""*/}
          {/*  className=" w-full h-[400px] rounded-md object-contain"*/}
          {/*/>*/}
        </div>
      </div>
      <div className="mt-5 mb-12 mr-56">
        <Pagination itemsNumber={posts?.length} queryPage={queryPage} />
      </div>
    </div>
  );
};

export default HomePage;
