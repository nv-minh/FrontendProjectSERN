import { memo } from 'react';

interface props {
  label: string;
  options: IOptions[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface IOptions {
  province_id?: string;
  province_name?: string;
  district_id?: string;
  district_name?: string;
  ward_name?: string;
  ward_id?: string;
}

const SelectAddress = ({ label, options, value, setValue }: props) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label htmlFor="" className="font-medium">
        {label}
      </label>
      <select
        id="select-address"
        className="outline-none border border-gray-300 p-2 w-full rounded-md"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      >
        <option>{`--Chọn ${label}`}</option>
        {options &&
          options?.length > 0 &&
          options?.map((item) => {
            return (
              <option
                value={
                  label === 'Tỉnh/Thành phố'
                    ? item?.province_id
                    : label === 'Quận/Huyện'
                    ? item?.district_id
                    : item?.ward_id
                }
                key={
                  label === 'Tỉnh/Thành phố'
                    ? item?.province_id
                    : label === 'Quận/Huyện'
                    ? item?.district_id
                    : item?.ward_id
                }
              >
                {label === 'Tỉnh/Thành phố'
                  ? item?.province_id
                  : label === 'Quận/Huyện'
                  ? item?.district_id
                  : item?.ward_id}
              </option>
            );
          })}
      </select>
    </div>
  );
};
export default memo(SelectAddress);
