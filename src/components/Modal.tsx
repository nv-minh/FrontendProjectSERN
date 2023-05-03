import icons from '../ultils/icons';
import React, { useEffect, useState } from 'react';

const { GrLinkPrevious } = icons;

interface props {
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  name: string;
  content: any;
}

export const Modal = (props: props) => {
  const [persent1, setPersent1] = useState(20);
  const [persent2, setPersent2] = useState(50);
  const [activeEl, setActiveEl] = useState('');

  const handleChangeRange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const stackElement = document.getElementById('track');
    const stackRect = stackElement?.getBoundingClientRect();
    if (stackRect) {
      let percent = Math.round(
        ((event.clientX - stackRect.left) * 100) / stackRect.width,
      );
      if (Math.abs(persent1 - percent) <= Math.abs(persent2 - percent)) {
        setPersent1(percent);
      } else {
        setPersent2(percent);
      }
    }
  };

  const handleButtonRange = (code: string, value: string) => {
    let maxValue = +props.content[props.content.length - 1].value.match(/\d+/)[0] || 0;
    let minValue = +props.content[0].value.match(/\d+/)[0] || 0;
    const range = value.match(/\d+/g);
    if (range && range[1]) {
      setPersent1(round((+range[0] * 100) / maxValue, 0));
      setPersent2(round((+range[1] * 100) / maxValue, 0));
    } else {
      if (range && +range[0] === maxValue) {
        setPersent1(100);
        setPersent2(100);
      } else {
        setPersent1(0);
        setPersent2((minValue * 100) / maxValue);
      }
    }

    setActiveEl(code);
  };

  function round(value: number, step: number) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
  }

  // TODO fixbug type any
  const convertPercenttoValue = (percent: number) => {
    let maxValue = +props.content[props.content.length - 1].value.match(/\d+/)[0] || 0;
    let minValue = +props.content[0].value.match(/\d+/)[0] || 0;
    //rounding with step is 0.5
    return props.title === 'prices'
      ? round((maxValue * percent) / 100, 0.5)
      : props.title === 'areas'
      ? round((maxValue * percent) / 100, 0.5)
      : 0;
  };
  const handleSubmit = () => {};
  useEffect(() => {
    const activedTrackEl = document.getElementById('track-active');
    // switch to
    if (activedTrackEl) {
      // If the value of "persent2" is less than or equal to "persent1"
      if (persent2 <= persent1) {
        // Set the DOM element to the left with a distance equal to the value of "persent2"
        // and to the right with a distance equal to "100 - persent1"
        activedTrackEl.style.left = `${persent2}%`;
        activedTrackEl.style.right = `${100 - persent1}%`;
      } else {
        // Set the DOM element to the left with a distance equal to the value of "persent1"
        // and to the right with a distance equal to "100 - persent2"
        activedTrackEl.style.left = `${persent1}%`;
        activedTrackEl.style.right = `${100 - persent2}%`;
      }
    }
  }, [persent1, persent2]);

  return (
    <div
      onClick={() => {
        props.setIsShowModal(false);
      }}
      className="fixed top-0 right-0 bottom-0 left-0 bg-overlay-70 z-30 flex justify-around items-center "
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
          props.setIsShowModal(true);
        }}
        className="w-1/3 bg-white rounded-md "
      >
        <div className="h-[45px] flex items-center px-4 border-b border-gray-100 ">
          <span
            className="hover:text-red-600 cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              props.setIsShowModal(false);
            }}
          >
            <GrLinkPrevious size={24} />
          </span>
          <span className="font-medium text-lg text-center m-auto">{props.name}</span>
        </div>
        {(props.title === 'prices' || props.title === 'areas') && (
          <>
            <div className="p-12 py-20 ">
              <div className="flex flex-col items-center justify-center relative">
                <div className="z-30 absolute top-[-48px] font-bold text-xl text-orange-600  w-full text-center">
                  {persent1 === 100 && persent2 === 100
                    ? `Trên ${convertPercenttoValue(persent1)} ${
                        props.title === 'prices' ? 'triệu' : 'm2'
                      } +`
                    : `Từ ${
                        persent1 <= persent2
                          ? convertPercenttoValue(persent1)
                          : convertPercenttoValue(persent2)
                      } - ${
                        persent2 >= persent1
                          ? convertPercenttoValue(persent2)
                          : convertPercenttoValue(persent1)
                      } ${props.title === 'prices' ? 'triệu' : 'm2'}`}
                  <div className="flex items-center justify-center w-full flex-col relative mt-10">
                    <div
                      id="track"
                      className="slider-track h-[5px] absolute top-0 bottom-0 bg-gray-300 rounded-full w-full"
                      onClick={(event) => handleChangeRange(event)}
                    ></div>
                    <div
                      id="track-active"
                      className="slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-600 rounded-full"
                      onClick={(event) => handleChangeRange(event)}
                    ></div>
                    <input
                      type="range"
                      max="100"
                      min="0"
                      step="1"
                      className="w-full appearance-none pointer-events-none  absolute top-0 bottom-0"
                      value={persent1}
                      onChange={(event) => {
                        setActiveEl('');
                        setPersent1(+event.target.value);
                      }}
                    />{' '}
                    <input
                      type="range"
                      max="100"
                      min="0"
                      step="1"
                      className="w-full  appearance-none  pointer-events-none absolute top-0 bottom-0 "
                      value={persent2}
                      onChange={(event) => {
                        setActiveEl('');
                        setPersent2(+event.target.value);
                      }}
                    />
                    <div className="absolute flex top-6 left-0 right-0 justify-between items-center">
                      {props.title === 'prices' && (
                        <>
                          <span className="cursor-pointer" onClick={() => setPersent1(0)}>
                            0 Triệu
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() => setPersent2(100)}
                          >
                            15 Triệu +
                          </span>
                        </>
                      )}{' '}
                      {props.title === 'areas' && (
                        <>
                          <span className="cursor-pointer" onClick={() => setPersent1(0)}>
                            0m2
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() => setPersent2(100)}
                          >
                            90+ m2
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg font-medium pl-5 pb-5">Chọn nhanh</p>
            <div className="flex gap-3 w-full flex-wrap items-center px-4">
              {' '}
              {props.content.map((item: any) => {
                return (
                  <button
                    key={item.code}
                    className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${
                      item.code === activeEl ? '!bg-blue-600 text-white' : ''
                    }`}
                    onClick={() => handleButtonRange(item.code, item.value)}
                  >
                    {item.value}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="w-full bg-orange-400 py-2 font-medium rounded-bl-md rounded-br-md mt-6"
              onClick={() => handleSubmit()}
            >
              Áp dụng
            </button>
          </>
        )}
        {(props.title === 'categories' || props.title === 'provinces') && (
          <div className="p-4 flex flex-col">
            {props.content?.map((item: any) => {
              return (
                <span
                  key={props.content.code}
                  className="py-2 flex gap-2 items-center border-b border-gray-200"
                >
                  <input
                    type="radio"
                    name={props.title}
                    id={item.code}
                    value={item.value}
                  />
                  <label
                    htmlFor={item.code}
                    className="font-medium text-lg hover:text-blue-600"
                  >
                    {item.value}
                  </label>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
