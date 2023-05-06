import SearchItem from '../../components/SearchItem';
import icons from '../../ultils/icons';
import React, {ReactElement, useEffect, useState} from 'react';
import {Modal} from '../../components/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {PostsAction, RootState} from '../../store/interface';
import * as actions from '../../store/actions'
import Swal from "sweetalert2";
import {useNavigate} from "react-router";
import {createSearchParams} from "react-router-dom";
import path from '../../ultils/constant';
import {formatVietnameseToString} from "../../ultils/Common/formatVietnameseToString";


const {
    BsChevronRight,
    HiOutlineLocationMarker,
    TbReportMoney,
    RiCrop2Line,
    MdOutlineHouseSiding,
    FiSearch
} = icons;


const Search = ({queriesEmpty}: { queriesEmpty: { [key: string]: any } }) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [queries, setQueries] = useState<{ [key: string]: any }>(queriesEmpty);
    const [name, setName] = useState('');
    const [content, setContent] = useState<any>([]);
    const {provinces, prices, areas, categories} = useSelector(
        (state: RootState) => state.app,
    );
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleShowModal = (title: string, content: any, name: string) => {
        setTitle(title);
        setName(name)
        setContent(content);
        setIsShowModal(true);
    };
    useEffect(() => {
        setQueries(queriesEmpty)
    }, [queriesEmpty]);

    const handleSearch = () => {
        let queryPrice: Number[] = queries.pricesCode
        let queryArea: Number[] = queries.areasCode
        let categoryCode: string = queries.categoriesCode
        let provinceCode: string = queries.provincesCode
        dispatch(actions.getPostsLimit(1, {
            queryPrice,
            queryArea,
            categoryCode,
            provinceCode,
        }) as unknown as PostsAction)
        let titleSearch = `${queries.categories
            ? queries.categories
            : 'Cho thuê tất cả'} ${queries.provinces
            ? `tỉnh ${queries.provinces}`
            : ''} ${queries.prices
            ? `giá ${queries.prices}`
            : ''} ${queries.areas
            ? `diện tích ${queries.areas}` : ''} `
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(formatVietnameseToString(titleSearch)).toString(),
        }, {
            state: {
                titleSearch, queries: {
                    queryPrice,
                    queryArea,
                    categoryCode,
                    provinceCode,
                }
            }
        })
        Swal.fire(
            'Good job!',
            // `Bạn đã tìm kiếm phòng trọ với tiêu chí : ${queries.categories} ${queries.provinces} ${queries.prices} ${queries.areas}`,
            `Bạn đã tìm kiếm phòng trọ với tiêu chí :${titleSearch}`,
            'success'
        )
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
                <span className="flex-1 cursor-pointer">
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
