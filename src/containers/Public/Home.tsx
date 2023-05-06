import {Outlet} from 'react-router';
import Header from './Header';
import Navigation from './Navigation';
import Search from './Search';
import React, {useState} from 'react';
import {WhyUs, Contact} from '../../components';

const Home = () => {
    const [queriesEmpty, setQueriesEmpty] = useState<{ [key: string]: any }>();
    return (
        <div className="flex flex-col items-center w-full h-full gap-4">
            <Header/>
            <Navigation setQueriesEmpty={setQueriesEmpty}/>
            <div className="w-[70%]">
                <Search queriesEmpty={queriesEmpty || {
                    categoriesCode: "",
                    categories: "",
                    provincesCode: "",
                    provinces: "",
                    pricesCode: "",
                    prices: "",
                    areasCode: "",
                    areas: ""
                }}/>
            </div>
            <div className="flex flex-col items-center justify-start w-full">
                <Outlet/>
            </div>
            <WhyUs/>
            <Contact/>
            <div className="h-[200px]"></div>
        </div>
    );
}


export default Home;
