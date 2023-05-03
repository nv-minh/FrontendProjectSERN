const path = {
  HOME: '/*',
  HOME__PAGE: ':page',
  LOGIN: 'login',
  REGISTER: 'register',
  CHO_THUE_CAN_HO: 'cho-thue-can-ho',
  CHO_THUE_MAT_BANG: 'cho-thue-mat-bang',
  CHO_THUE_PHONG_TRO: 'cho-thue-phong-tro',
  NHA_CHO_THUE: 'nha-cho-thue',
  DETAIL_POST_TITLE_POSTID: 'chi-tiet/:title/:postId',
};

export const text = {
  HOME_TITLE: 'Kênh thông tin Phòng Trọ số 1 Việt Nam',
  HOME_DESCRIPTION:
    'Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.',
};

export const location = [
  {
    name: 'Phòng Trọ Hồ Chí Minh',
    image: 'https://phongtro123.com/images/location_hcm.jpg',
    id: 'hcm',
  },
  {
    name: 'Phòng Trọ Hà Nội',
    image: 'https://phongtro123.com/images/location_hn.jpg',
    id: 'hn',
  },
  {
    name: 'Phòng Trọ Đà Nẵng',
    image: 'https://phongtro123.com/images/location_dn.jpg',
    id: 'dn',
  },
];
export default path;