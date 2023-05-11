import { Address, Button, Loading, Overview } from '../../components';
import { useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import { RootState } from '../../store/interface';
import { useSelector } from 'react-redux';
import { apiUploadImages } from '../../services';
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
    province: string;
  };
  setPayload: React.Dispatch<
    React.SetStateAction<{
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
      province: string;
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
  const { prices, areas } = useSelector((state: RootState) => state.app);

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
          <Button text="Tạo mới" bgColor="bg-green-600" textColor="text-white" />
        </div>
        <div className="w-[30%]  flex-none">Map</div>
      </div>
    </div>
  );
};

export default CreatePost;
