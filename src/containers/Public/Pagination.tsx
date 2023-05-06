import React, {useEffect, useState} from 'react';
import {PageNumber} from '../../components';
import {useSelector} from 'react-redux';
import {GrLinkNext, GrLinkPrevious} from 'react-icons/gr';
import {RootState} from '../../store/interface';
import {useLocation} from "react-router-dom";

interface props {
    itemsNumber?: number;
    queryPage: string;
}

const Pagination = (props: props) => {
    const {count, posts} = useSelector((state: RootState) => state.posts);
    const [arrayPage, setArrayPage] = useState<number[]>([]);
    const queryPage = +props.queryPage;
    const [currentPage, setCurrentPage] = useState(queryPage);
    let maxPage = count && (props?.itemsNumber && Math.floor(count / props?.itemsNumber)) || 1;
    const location = useLocation()
    const queryFilter = location?.state?.queries
    useEffect(() => {
        let end = currentPage + 1 > maxPage ? maxPage : currentPage + 2;
        let start = currentPage - 1 >= 4 ? currentPage - 2 : 1;
        let temp = [];
        if (maxPage !== 1) {
            for (let i = start; i <= end; i++) {
                temp.push(i);
                setArrayPage(temp);
                //setArrayPage((previous) => [...previous, i]);
            }
            // console.log(arrayPage);
        } else {
            setArrayPage([]);
        } // console.log(arrayPage);
    }, [currentPage, count, posts]);
    return (
        <div className="flex items-center justify-center gap-1 ">
            {currentPage > 4 && (
                <PageNumber
                    key={(Math.random() + 1).toString(36).substring(7)}
                    icon={<GrLinkPrevious/>}
                    page={'1'}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    queryFilter={queryFilter}
                />
            )}
            {currentPage > 6 && <PageNumber page="..."/>}
            {arrayPage.length > 0 &&
                arrayPage.map((item) => {
                    return (
                        <PageNumber
                            key={(Math.random() + 1).toString(36).substring(7)}
                            page={item.toString()}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            queryFilter={queryFilter}
                        />
                    );
                })}{' '}
            {currentPage < maxPage && <PageNumber page="..."/>}
            {currentPage < maxPage && (
                <>
                    <PageNumber
                        key={(Math.random() + 1).toString(36).substring(7)}
                        icon={<GrLinkNext/>}
                        page={maxPage.toString()}
                        setCurrentPage={setCurrentPage}
                        queryFilter={queryFilter}
                    />
                </>
            )}
        </div>
    );
};

export default Pagination;
