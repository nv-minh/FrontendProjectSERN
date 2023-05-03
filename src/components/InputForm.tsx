import React, { memo, ChangeEvent } from 'react';
import { IInputFormProps } from '../interface';

const InputForm = ({
  label,
  typeInput,
  value,
  setValue,
  type,
  invalidFields,
}: IInputFormProps) => (
  <div>
    <label htmlFor="phone" className="text-xs">
      {label}
    </label>
    <input
      type={typeInput}
      id="phone"
      className="outline-none bg-[#e8f0fe] p-2 rounded-md  w-full h-full"
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setValue((prev) => ({
          ...prev,
          [type]: event.target.value,
        }))
      }
    />

    {invalidFields.length > 0 && invalidFields.some((field) => field.name === type) && (
      <small className="italic text-red-500">
        {invalidFields.find((field) => field?.name === type)?.message}
      </small>
    )}
  </div>
);

export default memo(InputForm);
