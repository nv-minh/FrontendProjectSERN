import { IPost } from '../interface';
import { memo } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import path from '../ultils/constant';
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString';
import { useLocation, useNavigate } from 'react-router-dom';

interface props {
  posts: IPost;
}

const ItemRelatedPost = (props: props) => {
  const obj = JSON.parse(props.posts.images.image);
  const navigate = useNavigate();
  const location = useLocation();
  const rootUrl = window.location.origin;
  const goDetail = () => {
    navigate(
      `/${path.DETAIL}/${formatVietnameseToString(
        props.posts.title?.replaceAll('/', ''),
      )}/${props.posts.id}`,
    );
  };
  const formatTime = (createdAt: string) => {
    return moment(createdAt).fromNow();
  };
  return (
    <div
      className="w-full flex items-center gap-2 border-b border-gray-500 py-2 cursor-pointer"
      onClick={goDetail}
    >
      <img
        src={obj[0]}
        alt="error"
        className="w-[65px] h-[65px] object-cover rounded-md flex-none "
      />
      <div className="flex flex-col justify-between w-full gap-1 flex-auto whitespace-nowrap overflow-hidden text-ellipsis  ">
        <h4 className="text-blue-600 text-[14px] w-full ">{props.posts.title}</h4>
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
  );
};
export default memo(ItemRelatedPost);
