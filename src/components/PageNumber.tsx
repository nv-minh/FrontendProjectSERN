import React, {memo, ReactNode} from 'react';
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
    useLocation,
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {IQueryFilter, PostsAction, RootState} from '../store/interface';
import * as actions from '../store/actions';
import {formatVietnameseToString} from "../ultils/Common/formatVietnameseToString";

const notActivePagination =
    'px-[18px] py-[15px] bg-white hover:bg-[#ddd] hover:text-white rounded-md cursor-pointer w-[46px] h-[48px] text-center items-center justify-center';
const activePagination =
    'px-[18px] py-[15px] bg-[#E13427] text-white  rounded-md  w-[46px] h-[48px] text-center items-center justify-center';


interface props {
    page?: string | string[] | undefined;
    currentPage?: Number;
    icon?: ReactNode;
    setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
    queryFilter?: IQueryFilter | undefined
}

const PageNumber = ({page = '1', currentPage = 1, icon, setCurrentPage, queryFilter}: props) => {
    const {categories, prices, areas} = useSelector((state: RootState) => state.app);

    const [params] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleChangePage = () => {
        if (page !== '...') {
            if (setCurrentPage) {
                setCurrentPage(+page);
            }
            console.log(queryFilter)
            queryFilter ?
                dispatch(actions.getPostsLimit(+page, queryFilter) as unknown as PostsAction) : dispatch(actions.getPostsLimit(+page, {}) as unknown as PostsAction)
            navigate({
                pathname: `${location.pathname}`,
                search: createSearchParams(`${location.search}/page${page}`).toString(),

            }, {
                state: {
                    titleSearch: location?.state?.titleSearch,
                    queries: queryFilter
                }
            });
        }
    };
    return (
        <div
            key={(Math.random() + 1).toString(36).substring(7)}
            className={+page === currentPage ? activePagination : notActivePagination}
            onClick={handleChangePage}
        >
            {icon || page}
        </div>
    );
};
export default memo(PageNumber);
