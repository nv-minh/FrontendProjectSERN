import { useDispatch, useSelector } from 'react-redux';
import { PostsAction, RootState } from '../../store/interface';
import React, { useEffect, useState } from 'react';
import * as actions from '../../store/actions';
import 'moment/locale/vi';
import moment from 'moment';
import { Button } from '../../components';
import { UpdatePost } from './index';
import { apiDeletePost } from '../../services';
import Swal from 'sweetalert2';

const ManagePost = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>([]);
  const [filterType, setFilterType] = useState('all');
  const { yourPosts } = useSelector((state: RootState) => state.posts);
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin(1) as unknown as PostsAction);
    setPosts(yourPosts);
  }, [posts, isEdit]);

  const checkExpired = (date: string) => {
    const now = moment(); // Lấy thời gian hiện tại
    const targetDate = moment(date, 'dddd, HH:mm DD/MM/YYYY');
    return now.isBefore(targetDate);
  };
  const buttonEditPost = (postId: string) => {
    setIsEdit(true);
    setCurrentPost(yourPosts?.filter((item: any) => item.id === postId));
  };

  const buttonDeletePost = async (postId: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Bạn chắc chứ ?',
        text: 'Bạn có chắc là muốn xoá bài đăng này chứ ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await apiDeletePost(postId);
          setPosts(yourPosts?.filter((item: any) => item.id !== postId));
          await swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          await swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error',
          );
        }
      });
  };
  const filterPostActivity = () => {
    setPosts(yourPosts?.filter((item: any) => checkExpired(item?.overviews?.expired)));
    setFilterType('active');
  };
  const filterPostExpired = () => {
    setPosts(yourPosts?.filter((item: any) => !checkExpired(item?.overviews?.expired)));
    setFilterType('expired');
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <label htmlFor="filter" className="block font-medium mb-2 text-gray-700">
          Filter by:
        </label>
        <select
          id="filter"
          name="filter"
          className="block  px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          value={filterType}
          onChange={(event) => {
            setFilterType(event.target.value);
            if (event.target.value === 'expired') {
              filterPostExpired();
            } else if (event.target.value === 'active') {
              filterPostActivity();
            } else {
              setPosts(yourPosts);
            }
          }}
          defaultValue="all"
        >
          <option value="all">Tất cả</option>
          <option value="expired">Tin hết hạn</option>
          <option value="active">Tin hoạt động</option>
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
              <td>Bạn chưa có bản tin nào bạn có thể ấn vào đây để tạo tin mới</td>
            </tr>
          )}
          {posts &&
            posts?.length > 0 &&
            posts?.map((item: any) => {
              return (
                <tr className="py-2 bg-gray-100   h-full w-full " key={item.id}>
                  <td className="border p-2 text-center h-full ">
                    {item?.overviews?.code}
                  </td>
                  <td className=" p-2 flex items-center justify-center !h-full border-t">
                    <img
                      src={(item?.images && JSON.parse(item?.images?.image)[0]) || ''}
                      alt="avatar-post"
                      className="w-10 h-10 object-cover rounded-md "
                    />
                  </td>
                  <td className="border p-2 text-center w-[200px]  h-full text-ellipsis whitespace-nowrap overflow-hidden">
                    {item?.title}
                  </td>
                  <td className="border p-2 text-center  h-full text-ellipsis whitespace-nowrap overflow-hidden">
                    {item?.attributes?.price}
                  </td>
                  <td className="border p-2 text-center  h-full text-ellipsis line-clamp-2">
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
      {isEdit && (
        <UpdatePost
          currentPost={currentPost}
          setIsEdit={setIsEdit}
          setCurrentPost={setCurrentPost}
        />
      )}
    </div>
  );
};
export default ManagePost;
