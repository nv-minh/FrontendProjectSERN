import { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, InputForm } from '../../components';

const ContactMe = () => {
  const [payload, setPayload] = useState({
    name: '',
    phone: '',
    content: '',
  });
  const handleSubmit = () => {
    Swal.fire('Thanks!', 'Phản hồi của bạn đã được chúng tôi ghi nhận!', 'success').then(
      () => {
        setPayload({
          name: '',
          phone: '',
          content: '',
        });
      },
    );
  };

  return (
    <div className="w-[70%] h-full">
      <h1 className="text-2xl font-semibold mb-6 text-center">Liên hệ với chúng tôi</h1>
      <div className="flex gap-4 justify-center ">
        <div className="flex-1 flex flex-col gap-4 h-fit bg-red-400 rounded-3xl p-4 text-white bg-gradient-to-br from-blue-700 to accent-cyan-400">
          <h4 className="font-medium">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa trọn bet88
            nhà cái đến từ Châu Á{' '}
          </span>
          <span>Điện thoại: 012301293021</span>
          <span>Email: cskh.bet88@gmail.com</span>
          <span>Zalo: 09301293021</span>
          <span>Viber: 0-39120-3912</span>
          <span>Địa chỉ thôn trung, xã Việt Hùng, huyện Đông Anh, Hà Nội</span>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-md p-4 mb-6 ">
          <h4 className="font-medium text-lg mb-4">Liên hệ trực tuyến</h4>
          <div className="flex flex-col gap-6">
            <InputForm
              label="HỌ VÀ TÊN CỦA BẠN"
              value={payload.name}
              setValue={setPayload}
              type="name"
            />
            <InputForm
              label="SỐ ĐIỆN THOẠI"
              value={payload.phone}
              setValue={setPayload}
              type="phone"
            />
          </div>
          <div>
            <label htmlFor="desc">NỘI DUNG MÔ TẢ</label>
            <textarea
              name="content"
              id="desc"
              cols={30}
              rows={3}
              value={payload.content}
              className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
              onChange={(event) =>
                setPayload((prev) => ({ ...prev, content: event.target.value }))
              }
            ></textarea>
          </div>
          <Button
            text="Gửi liên hệ"
            bgColor="bg-blue-500"
            textColor="text-white"
            fullWidth
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};
export default ContactMe;
