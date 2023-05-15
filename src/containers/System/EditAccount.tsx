import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentUserAction, RootState } from '../../store/interface';
import anonAvatar from '../../assets/anon-avatar.png';
import download from '../../assets/download.png';
import { Button } from '../../components';
import { apiUpdateUser } from '../../services/user';
import Swal from 'sweetalert2';
import { blodToBase64, toBase64 } from '../../ultils/Common/toBase64';
import * as actions from '../../store/actions';

const EditAccount = () => {
  const { currentData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getCurrent() as unknown as CurrentUserAction);
  }, [currentData]);

  const [payload, setPayload] = useState({
    id: currentData?.id || '',
    phone: currentData?.phone || '',
    name: currentData?.name || '',
    zalo: currentData?.zalo || '',
    fbUrl: currentData?.fbUrl || '',
    avatar: '',
  });
  const [errorValidate, setErrorValidate] = useState({
    errorPhoneNumber: false,
    errorName: false,
    errorZalo: false,
    errorUrlFb: false,
  });
  const regexPhoneNumber = /^(\+84|0)\d{9,10}$/;
  const regexUrlFacebook = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/;
  const regexCheckBase64 =
    /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // covert to base64 save in db
    const imageBase64 = await toBase64(event.target.files && event.target.files[0]);
    setPayload((prev: any) => ({ ...prev, avatar: imageBase64 }));

    // save with cloud
    // let image = (event?.target?.files && event?.target?.files[0]) || '';
    // let formData = new FormData();
    // formData.append('file', image);
    // formData.append('upload_preset', 'qvqmwmjg');
    // const response = await apiUploadImages(formData);
    // if (response.status === 200) {
    //   setPayload((prev) => ({ ...prev, avatar: response?.data.secure_url }));
    // }
  };

  const handleSubmit = async () => {
    setErrorValidate((prev) => ({
      ...prev,
      errorPhoneNumber: !regexPhoneNumber.test(payload.phone),
      errorZalo: !regexPhoneNumber.test(payload.zalo),
      errorName: !payload.name,
      errorUrlFb: !regexUrlFacebook.test(payload.fbUrl),
    }));
    if (
      !errorValidate.errorPhoneNumber &&
      !errorValidate.errorName &&
      !errorValidate.errorZalo &&
      !errorValidate.errorUrlFb
    ) {
      const response = await apiUpdateUser(payload);
      console.log(response);
      if (response?.data.success) {
        await Swal.fire(
          'Bạn đã sửa tin thành công!',
          'Chúc mừng bạn đã sửa tin thành công!',
          'success',
        );
      }
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="flex gap-4">
        <div className="flex flex-col gap-5 pt-10 w-3/5">
          <div className="flex flex-row justify-center items-center gap-[100px]">
            <label className="block font-medium mb-2 text-gray-700 w-[150px]">
              Mã Thành Viên
            </label>
            <input
              type="text"
              readOnly
              className="border border-gray-200 rounded-md bg-gray-100 p-2 w-[60%] outline-none"
              value={payload.id}
            />
          </div>
          <div className="flex flex-row justify-center items-center gap-[100px]">
            <label
              htmlFor="filter"
              className="block font-medium mb-2 text-gray-700 w-[150px]"
            >
              Số Điện Thoại
            </label>
            <div className="w-[60%]">
              <input
                type="text"
                className="border border-gray-200 rounded-md p-2 outline-none w-full"
                value={payload.phone}
                onChange={(event) => {
                  setPayload((prev) => ({ ...prev, ['phone']: event.target.value }));
                }}
              />

              {errorValidate.errorPhoneNumber && (
                <p className="italic text-red-500">Số điện thoại không hợp lệ!</p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-[100px]">
            <label
              htmlFor="filter"
              className="block font-medium mb-2 text-gray-700 w-[150px]"
            >
              Tên hiển thị
            </label>
            <div className="w-[60%]">
              <input
                type="text"
                className="border border-gray-200 rounded-md  p-2 outline-none w-full"
                value={payload.name}
                onChange={(event) => {
                  setPayload((prev) => ({ ...prev, ['name']: event.target.value }));
                }}
              />
              {errorValidate.errorName && (
                <p className="italic text-red-500">Tên không được để trống!</p>
              )}
            </div>
          </div>

          <div className="flex flex-row justify-center items-center gap-[100px]">
            <label
              htmlFor="filter"
              className="block font-medium mb-2 text-gray-700 w-[150px]"
            >
              Số Zalo
            </label>
            <div className="w-[60%]">
              <input
                type="text"
                className="border border-gray-200 rounded-md  p-2 outline-none w-full"
                value={payload.zalo}
                onChange={(event) => {
                  setPayload((prev) => ({ ...prev, ['zalo']: event.target.value }));
                }}
              />
              {errorValidate.errorZalo && (
                <p className="italic text-red-500">Số điện thoại không hợp lệ!</p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-[100px]">
            <label
              htmlFor="filter"
              className="block font-medium mb-2 text-gray-700 w-[150px]"
            >
              FaceBook
            </label>
            <div className="w-[60%]">
              <input
                type="text"
                className="border border-gray-200 rounded-md p-2 outline-none w-full"
                value={payload.fbUrl}
                onChange={(event) => {
                  setPayload((prev) => ({ ...prev, ['fbUrl']: event.target.value }));
                }}
              />
              {errorValidate.errorUrlFb && (
                <p className="italic text-red-500">Đường dẫn facebook không hợp lệ!</p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-[100px]">
            <label
              htmlFor="password"
              className="block font-medium mb-2 text-gray-700 w-[150px]"
            >
              Mật khẩu
            </label>
            <small className="text-xl text-blue-500 cursor-pointer w-[60%]">
              Đổi mật khẩu
            </small>
          </div>
          <div className="flex flex-row justify-center items-center gap-[100px]">
            <label
              htmlFor="avatar"
              className="block font-medium mb-2 text-gray-700 w-[150px]"
            >
              Ảnh Đại Diện
            </label>
            <div className=" w-[60%]">
              <img
                src={
                  payload.avatar
                    ? payload.avatar
                    : (currentData &&
                        currentData.avatar &&
                        blodToBase64(currentData.avatar)) ||
                      anonAvatar
                }
                alt="avatar"
                className="object-cover rounded-full  border-2 shadow-md border-white"
              />
              <input
                type="file"
                id="avatar"
                className="appearance-none my-4"
                onChange={(event) => handleUploadFile(event)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-[100px] ml-[292px] mb-6">
            <Button
              text="Cập nhật"
              bgColor="bg-blue-600 w-full mb-6"
              textColor="text-white"
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <img src={download} alt="" className="rounded-md flex-1" />
        </div>
      </div>
    </div>
  );
};
export default EditAccount;
