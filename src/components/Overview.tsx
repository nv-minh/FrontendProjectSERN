import SelectField from './SelectField';
import { useSelector } from 'react-redux';
import { RootState } from '../store/interface';
import { payload } from '../containers/System/PostEditor';

const targets = [
  { code: 'Nam', value: 'Nam' },
  { code: 'Nữ', value: 'Nữ' },
];

interface props extends payload {
  errorCategory: boolean;
  errorTitle: boolean;
  errorTarget: boolean;
  errorPrice: boolean;
  errorArea: boolean;
  errorDescription: boolean;
  currentPost: any;
  setCurrentPost: any;
}

const Overview = ({
  payload,
  setPayload,
  errorCategory,
  errorTitle,
  errorTarget,
  errorPrice,
  errorArea,
  errorDescription,
  currentPost,
  setCurrentPost,
}: props) => {
  const { categories } = useSelector((state: RootState) => state.app);
  const { currentData } = useSelector((state: RootState) => state.user);
  let valuePrice =
    currentPost && !payload.priceNumber
      ? (currentPost[0].priceNumber * 1000000).toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })
      : payload.priceNumber.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        });

  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-4">
        <div className="w-1/2">
          <SelectField
            value={
              currentPost && !payload.categoryCode
                ? currentPost[0].categoryCode
                : payload.categoryCode
            }
            setValue={setPayload}
            name="categoryCode"
            options={categories}
            label="Loại chuyên mục"
          />
          {errorCategory && (
            <p className="italic text-red-500">Bạn cần chọn chuyên mục cho thuê!</p>
          )}
        </div>
        <div>
          <label htmlFor="title">Tiêu đề</label>
          <div className="flex items-center">
            <input
              type="text"
              id=" title"
              className="rounded-md outline-none border flex-auto border-gray-300 p-2 "
              value={currentPost && !payload.title ? currentPost[0].title : payload.title}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, ['title']: e.target.value }))
              }
            />
          </div>
          {errorTitle && (
            <p className="italic text-red-500">Tiêu đề không được để trống!</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="desc">Nội dung mô tả</label>
          <textarea
            id="desc"
            cols={30}
            rows={10}
            className="w-full rounded-md outline-none border border-gray-300 p-2"
            value={
              currentPost && !payload.description
                ? currentPost[0].description.slice(1, -1)
                : payload.description
            }
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, ['description']: e.target.value }))
            }
          ></textarea>
          {errorDescription && (
            <p className="italic text-red-500">Nội dung mô tả không được để trống!</p>
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="exactly-address" className="font-medium">
              Thông tin liên hệ
            </label>
            <input
              type="text"
              readOnly
              className="border border-gray-200 rounded-md bg-gray-100 p-2 w-full outline-none"
              value={currentData?.name || currentData?.name}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="exactly-address" className="font-medium">
              Điện thoại
            </label>
            <input
              type="text"
              readOnly
              className="border border-gray-200 rounded-md bg-gray-100 p-2 w-full outline-none"
              value={currentData?.phone}
            />
          </div>
          <div>
            <label htmlFor="title">Giá cho thuê</label>
            <div className="flex items-center">
              <input
                type="text"
                id=" title"
                className="rounded-tl-md rounded-bl-md outline-none border flex-auto border-gray-300 p-2"
                value={valuePrice}
                onChange={(e) => {
                  const matches = e.target.value
                    ? e.target.value.match(/\d/g)?.join('')
                    : 0;
                  setPayload((prev) => ({
                    ...prev,
                    ['priceNumber']: matches ? +matches : 0,
                  }));
                }}
              />
              <span className="p-2 border flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md bg-gray-200">
                đồng
              </span>
            </div>
            {errorPrice && (
              <p className="italic text-red-500">
                Bạn cần điền dữ liệu cho giá tiền muốn cho thuê!
              </p>
            )}
            <small className="opacity-70">
              Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000
            </small>
          </div>
          <div>
            <label htmlFor="title">Diện tích</label>
            <div className="flex items-center">
              <input
                type="text"
                id=" title"
                className="rounded-tl-md rounded-bl-md  outline-none border flex-auto border-gray-300 p-2"
                value={
                  currentPost && !payload.areaNumber
                    ? currentPost[0].areaNumber
                    : payload.areaNumber
                }
                onChange={(e) => {
                  const matches = e.target.value
                    ? e.target.value.match(/\d/g)?.join('')
                    : 0;
                  setPayload((prev) => ({
                    ...prev,
                    ['areaNumber']: matches ? +matches : 0,
                  }));
                }}
              />
              <span className="p-2 border flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md bg-gray-200">
                m2
              </span>
            </div>
            {errorArea && (
              <p className="italic text-red-500">Bạn cần điền dữ liệu cho diện tích!</p>
            )}
          </div>

          <SelectField
            value={
              currentPost && !payload.target
                ? currentPost[0].overviews.target
                : payload.target
            }
            setValue={setPayload}
            name="target"
            options={targets}
            label="Đối tượng cho thuê"
          />
          {errorTarget && (
            <p className="italic text-red-500">Bạn cần chọn đối tượng cho thuê!</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Overview;
