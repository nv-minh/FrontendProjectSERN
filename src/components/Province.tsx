import React from 'react';
import { location } from '../ultils/constant';
import ProvinceButton from './ProvinceButton';

const Province = () => {
  return (
    <div className="flex justify-center gap-4 py-3 cursor-pointer ">
      {location.map((item) => {
        return <ProvinceButton name={item.name} image={item.image} key={item.id} />;
      })}
    </div>
  );
};

export default Province;
