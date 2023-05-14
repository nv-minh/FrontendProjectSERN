import { memo } from 'react';
import Slider from 'react-slick';

let settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SliderCustom = ({ images }: any) => {
  return (
    <div className="w-full">
      <Slider {...settings}>
        {/*<div className="flex justify-center bg-black h-[320px]">*/}
        {images?.length > 0 &&
          images?.map((image: any, index: any) => {
            return (
              <div
                className="flex  bg-black justify-center h-[320px] px-12 rounded-md"
                key={index}
              >
                <img src={image} alt="" className="h-full object-contain m-auto" />
              </div>
            );
          })}
        {/*</div>*/}
      </Slider>
    </div>
  );
};
export default memo(SliderCustom);
