import icons from './icons';
import { AiOutlineLogout } from 'react-icons/ai';

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin } = icons;

const menuManage = [
  {
    id: 1,
    text: 'Đăng tin cho thuê',
    path: '/he-thong/tao-moi-bai-dang',
    icon: <ImPencil2 />,
  },
  {
    id: 2,
    text: 'Quản lý tin đăng',
    path: '/he-thong/quan-ly-bai-dang',
    icon: <MdOutlineLibraryBooks />,
  },
  {
    id: 3,
    text: 'Thông tin tài khoản',
    path: '/he-thong/sua-thong-tin-ca-nhan',
    icon: <BiUserPin />,
  },
];

export default menuManage;
