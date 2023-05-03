import { ItemRelatedPost } from './index';
import { useSelector } from 'react-redux';
import { RootState } from '../store/interface';
import { memo } from 'react';

const RelatedPost = () => {
  const { newsPost } = useSelector((state: RootState) => state.posts);
  return (
    <div className="w-full p-4 rounded-md bg-white">
      <h3 className="font-semibold text-xl">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-2">
        {newsPost &&
          newsPost?.length > 0 &&
          newsPost.map((item: any) => {
            return <ItemRelatedPost key={item.id} posts={item} />;
          })}
      </div>
    </div>
  );
};

export default memo(RelatedPost);
