import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/interface';
import { useEffect, useState } from 'react';
import { BoxInfo, Loading, Map, RelatedPost, SliderCustom } from '../../components';
import icons from '../../ultils/icons';
import { contentMap } from '../../ultils/constant';
import { FiFlag } from 'react-icons/fi';
import download from '../../assets/download.png';

const DetailPost = () => {
  const path = useLocation();
  const postId = path?.pathname.split('/')[path?.pathname.split('/').length - 1];
  const [latLng, setLatLng] = useState<any>({ lat: 21.12453, lng: 105.82714 });
  const location = useLocation();
  const [postDetail, setPostDetail] = useState<any>();
  const { HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch, BsHash } = icons;
  const { posts, newsPost } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
      setLatLng({
        lat: latitude,
        lng: longitude,
      });
    });
    const matchedPost =
      posts?.find((post: any) => post.id === postId) ||
      newsPost?.find((newsPost: any) => newsPost.id === postId);
    console.log('123');
    const fetchData = async () => {
      try {
        if (matchedPost) {
          setPostDetail(matchedPost);
          console.log(matchedPost);
          console.log(postDetail);
        }
      } catch (error) {
        console.error(error);
        // hiển thị thông báo lỗi cho người dùng
      }
    };

    if (matchedPost) {
      fetchData();
    }
  }, [postDetail, location.pathname]);
  // If there is a match, update the postDetail state
  if (!postDetail) return <Loading />;
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="w-[70%] flex justify-start    rounded-md shadow-md  gap-4 ">
        <div className="w-[70%] flex justify-start bg-white flex-col  ">
          <SliderCustom
            images={
              postDetail && postDetail.images && JSON.parse(postDetail.images.image)
            }
          />
          <div className="flex flex-col gap-2 w-full ml-5">
            <h2 className="text-xl font-bold text-red-600 my-2">{postDetail?.title}</h2>
            <div className="flex items-center gap-2">
              <span>Chuyên mục: </span>
              <span className="text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer">
                {postDetail?.overviews && postDetail?.overviews.area}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <HiLocationMarker color="#2563eb" />
              <span>{postDetail?.address}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 ">
                <TbReportMoney />
                <span className="font-semibold text-lg text-green-600">
                  {postDetail?.attributes.price}
                </span>
              </span>
              <span className="flex items-center  gap-2  ">
                <RiCrop2Line />
                <span>{postDetail?.attributes.acreage}</span>
              </span>
              <span className="flex items-center  gap-2 ">
                <BsStopwatch />
                {postDetail?.attributes.published}
              </span>
              <span className="flex items-center  gap-2 ">
                <BsHash />
                <span>{postDetail?.attributes.hashtag}</span>
              </span>
            </div>
          </div>
          <div className="w-full pl-5">
            <h3 className="font-semibold text-lg mt-4 my-4">Thông tin mô tả</h3>
            <div className="flex flex-col justify-center gap-1">
              {postDetail &&
                postDetail.description &&
                Array.isArray(JSON.parse(postDetail.description)) &&
                JSON.parse(postDetail.description).map((item: any, index: any) => {
                  return <span key={index}>{item}</span>;
                })}
            </div>
          </div>
          <div className="w-full mt-8 pl-5">
            <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
            <table className="w-full">
              <tbody>
                <tr className="w-full bg-gray-200">
                  <td className="p-4">Mã tin</td>
                  <td className="p-4">{postDetail.overviews.code}</td>
                </tr>
                <tr className="w-full ">
                  <td className="p-4">Khu vực</td>
                  <td className="p-4">{postDetail.overviews.area}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-4">Loại tin rao</td>
                  <td className="p-4">{postDetail.overviews.type}</td>
                </tr>
                <tr className="w-full ">
                  <td className="p-4">Đối tượng</td>
                  <td className="p-4">{postDetail.overviews.target}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-4">Gói tin</td>
                  <td className="p-4">{postDetail.overviews.bonus}</td>
                </tr>
                <tr className="w-full ">
                  <td className="p-4">Ngày đăng</td>
                  <td className="p-4">{postDetail.overviews.created}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-4">Ngày hết hạn</td>
                  <td className="p-4">{postDetail.overviews.expired}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full mt-8 pl-5 ">
            <h3 className="font-semibold text-xl my-4">Thông tin liên hệ</h3>
            <table className="w-full">
              <tbody>
                <tr className="w-full bg-gray-200">
                  <td className="p-4">Liên hệ</td>
                  <td className="p-4">{postDetail.user.name}</td>
                </tr>
                <tr className="w-full ">
                  <td className="p-4">Điện thoại</td>
                  <td className="p-4">{postDetail.user.phone}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-4">Zalo</td>
                  <td className="p-4">{postDetail.user.zalo}</td>
                </tr>
              </tbody>
            </table>
            <div className="h-[50px]"></div>
            <div className="h-[400px] w-full">
              <Map latLng={latLng} />
            </div>
            <p className="pt-4 text-gray-500 italic px-2">{contentMap}</p>
            <div
              className="flex border border-blue-600 items-center w-[130px] h-[50px] justify-around rounded-md mt-4 py-2 cursor-pointer"
              onClick={() => {
                window.location.href = '/lien-he';
              }}
            >
              <FiFlag color="blue" />
              <p className="text-blue-700 hover:underline font-medium">Gửi phản hồi</p>
            </div>
            <div className="h-[50px]"></div>
          </div>
        </div>
        <div className="w-[30%] flex bg-white rounded-md shadow-md">
          <div className="w-full flex flex-col">
            <BoxInfo props={postDetail.user} />
            <RelatedPost />
            <img src={download} alt="" />
            <img src={download} alt="" />
            <img src={download} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
