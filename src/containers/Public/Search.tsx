import SearchItem from '../../components/SearchItem';
import icons from '../../ultils/icons';
import React, {useState} from 'react';
import {Modal} from '../../components/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {PostsAction, RootState} from '../../store/interface';
import * as actions from '../../store/actions'

const {
    BsChevronRight,
    HiOutlineLocationMarker,
    TbReportMoney,
    RiCrop2Line,
    MdOutlineHouseSiding,
    FiSearch,
} = icons;
const Search = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [queries, setQueries] = useState<{ [key: string]: any }>({
        categoriesCode: "",
        categories: "",
        provincesCode: "",
        provinces: "",
        pricesCode: "",
        prices: "",
        areasCode: "",
        areas: ""
    });

    const [name, setName] = useState('');
    const [content, setContent] = useState<any>([]);
    const {provinces, prices, areas, categories} = useSelector(
        (state: RootState) => state.app,
    );

    const dispatch = useDispatch()

    const handleShowModal = (title: string, content: any, name: string) => {
        setTitle(title);
        setName(name)
        setContent(content);
        setIsShowModal(true);
    };
    const handleSearch = () => {
        let queryPrice: string = queries.pricesCode
        let queryArea: string = queries.areasCode
        let categoryCode: string = queries.categoriesCode
        let provinceCode: string = queries.provincesCode
        dispatch(actions.getPostsLimit(1, {
            queryPrice,
            queryArea,
            categoryCode,
            provinceCode,
        }) as unknown as PostsAction)
        setIsShowModal(false)
    }
    const handleSubmit = (event: React.MouseEvent<HTMLInputElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>, queries: {
        [key: string]: any
    }) => {
        event.stopPropagation()
        setQueries((previous) => ({...previous, ...queries}))
        setIsShowModal(false);
    };
    return (
        <>
            <div className="h-[55px] p-[10px] bg-[#febb02] rounded-lg flex items-center justify-around gap-2">
        <span
            className="flex-1 cursor-pointer "
            onClick={() =>
                handleShowModal('categories', categories, 'Chọn loại mặt bằng')
            }
        >
          <SearchItem
              defaultTitle={'Phòng trọ, nhà trọ'}
              IconBefore={MdOutlineHouseSiding}
              IconAfter={BsChevronRight}
              fontWeight={'font-medium text-black'}
              text={queries.categories}
          />
        </span>
                <span
                    className="flex-1 cursor-pointer"
                    onClick={() => handleShowModal('provinces', provinces, 'Chọn tỉnh thành')}
                >
          <SearchItem
              defaultTitle={'Toàn quốc'}
              IconBefore={HiOutlineLocationMarker}
              IconAfter={BsChevronRight}
              text={queries.provinces}

          />
        </span>
                <span
                    className="flex-1 cursor-pointer"
                    onClick={() => handleShowModal('prices', prices, 'Chọn giá')}
                >
          <SearchItem
              defaultTitle={'Chọn giá'}
              IconBefore={TbReportMoney}
              IconAfter={BsChevronRight}
              text={queries.prices}

          />
        </span>
                <span
                    className="flex-1 cursor-pointer"
                    onClick={() => handleShowModal('areas', areas, 'Chọn diện tích')}
                >
          <SearchItem
              defaultTitle={'Chọn diện tích'}
              IconBefore={RiCrop2Line}
              IconAfter={BsChevronRight}
              text={queries.areas}

          />
        </span>
                <span className="flex-1 cursor-pointer" onClick={() => setIsShowModal(true)}>
          <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-2 text-sm text-white bg-blue-100 rounded-md outline-non"
              onClick={handleSearch}
          >
            <FiSearch/>
            Tìm Kiếm
          </button>
        </span>
            </div>
            {isShowModal && (
                <Modal
                    setIsShowModal={setIsShowModal}
                    title={title}
                    content={content}
                    key={content.code}
                    name={name}
                    handleSubmit={handleSubmit}
                    queries={queries}
                />
            )}
        </>
    );
};

export default Search;
