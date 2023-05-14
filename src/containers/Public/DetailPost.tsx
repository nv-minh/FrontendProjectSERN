import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PostsAction, RootState } from '../../store/interface';
import { useEffect, useState } from 'react';
import { Loading, SliderCustom } from '../../components';
import * as actions from '../../store/actions';
import icons from '../../ultils/icons';

const DetailPost = () => {
  const path = useLocation();
  const postId = path?.pathname.split('/')[path?.pathname.split('/').length - 1];
  const { posts, newsPost } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const [postDetail, setPostDetail] = useState<any>();
  const { HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch, BsHash } = icons;
  const matchedPost =
    posts?.find((post: any) => post.id === postId) ||
    newsPost?.find((newsPost: any) => newsPost.id === postId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(
          actions.getPostsLimit(1, {}) as unknown as PostsAction,
        );
        const data = result?.data.rows;
        if (matchedPost) {
          setPostDetail(matchedPost);
        } else if (data.length > 0) {
          setPostDetail(data[0]);
        }
      } catch (error) {
        console.error(error);
        // hiển thị thông báo lỗi cho người dùng
      }
    };

    if (!postDetail && matchedPost) {
      fetchData();
    }
  }, [postDetail, matchedPost]);
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
                {postDetail?.overviews.area}
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
              {postDetail.description &&
                JSON.parse(postDetail.description)?.map((item: any, index: any) => {
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
          </div>
        </div>
        <div className="w-[30%] flex bg-white rounded-md shadow-md">content</div>
      </div>
    </div>
  );
};

export default DetailPost;
