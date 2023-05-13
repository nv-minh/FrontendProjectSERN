import React, { useEffect, useRef, useState } from 'react';
import { Button, ItemsNewpaper } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsLimit } from '../../store/actions/post';
import { PostsAction, RootState } from '../../store/interface';
import { useSearchParams } from 'react-router-dom';
import { IPost } from '../../interface';

interface prop {
  queryPage: string;
}

const ListOfNewpapers = (prop: prop) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);
  // const listRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    dispatch(getPostsLimit(+prop.queryPage, {}) as unknown as PostsAction);
    // if (listRef) {
    //   listRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //
  }, []);
  return (
    <div className="p-2">
      <div className="flex items-center justify-between ">
        <h4 className="text-base font-medium">Danh sách tin đăng</h4>
        <span className="text-xs">Cập nhật: 12:05 25/08/2022</span>
      </div>
      <div className="flex items-center gap-1 py-2 text-xs">
        <span className="text-sm">Sắp xếp</span>
        <Button
          text="Mặc định"
          textColor="text-black"
          bgColor="!bg-[#f1f1f1]"
          size="h-[25px] w-[110px]"
        />
        <Button
          text="Mới nhất"
          textColor="text-black"
          bgColor="!bg-[#f1f1f1]"
          size="h-[25px] w-[100px]"
        />
      </div>
      <div className="flex flex-col">
        {posts &&
          posts?.length > 0 &&
          posts.map((item: IPost) => {
            const obj = JSON.parse(item.images.image);
            return (
              <div className=" flex-1">
                <ItemsNewpaper
                  key={item?.id}
                  images={obj}
                  address={item.address}
                  attributes={item.attributes}
                  title={item.title}
                  description={item.description ? JSON.parse(item.description) : ''}
                  user={item.user}
                  star={item.star}
                  id={item?.id}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListOfNewpapers;
