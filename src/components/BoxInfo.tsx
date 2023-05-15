import anonAvatar from '../assets/anon-avatar.png';
import { blodToBase64 } from '../ultils/Common/toBase64';
import { Button } from './index';
import icons from '../ultils/icons';

const { BsDot, BsTelephoneFill, TbMessages, RiHeartFill, AiFillFacebook } = icons;
const BoxInfo = ({ props: { name, phone, zalo, avatar, fbUrl } }: any) => {
  return (
    <div className="w-full bg-yellow-500 rounded-md flex flex-col items-center p-4">
      <img
        src={(avatar && blodToBase64(avatar)) || anonAvatar}
        className="w-16 h-16 object-contain rounded-full"
        alt="avatar"
      />
      <h3 className="font-medium text-xl">{name}</h3>
      <span className="flex items-center">
        <BsDot color="green" size={28} />
        <span>Đang hoạt động</span>
      </span>
      <div className="flex flex-col gap-3 w-full">
        <Button
          text={phone}
          bgColor="bg-[#13BB7B]"
          fullWidth
          textColor="text-white font-bold text-lg"
          IcBefore={BsTelephoneFill}
          onClick={() => {
            window.open(`https://zalo.me/${phone}`, '_blank');
          }}
        />{' '}
        <Button
          text={'Nhắn zalo'}
          bgColor="bg-white"
          fullWidth
          textColor="text-black font-medium text-lg"
          IcBefore={TbMessages}
          onClick={() => {
            window.open(`https://zalo.me/${phone}`, '_blank');
          }}
        />{' '}
        <Button
          text={'Yêu thích'}
          bgColor="bg-white"
          fullWidth
          textColor="text-black font-medium text-lg"
          IcBefore={RiHeartFill}
        />{' '}
        {fbUrl && (
          <Button
            text={'Địa chỉ Facebook'}
            bgColor="bg-white"
            fullWidth
            textColor="text-black font-medium text-lg"
            IcBefore={AiFillFacebook}
            onClick={() => {
              window.open(fbUrl, '_blank');
            }}
          />
        )}
      </div>
    </div>
  );
};
export default BoxInfo;
