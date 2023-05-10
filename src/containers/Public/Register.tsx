import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, InputForm } from '../../components';
import path from '../../ultils/constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { useNavigate } from 'react-router';
import { IUser } from '../../interface';
import { AuthAction, RootState } from '../../store/interface';
import Swal from 'sweetalert2';
import actionType from '../../store/actions/actionType';

const Register = () => {
  const [registerForm, setRegisterForm] = useState<IUser>({
    name: '',
    phone: '',
    password: '',
  });
  const [invalidFields, setInvalidFields] = useState<Array<Object>>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (loginForm: IUser) => {
    setInvalidFields([]);
    let invalid = 0;
    let fields = Object.entries(loginForm);

    fields.slice(0).forEach((field) => {
      switch (field[0]) {
        case 'name':
          if (field[1] === '') {
            setInvalidFields((previous) => [
              ...previous,
              {
                name: field[0],
                message: 'Bạn không được bỏ trống trường này!',
              },
            ]);
            invalid++;
          }
          break;
        case 'password':
          if (field[1].length < 6) {
            setInvalidFields((previous) => [
              ...previous,
              {
                name: field[0],
                message: 'Mật khẩu phải có tối thiểu 6 kí tự!',
              },
            ]);
            invalid++;
          }
          break;
        case 'phone':
          if (!+field[1]) {
            setInvalidFields((previous) => [
              ...previous,
              {
                name: field[0],
                message: 'Số điện thoại không hợp lệ!',
              },
            ]);
            invalid++;
          }
          break;
      }
    });

    return invalid;
  };
  const handleClickButton = async () => {
    try {
      let invalids = validate(registerForm);
      console.log(invalids);
      if (invalids === 0) {
        const registerResult = await dispatch(
          actions.register(registerForm) as unknown as AuthAction,
        );
        if (registerResult.type === actionType.REGISTER_SUCCESS) {
          navigate('/login');
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully',
          });
        } else {
          await Swal.fire(
            'Error!',
            'Có lỗi khi đăng ký tài khoản, có thể do tài khoản đã tồn tại hoặc do vấn đề về mạng!',
            'error',
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white w-[600px] max-w-600 p-[30px] pb-[100px] rounded-md shadow-sm">
      <h3 className="mb-3 text-2xl font-semibold">Đăng Ký Tài Khoản</h3>
      <div className="flex flex-col w-full gap-5">
        <InputForm
          label={'Họ tên'}
          typeInput={'text'}
          type={'name'}
          value={registerForm.name}
          setValue={setRegisterForm}
          invalidFields={invalidFields}
        />
        <InputForm
          label={'Số Điện Thoại'}
          typeInput={'number'}
          type={'phone'}
          value={registerForm.phone}
          setValue={setRegisterForm}
          invalidFields={invalidFields}
        />
        <InputForm
          label={'Tạo Mật Khẩu'}
          typeInput={'password'}
          type={'password'}
          value={registerForm.password}
          setValue={setRegisterForm}
          invalidFields={invalidFields}
        />
        <Button
          text="Tạo Tài Khoản"
          textColor="text-white"
          bgColor="!bg-secondary1"
          fullWidth
          onClick={handleClickButton}
        />
      </div>
      <div className="flex flex-col mt-7">
        <small className=" hover:text-[red] cursor-pointer">
          Bấm vào nút đăng ký tức là bạn đã đồng ý với quy định sử dụng của chúng tôi
        </small>
        <small className="flex hover:text-[red] cursor-pointer mt-5">
          Bạn đã có tài khoản ?{' '}
          <NavLink to={'/' + path.LOGIN}>
            <p className="text-[blue] ml-1"> Đăng nhập ngay</p>
          </NavLink>
        </small>
      </div>
    </div>
  );
};
export default Register;
