import { Address, Button, Loading, Map, Overview } from '../../components';
import { useEffect, useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import { PostsAction, RootState } from '../../store/interface';
import { useDispatch, useSelector } from 'react-redux';
import { apiCreatePost, apiEditPost, apiUploadImages } from '../../services';
import { ImBin } from 'react-icons/im';
import Swal from 'sweetalert2';
import * as actions from '../../store/actions';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { attention } from '../../ultils/constant';

export interface payload {
  payload: {
    categoryCode: string;
    title: string;
    priceNumber: number;
    areaNumber: number;
    images: any;
    address: string;
    priceCode: string;
    areaCode: string;
    description: string;
    target: string;
    province: string | undefined;
    postId?: string;
    attributesId?: string;
    imagesId?: string;
    overviewId?: string;
  };
  setPayload: React.Dispatch<
    React.SetStateAction<{
      categoryCode: string;
      title: string;
      priceNumber: number;
      areaNumber: number;
      images: any;
      address: any;
      priceCode: string;
      areaCode: string;
      description: string;
      target: string;
      postId?: string;
      province: any;
      attributesId?: string;
      imagesId?: string;
      overviewId?: string;
    }>
  >;
}

const PostEditor = ({ currentPost, setIsEdit, setCurrentPost }: any) => {
  const [payload, setPayload] = useState({
    categoryCode: '',
    title: '',
    priceNumber: 0,
    areaNumber: 0,
    images: [],
    address: '',
    priceCode: '',
    areaCode: '',
    description: '',
    target: '',
    province: '',
  });
  const [errorValidation, setErrorValidation] = useState({
    errorProvince: false,
    errorCategory: false,
    errorTitle: false,
    errorTarget: false,
    errorPrice: false,
    errorArea: false,
    errorDescription: false,
  });
  const [imagesPreview, setImagesPreview] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentData } = useSelector((state: RootState) => state.user);
  const { categories } = useSelector((state: RootState) => state.app);
  const [latLng, setLatLng] = useState<any>({ lat: 21.12453, lng: 105.82714 });

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
    //   setLatLng({
    //     lat: latitude,
    //     lng: longitude,
    //   });
    // });
    const getCoords = async () => {
      const result = await geocodeByAddress('Montevideo, Uruguay');
      const latLng = await getLatLng(result[0]);
      console.log(latLng);
    };
    getCoords();
  }, [payload && payload?.address]);
  const dispatch = useDispatch();

  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setIsLoading(true);
    let images: any = [];
    let files = event.target.files;
    let formData = new FormData();
    if (files)
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
        formData.append('upload_preset', 'qvqmwmjg');
        let response = await apiUploadImages(formData);
        if (response.status === 200) images = [...images, response.data?.secure_url];
      }
    setIsLoading(false);
    setImagesPreview((prev: any) => [...prev, ...images]);
    setPayload((prev: any) => ({ ...prev, images: [...prev.images, ...images] }));
  };
  const handleDeleteImage = (image: any) => {
    setImagesPreview((prev: any) => prev?.filter((item: any) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };
  // TODO: FIXME
  // my bad :((
  const convertPriceToCode = (price: number) => {
    switch (true) {
      case price >= 2 && price <= 3:
        return '2U3N';
      case price <= 1:
        return 'OU1N';
      case price >= 1 && price <= 2:
        return '1U2N';
      case price >= 3 && price <= 5:
        return '3U5N';
      case price >= 7 && price <= 10:
        return '7U0N';
      case price >= 5 && price <= 7:
        return '5U7N';
      case price >= 10 && price <= 15:
        return '1E1N';
      case price >= 15:
        return 'EU5N';
    }
  };
  const convertAreaToCode = (area: number) => {
    switch (true) {
      case area >= 30 && area <= 50:
        return '3UMD';
      case area <= 20:
        return 'ON2E';
      case area >= 50 && area <= 70:
        return '5UMD';
      case area >= 20 && area <= 30:
        return '2UMD';
      case area >= 70 && area <= 90:
        return '7UMD';
      case area >= 90:
        return 'EN9E';
    }
  };
  const handleSubmit = async () => {
    let finalPayload = {
      ...payload,
      postId: currentPost ? currentPost[0].id : null,
      description:
        currentPost && !payload.description
          ? currentPost[0].description
          : payload.description,
      title: currentPost && !payload.title ? currentPost[0].title : payload.title,
      province:
        currentPost && !payload.province
          ? currentPost[0].address.split(', ')[0]
          : payload.province,
      attributesId: currentPost ? currentPost[0].attributes.id : null,
      categoryCode:
        currentPost && !payload.categoryCode
          ? currentPost[0].categoryCode
          : payload.categoryCode,
      imagesId: currentPost ? currentPost[0].images.id : null,
      images:
        currentPost && !payload.images
          ? JSON.parse(currentPost[0].images.image)
          : payload.images,
      overviewId: currentPost ? currentPost[0].overviews.id : null,
      priceNumber:
        currentPost && !payload.priceNumber
          ? currentPost[0].priceNumber
          : payload.priceNumber / 1000000,
      areaNumber:
        currentPost && !payload.areaNumber
          ? currentPost[0].areaNumber
          : payload.areaNumber,
      userId: currentData && currentData.id,
      priceCode:
        currentPost && !payload.priceNumber
          ? convertPriceToCode(currentPost[0].priceNumber)
          : convertPriceToCode(payload.priceNumber / 1000000),
      areaCode:
        currentPost && !payload.areaNumber
          ? convertPriceToCode(currentPost[0].areaNumber)
          : convertAreaToCode(payload.areaNumber),
      target:
        currentPost && !payload.target
          ? currentPost[0].overviews.target
          : payload.target || 'Tất cả',
      label:
        currentPost && !payload.province
          ? `${
              categories?.find((item) => item.code === currentPost[0].overviews.target)
                ?.value
            } ${currentPost[0].province}`
          : `${categories?.find((item) => item.code === payload?.categoryCode)?.value} ${
              payload?.province
            }`,
    };
    setErrorValidation((prev) => ({
      ...prev,
      errorProvince: finalPayload.province === '',
      errorCategory: finalPayload.categoryCode === '',
      errorTitle: finalPayload.title === '',
      errorTarget: finalPayload.target === '',
      errorPrice:
        finalPayload.priceNumber === undefined ||
        finalPayload.priceNumber === null ||
        finalPayload.priceNumber === 0,
      errorArea:
        finalPayload.areaNumber === undefined ||
        finalPayload.areaNumber === null ||
        finalPayload.areaNumber === 0,
      errorDescription: finalPayload.description === '',
    }));
    if (
      errorValidation.errorProvince ||
      errorValidation.errorCategory ||
      errorValidation.errorTitle ||
      errorValidation.errorTarget ||
      errorValidation.errorPrice ||
      errorValidation.errorArea ||
      errorValidation.errorDescription
    ) {
      await Swal.fire('Oops!', 'Có lỗi xảy ra, hãy kiểm tra lại!', 'error');
    } else {
      if (
        currentPost &&
        currentPost[0].categoryCode === finalPayload.categoryCode &&
        currentPost[0].title === finalPayload.title &&
        currentPost[0].description === finalPayload.description &&
        currentPost[0].priceNumber === finalPayload.priceNumber &&
        currentPost[0].areaNumber === finalPayload.areaNumber &&
        JSON.stringify(JSON.parse(currentPost[0].images.image)) ===
          JSON.stringify(finalPayload.images)
      ) {
        await Swal.fire('Oops!', 'Thông tin không có gì để thay đổi!', 'info');
      } else if (currentPost) {
        const response = await apiEditPost(finalPayload);
        if (response?.data.success) {
          await dispatch(actions.getPostsLimitAdmin(1) as unknown as PostsAction);
          await Swal.fire(
            'Bạn đã sửa tin thành công!',
            'Chúc mừng bạn đã sửa tin thành công!',
            'success',
          );
          setPayload({
            categoryCode: '',
            title: '',
            priceNumber: 0,
            areaNumber: 0,
            images: [],
            address: '',
            priceCode: '',
            areaCode: '',
            description: '',
            target: '',
            province: '',
          });
          setImagesPreview([]);
          setCurrentPost([]);
          setIsEdit(false);
        } else {
          await Swal.fire('Oops!', 'Có lỗi xảy ra, hãy kiểm tra lại!', 'error');
        }
      } else {
        const response = await apiCreatePost(finalPayload);
        if (response?.data.success) {
          await Swal.fire(
            'Bạn đã đăng tin thành công!',
            'Chúc mừng bạn đã đăng tin thành công!',
            'success',
          );
          setPayload({
            categoryCode: '',
            title: '',
            priceNumber: 0,
            areaNumber: 0,
            images: [],
            address: '',
            priceCode: '',
            areaCode: '',
            description: '',
            target: '',
            province: '',
          });
          setImagesPreview([]);
        } else {
          await Swal.fire('Oops!', 'Có lỗi xảy ra, hãy kiểm tra lại!', 'info');
        }
      }
    }
  };

  return (
    <div
      className="px-6 "
      onClick={(event) => {
        event.stopPropagation();
        currentPost && setIsEdit(true);
      }}
    >
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        {currentPost ? `Chỉnh sửa tin đăng` : `Đăng tin mới`}
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address
            payload={payload}
            setPayload={setPayload}
            errorValidation={errorValidation.errorProvince}
            currentPost={currentPost}
          />

          <Overview
            payload={payload}
            setPayload={setPayload}
            errorCategory={errorValidation.errorCategory}
            errorTitle={errorValidation.errorTitle}
            errorTarget={errorValidation.errorTarget}
            errorPrice={errorValidation.errorPrice}
            errorArea={errorValidation.errorArea}
            errorDescription={errorValidation.errorDescription}
            currentPost={currentPost}
          />
          <div className="w-full mb-6">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full">
              <label
                className="w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md"
                htmlFor="file"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <BsCameraFill color="blue" size={50} />
                    Thêm ảnh
                  </div>
                )}
              </label>
              <input
                hidden
                type="file"
                id="file"
                multiple={true}
                onChange={(event) => handleFiles(event)}
              />
              <div className="w-full">
                <h3 className="font-medium py-4">Ảnh đã chọn</h3>
                <div className="flex gap-4 items-center">
                  {currentPost && !imagesPreview
                    ? JSON.parse(currentPost[0]?.images?.image).map((item: any) => {
                        return (
                          <div key={item} className="relative w-1/3 h-1/3 ">
                            <img
                              src={item}
                              alt="preview"
                              className="w-full h-full object-cover rounded-md"
                            />
                            <span
                              title="Xóa"
                              onClick={() => handleDeleteImage(item)}
                              className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                            >
                              <ImBin />
                            </span>
                          </div>
                        );
                      })
                    : imagesPreview?.map((item: any) => {
                        return (
                          <div key={item} className="relative w-1/3 h-1/3 ">
                            <img
                              src={item}
                              alt="preview"
                              className="w-full h-full object-cover rounded-md"
                            />
                            <span
                              title="Xóa"
                              onClick={() => handleDeleteImage(item)}
                              className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                            >
                              <ImBin />
                            </span>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => handleSubmit()}
            text={currentPost ? 'Chỉnh sửa' : 'Tạo mới'}
            bgColor="bg-green-600"
            textColor="text-white"
          />
          <div className="h-[100px] w-full "></div>
        </div>

        <div className="w-[30%]  flex-none">
          <div className="h-[40%] w-full rounded-md">
            <Map latLng={latLng} />
          </div>
          <div className="mt-8 bg-orange-200 text-orange-900 p-4 rounded-md">
            <h4 className="text-xl font-medium">Lưu ý tin đăng</h4>
            <ul className="text-sm list-disc pl-6 text-justify">
              {attention.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
