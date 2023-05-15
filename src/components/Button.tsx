import React, { memo } from 'react';
import { IButtonProps } from '../interface';

const Button = ({
  text,
  textColor,
  bgColor,
  IcAfter,
  IcBefore,
  onClick,
  fullWidth,
  size,
}: IButtonProps) => {
  return (
    <button
      type="button"
      className={`py-2 px-4 ${textColor} ${bgColor} ${size} ${fullWidth && 'w-full'}
      } outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      {IcBefore != null && <IcBefore />}
      {text}
      {IcAfter != null && <IcAfter />}
    </button>
  );
};

export default memo(Button);
