import {ReactElement, useEffect, useState} from 'react';
import {formatVietnameseToString} from '../../ultils/Common/formatVietnameseToString';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions';
import {Dispatch} from 'redux';
import {CategoriesAction, PostsAction, RootState} from '../../store/interface';
import {NavLink} from 'react-router-dom';
import Swal from "sweetalert2";

const Navigation = ({setQueriesEmpty}: {
    setQueriesEmpty: React.Dispatch<React.SetStateAction<{ [p: string]: any } | undefined>>
}): ReactElement => {
    const dispatch: Dispatch<CategoriesAction> = useDispatch();
    const {categories} = useSelector((state: RootState) => state.app);

    useEffect(() => {
        dispatch(actions.getCategories() as unknown as CategoriesAction);
        const element = document.getElementById('navigation');

        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                element?.classList.add('fixed');
            }
        });
    }, []);
    const [currentPage, setCurrentPage] = useState<string | undefined>('');
    const onClickNavigate = (categoryCode?: string, category?: string) => {
        categoryCode ? setCurrentPage(categoryCode) : setCurrentPage('');
        categoryCode
            ? dispatch(actions.getPostsLimit(1, {categoryCode}) as unknown as PostsAction)
            : dispatch(actions.getPostsLimit(1, {}) as unknown as PostsAction);
        Swal.fire(
            'Good job!',
            category ? `Bạn đã tìm kiếm phòng trọ với tiêu chí : ${category}` : "Bạn đã về trang chủ!",
            'success'
        )
        setQueriesEmpty({
            categoriesCode: "",
            categories: "",
            provincesCode: "",
            provinces: "",
            pricesCode: "",
            prices: "",
            areasCode: "",
            areas: ""
        });
    };
    return (
        <div
            className="navigation w-full h-[40px] bg-secondary1 text-white  top-0 border-0 overflow-y-scroll overflow-x-hidden z-10 sticky">
            <div className="flex justify-center w-full h-full font-medium m-text-sm auto">
                <div
                    className={
                        '' === currentPage
                            ? 'flex items-center justify-center w-20 h-full bg-secondary2'
                            : 'flex items-center justify-center w-20 h-full '
                    }
                >
                    <NavLink to={'/'} onClick={() => onClickNavigate()}>
                        Trang chủ
                    </NavLink>
                </div>
                {categories &&
                    categories?.length > 0 &&
                    categories.map((item) => {
                        return (
                            <div
                                key={item.code}
                                className={
                                    item.code === currentPage
                                        ? `flex items-center justify-center h-full px-3 py-0 hover:bg-secondary2 bg-secondary2`
                                        : 'flex items-center justify-center h-full px-3 py-0 hover:bg-secondary2'
                                }
                            >
                                <NavLink
                                    to={formatVietnameseToString(item.value)}
                                    onClick={() => onClickNavigate(item.code, item.value)}
                                >
                                    {item.value}
                                </NavLink>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Navigation;
