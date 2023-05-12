import { useEffect, useState } from 'react';
import {
  apiGetPublicDistricts,
  apiGetPublicProvinces,
  apiGetPublicWards,
} from '../services';
import { IOptions } from './SelectField';
import { payload } from '../containers/System/CreatePost';
import { SelectField } from './index';

const Address = ({ payload, setPayload }: payload) => {
  const [provinces, setProvinces] = useState<IOptions[]>([]);
  const [districts, setDistricts] = useState<IOptions[]>([]);
  const [wards, setWards] = useState<IOptions[]>([]);
  const [provinceCode, setProvinceCode] = useState<string>('');
  const [districtCode, setDistrictCode] = useState<string>('');
  const [wardCode, setWardCode] = useState<string>('');

  let districtName = districts?.filter(
    (item: IOptions) => item.district_id === districtCode,
  )[0]?.district_name;

  districtName = districtName !== undefined ? districtName : '';
  let wardName = wards?.filter((item: IOptions) => item.ward_id === wardCode)[0]
    ?.ward_name;

  wardName = wardName !== undefined ? wardName : '';
  let provinceName =
    provinceCode || ''
      ? provinces?.filter((item: IOptions) => item.province_id === provinceCode)[0]
          ?.province_name
      : '';
  let valueInputReadOnly = `${provinceName && '' + provinceName}
  ${districtName && ', ' + districtName} ${wardName && ' , ' + wardName}`;
  useEffect(() => {
    async function fetchData() {
      if (!provinceCode) {
        const response = await apiGetPublicProvinces();
        setProvinces(response?.data.results);
      } else {
        const responseDistrict = await apiGetPublicDistricts(provinceCode);
        setWardCode('');
        setDistricts(responseDistrict?.data.results);
      }
    }

    fetchData();
  }, [provinceCode]);

  useEffect(() => {
    async function fetchData() {
      if (districtCode) {
        const responseWard = await apiGetPublicWards(districtCode);
        setWards(responseWard?.data.results);
      }
    }

    fetchData();
  }, [districtCode]);
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      ['province']: provinceName,
      ['address']: valueInputReadOnly,
    }));
  }, [provinceName, valueInputReadOnly]);

  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <SelectField
            label={'Tỉnh/Thành phố'}
            options={provinces}
            value={provinceCode}
            setValue={setProvinceCode}
            key={(Math.random() + 1).toString(36).substring(7)}
          />
          <SelectField
            label={'Quận/Huyện'}
            value={districtCode}
            setValue={setDistrictCode}
            options={districts}
            key={(Math.random() + 1).toString(36).substring(7)}
          />
          <SelectField
            label={'Phường/Xã'}
            value={wardCode}
            setValue={setWardCode}
            options={wards}
            key={(Math.random() + 1).toString(36).substring(7)}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="exactly-address" className="font-medium">
            Địa chỉ chính xác
          </label>
          <input
            type="text"
            readOnly
            className="border border-gray-200 rounded-md bg-gray-100 p-2 w-full outline-none"
            value={valueInputReadOnly}
          />
        </div>
      </div>
    </div>
  );
};
export default Address;
