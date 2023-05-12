import { Address, Button, Loading, Overview } from '../../components';
import { useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import { RootState } from '../../store/interface';
import { useSelector } from 'react-redux';
import { apiCreatePost, apiUploadImages } from '../../services';
import { ImBin } from 'react-icons/im';

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
      province: any;
    }>
  >;
}

const CreatePost = () => {
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
  const [imagesPreview, setImagesPreview] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentData } = useSelector((state: RootState) => state.user);
  const { categories } = useSelector((state: RootState) => state.app);

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
      priceNumber: payload.priceNumber / 1000000,
      userId: currentData && currentData.id,
      priceCode: convertPriceToCode(payload.priceNumber / 1000000),
      areaCode: convertAreaToCode(payload.areaNumber),
      target: payload.target || 'Tất cả',
      label: `${categories?.find((item) => item.code === payload?.categoryCode)?.value} ${
        payload?.province
      }`,
    };
    await apiCreatePost(finalPayload);
  };

  return (
    <div className="px-6">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">Đăng tin mới</h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address payload={payload} setPayload={setPayload} />
          <Overview payload={payload} setPayload={setPayload} />
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
                  {imagesPreview?.map((item: any) => {
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
            text="Tạo mới"
            bgColor="bg-green-600"
            textColor="text-white"
          />
        </div>
        <div className="w-[30%]  flex-none">Map</div>
      </div>
    </div>
  );
};

export default CreatePost;
