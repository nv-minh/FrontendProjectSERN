import React, { memo } from 'react';
import { ISearchItemProps } from '../interface';

const SearchItem = ({ IconBefore, IconAfter, text, fontWeight }: ISearchItemProps) => {
  return (
    <div className="w-full p-4 text-sm text-gray-400 bg-white rounded-md h-[35px] flex items-center justify-between">
      <div className="flex items-center ">
        <IconAfter className="bg-[rgb(156, 163, 175)]" />
        <span className={fontWeight && `${fontWeight} text-ellipsis overflow-hidden`}>
          {text}
        </span>
      </div>
      <IconBefore />
    </div>
  );
};

export default memo(SearchItem);
