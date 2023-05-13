import { useDispatch, useSelector } from 'react-redux';
import { PostsAction, RootState } from '../../store/interface';
import React, { useEffect, useState } from 'react';
import * as actions from '../../store/actions';
import { Pagination } from '../Public';
import { useSearchParams } from 'react-router-dom';
import 'moment/locale/vi';
import moment from 'moment';
import { Button } from '../../components';
import { UpdatePost } from './index';

const ManagePost = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>([]);
  const { yourPosts } = useSelector((state: RootState) => state.posts);
  const [params] = useSearchParams();
  let queryPage = params.get('page') || '1';
  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin(+queryPage) as unknown as PostsAction);
  }, [queryPage]);
  const checkExpired = (date: string) => {
    const now = moment(); // Lấy thời gian hiện tại
    const targetDate = moment(date, 'dddd, HH:mm DD/MM/YYYY');
    return now.isBefore(targetDate);
  };
  const buttonEditPost = (postId: string) => {
    setIsEdit(true);
    setCurrentPost(yourPosts?.filter((item: any) => item.id === postId));
  };
  const handleEditPost = () => {};
  const buttonDeletePost = (idPost: string) => {
    // call api delete post with id
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <select className="outline-none border p-2 rounded-md  border-gray-200 ">
          <option>Lọc theo trạng thái</option>
        </select>
      </div>
      <table className=" w-full table-fixed">
        <thead>
          <tr className="py-2 bg-gray-100">
            <th className="border p-2">Mã tin</th>
            <th className="border p-2">Ảnh đại diện</th>
            <th className="border p-2">Tiêu đề</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Ngày bắt đầu</th>
            <th className="border p-2">Ngày hết hạn</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Tuỳ chọn</th>
          </tr>
        </thead>
        <tbody>
          {!yourPosts && (
            <tr>
              <td>123</td>
            </tr>
          )}
          {yourPosts &&
            yourPosts?.length > 0 &&
            yourPosts?.map((item: any) => {
              return (
                <tr className="py-2 bg-gray-100   h-full w-full " key={item.id}>
                  <td className="border p-2 text-center h-full ">
                    {item?.overviews.code}
                  </td>
                  <td className=" p-2 flex items-center  !h-full border-t">
                    <img
                      src={JSON.parse(item?.images?.image)[0] || ''}
                      alt="avatar-post"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="border p-2 text-center w-[200px]  h-full text-ellipsis whitespace-nowrap overflow-hidden">
                    {item?.title}
                  </td>
                  <td className="border p-2 text-center  h-full text-ellipsis whitespace-nowrap overflow-hidden">
                    {item?.attributes?.price}
                  </td>
                  <td className="border p-2 text-center  h-full text-ellipsis whitespace-nowrap overflow-hidden">
                    {item?.overviews?.created}
                  </td>
                  <td className="border p-2 text-center  h-full text-ellipsis whitespace-nowrap overflow-hidden">
                    {item?.overviews?.expired}
                  </td>
                  <td className="border p-2 text-center  h-full text-ellipsis whitespace-nowrap overflow-hidden">
                    {checkExpired(item?.overviews?.expired)
                      ? 'Đang hoạt động'
                      : 'Tin đã hết hạn'}
                  </td>
                  <td className="border-b p-2 text-center flex justify-center gap-3">
                    <Button
                      text="Sửa"
                      bgColor="bg-green-600"
                      textColor="text-white"
                      onClick={() => buttonEditPost(item?.id)}
                    />
                    <Button
                      text="Xoá"
                      bgColor="bg-orange-600"
                      textColor="text-white"
                      onClick={() => buttonDeletePost(item?.id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="mt-5 mb-12 mr-56">
        <Pagination itemsNumber={yourPosts?.length} queryPage={queryPage} />
      </div>
      {isEdit && (
        <UpdatePost
          currentPost={currentPost}
          handleEditPost={handleEditPost}
          setIsEdit={setIsEdit}
          setCurrentPost={setCurrentPost}
        />
      )}
    </div>
  );
};
export default ManagePost;
