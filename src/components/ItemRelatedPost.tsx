import { IPost } from '../interface';
import { memo } from 'react';
import moment from 'moment';
import 'moment/locale/vi';

interface props {
  posts: IPost;
}

const ItemRelatedPost = (props: props) => {
  const obj = JSON.parse(props.posts.images.image);
  const formatTime = (createdAt: string) => {
    return moment(createdAt).fromNow();
  };
  return (
    <div className="w-full flex items-center gap-2 border-b border-gray-500 py-2">
      <img
        src={obj[0]}
        alt="error"
        className="w-[65px] h-[65px] object-cover rounded-md flex-none "
      />
      <div>
        <div className="flex flex-col justify-between w-full gap-1 flex-auto">
          <h4 className="text-blue-600 text-[14px] line-clamp-1 ">{props.posts.title}</h4>
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium text-green-500 ">
              {props.posts.attributes.price}
            </span>
            <span className="text-sm text-gray-300">
              {props.posts.createdAt && formatTime(props.posts.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ItemRelatedPost);
