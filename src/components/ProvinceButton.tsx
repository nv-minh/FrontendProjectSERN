import React, {memo} from 'react';
import {IProVinceButton} from '../interface';
import * as actions from '../store/actions'
import {useDispatch} from "react-redux";
import {PostsAction} from "../store/interface";
import {useNavigate} from "react-router";
import {formatVietnameseToString} from "../ultils/Common/formatVietnameseToString";
import path from "../ultils/constant";
import {createSearchParams} from "react-router-dom";

const ProvinceButton = ({name, image, code}: IProVinceButton) => {
    const dispatch = useDispatch()
    const handleChangeProvince = () => {
        dispatch(actions.getPostsLimit(1, {provinceCode: code}) as unknown as PostsAction)
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(formatVietnameseToString(name)).toString(),
        })
    }
    const navigate = useNavigate()
    return (
        <div className="shadow-md rounded-br-md rounded-bl-md " onClick={handleChangeProvince}>
            <img
                src={image}
                alt="Error"
                className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md"
            />
            <div className="p-2 text-sm font-medium text-center text-blue-700 hover:text-orange-600">
                {name}
            </div>
        </div>
    );
};

export default memo(ProvinceButton);
