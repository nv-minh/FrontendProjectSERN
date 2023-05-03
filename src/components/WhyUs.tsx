import { text } from '../ultils/WhyUsData';
import icons from '../ultils/icons';
import { Button } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { PostsAction, RootState } from '../store/interface';
import React, { memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString';
import * as actions from '../store/actions';

const { GrStar } = icons;
const star = [1, 2, 3, 4, 5];
const WhyUs = () => {
  const { categories } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickFilterPost = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    categoryCode: string,
    url: string,
  ) => {
    event.preventDefault();
    navigate(formatVietnameseToString(url));

    dispatch(
      actions.getPostsLimit(1, {
        categoryCode,
      }) as unknown as PostsAction,
    );
  };
  return (
    <div className=" flex-col w-[70%] border  bg-white rounded-md shadow-md p-1 flex justify-center items-center px-16">
      <h3 className=" text-xl font-bold pt-7">{text.title}</h3>
      <p className="text-gray-800 my-4 text-center">
        {text.description}
        <span>
          {categories &&
            categories?.length > 0 &&
            categories.map((item) => {
              return (
                <NavLink
                  to={formatVietnameseToString(item.value)}
                  key={item.code}
                  className="cursor-pointer text-blue-700 text-lg font-medium"
                  onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
                    handleClickFilterPost(event, item.code, item.value)
                  }
                >
                  {`${item.value.toLowerCase()}, `}
                </NavLink>
              );
            })}
        </span>
        {text.description2}
      </p>
      <div className="w-full flex justify-around items-center">
        {text.statistic.map((item, index) => {
          return (
            <div key={index} className="flex flex-col justify-center items-center">
              <h4 className="font-bold text-2xl">{item.value}</h4>
              <p className="text-gray-700">{item.name}</p>
            </div>
          );
        })}
      </div>
      <h3 className="font-bold text-xl py-2">{text.price}</h3>
      <div className="flex items-center justify-center gap-1">
        {star.map((item) => {
          return (
            <span key={item}>
              <GrStar className="star-item" color="#ffd454" fontSize="1.5em" />
            </span>
          );
        })}
      </div>
      <p className="text-gray-700 italic text-center py-4 ">{text.comment}</p>
      <span className="text-gray-700 ">{text.author}</span>
      <h3 className="font-bold text-xl py-2">{text.question}</h3>
      <p className="pb-4">{text.answer}</p>
      <Button text="Đăng tin ngay" bgColor="bg-secondary2" textColor="text-white" />
    </div>
  );
};

export default memo(WhyUs);
