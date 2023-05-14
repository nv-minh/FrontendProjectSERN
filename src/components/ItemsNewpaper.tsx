import React, { memo, useState } from 'react';
import icons from '../ultils/icons';
import { IPost } from '../interface';
import { useNavigate } from 'react-router-dom';
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString';
import anonAvatar from '../assets/anon-avatar.png';
import { blodToBase64 } from '../ultils/Common/toBase64';
import path from '../ultils/constant';

const indexs = [0, 1, 2, 3];
const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons;
const ItemsNewpaper = ({
  images,
  user,
  title,
  star,
  description,
  attributes,
  address,
  id,
}: IPost) => {
  const navigate = useNavigate();
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  const imageCount = images?.length;
  const handleStar = (star: number) => {
    let stars = [];
    for (let i = 0; i < +star; i++) {
      stars.push(<GrStar className="star-item" color="#ffd454" fontSize="1.5em" />);
    }
    return stars;
  };
  const goDetail = () => {
    navigate(
      `${path.DETAIL}/${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`,
    );
  };
  return (
    <div className="flex w-full p-4  border-t border-orange-600 bg-[#fff9f3]">
      <div
        className="flex flex-wrap items-center w-2/5 gap-[2px] relative cursor-pointer"
        onClick={goDetail}
      >
        {imageCount &&
          imageCount > 4 &&
          images
            ?.filter((item: {}, index: number) => indexs.some((i) => i === index))
            ?.map((linkImage: string) => {
              return (
                <img
                  key={linkImage + (Math.random() + 1).toString(36).substring(7)}
                  src={linkImage}
                  alt="error"
                  className="w-[49%] h-[120px] object-cover rounded-md"
                />
              );
            })}

        <span className="absolute px-1 text-white bg-[rgba(0,0,0,.5)] rounded-md bottom-[8px] left-[3px]">
          {imageCount} ảnh
        </span>
        <span
          className="absolute px-1 rounded-md bottom-[8px] right-[7px]"
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? (
            <RiHeartFill fontSize="1.5em" color="red" />
          ) : (
            <RiHeartLine fontSize="1.5em" color="white" />
          )}
        </span>
      </div>
      <div className="w-[60%] pl-2">
        <div className="flex justify-between">
          <div className="line-clamp-2 font-medium text-red-600 ">
            {handleStar(+star)?.length > 0 &&
              handleStar(+star).map((element, number) => {
                return (
                  <span key={number + (Math.random() + 1).toString(36).substring(7)}>
                    {element}
                  </span>
                );
              })}
            <span
              className=" w-full cursor-pointer line-clamp-2 text-ellipsis"
              onClick={goDetail}
            >
              {title}
            </span>
          </div>
          <div className="w-[5%]  mt-1">
            <BsBookmarkStarFill fontSize="1.5em" color="orange" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 my-2">
          <span className="overflow-hidden font-bold text-green-600 flex-3 text-ellipsis whitespace-nowrap">
            {attributes.price}
          </span>
          <span className="flex-1">{attributes?.acreage}</span>
          <span className="overflow-hidden flex-3 text-ellipsis whitespace-nowrap">{`${
            address.split(',')[address.split(',').length - 2]
          }${address.split(',')[address.split(',').length - 1]}`}</span>
        </div>
        <p className="text-gray-500 line-clamp-2">
          {description[0]} {description[1]}
        </p>
        <div className="flex items-center justify-between my-5">
          <div className="flex">
            <img
              src={user?.avatar ? blodToBase64(user.avatar) : anonAvatar}
              alt=""
              className="w-[30px] h-[30px]"
            />
            <p className="ml-4 overflow-hidden whitespace-nowrap text-ellipsis">
              {user?.name}
            </p>
          </div>
          <div className="flex items-center justify-end">
            <button type="button" className="text-white bg-blue-700 rounded-md ">
              <span className="mx-2 my-1 ">Gọi {user?.phone}</span>
            </button>
            <button
              className="ml-2 text-blue-700 bg-white border border-blue-700 rounded-md hover:text-white hover:bg-blue-700"
              type="button"
            >
              <span className="mx-2 my-1 ">Nhắn Zalo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ItemsNewpaper);
