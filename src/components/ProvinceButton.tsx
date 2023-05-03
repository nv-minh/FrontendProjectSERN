import React, { memo } from 'react';
import { IProVinceButton } from '../interface';

const ProvinceButton = ({ name, image }: IProVinceButton) => {
  return (
    <div className="shadow-md rounded-br-md rounded-bl-md ">
      <img
        src={image}
        alt="Error"
        className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md"
      />
      <div className="p-2 text-sm font-medium text-center text-blue-700 hover:text-orange-600">
        {name}
      </div>
    </div>
  );
};

export default memo(ProvinceButton);
