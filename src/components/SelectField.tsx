import { memo } from 'react';

interface props {
  label: string;
  options: any;
  value: string;
  setValue: any;
  name?: string;
}

export interface IOptions {
  province_id?: string;
  province_name?: string;
  district_id?: string;
  district_name?: string;
  ward_name?: string;
  ward_id?: string;
}

const SelectField = ({ label, options, setValue, name, value }: props) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label htmlFor="select-address" className="font-medium">
        {label}
      </label>
      <select
        id="select-address"
        className="outline-none border border-gray-300 p-2 w-full rounded-md"
        value={value}
        onChange={(e) => {
          name
            ? setValue((prev: any) => ({
                ...prev,
                [name]: e.target.value,
              }))
            : setValue(e.target.value);
        }}
      >
        <option>{`--Chọn ${label}`}</option>
        {options &&
          options?.length > 0 &&
          options?.map((item: any) => {
            return (
              <option
                value={
                  label === 'Tỉnh/Thành phố'
                    ? item?.province_id
                    : label === 'Quận/Huyện'
                    ? item?.district_id
                    : label === 'Phường/Xã'
                    ? item?.ward_id
                    : item?.code
                }
                key={
                  label === 'Tỉnh/Thành phố'
                    ? item?.province_id
                    : label === 'Quận/Huyện'
                    ? item?.district_id
                    : label === 'Phường/Xã'
                    ? item?.ward_id
                    : item?.code
                }
              >
                {label === 'Tỉnh/Thành phố'
                  ? item?.province_name
                  : label === 'Quận/Huyện'
                  ? item?.district_name
                  : label === 'Phường/Xã'
                  ? item?.ward_name
                  : item?.value}
              </option>
            );
          })}
      </select>
    </div>
  );
};
export default memo(SelectField);
