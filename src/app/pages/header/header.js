import logoDark from "./../images/logo.webp";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Search } from './search'
import React, { useRef, useEffect, useState } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';

let category = [
    "Tất cả sản phẩm",
    "Lịch sử truyền thống",
    "Văn học Việt Nam",
    "Văn học nước ngoài",
    "Kiến thức, khoa học",
    "Truyện tranh",
    "Wings Books"
];

let linkCategory = [
"/main/Tat_ca_san_pham",
"/main/Lich_su_truyen_thong",
"/main/Van_hoc_Viet_Nam",
"/main/Van_hoc_nuoc_ngoai",
"/main/Kien_thuc_khoa_hoc",
"/main/Truyen_tranh",
"/main/Wings_book",
];

let menu = [
    "Tin tức",
    "Giới thiệu",
    // "Our Story",
    // "Blog",
    // "Contact Us"
];

const listCategory = category.map((element, index) => {
    if (index !== category.length - 1) {
        return (
            <li key={index} className="border-b  border-black pt-[5px] p-[10px] bg-white hover:bg-[#F5ECD5] hover:text-[red]">
                <FontAwesomeIcon icon={faBook} />
                <a className="pl-[5px] ml-[10px]" href={linkCategory[index]}>{element}</a>
            </li>
        );
    } else {
        return (
            <li key={index} className="rounded-b-lg border-b border-black pt-[5px] p-[10px] bg-white hover:bg-[#F5ECD5] hover:text-[red]">
                <FontAwesomeIcon  icon={faBook} />
                <a className="pl-[5px] ml-[10px]" href={linkCategory[index]}>{element}</a>
            </li>
        );
    }
});

const listMenu = menu.map((element, index) => {
    return (
        <li className="pr-[15px] pl-[10px] pt-[10px] pb-[10px] text-[#009981] font-bold ml-[5px] mr-[5px] rounded-lg hover:bg-[#EEFFF7] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 ">
            <a href="">{element}</a>
        </li>
    );
});

export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 700) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header id="yourElementId" className={`fixed w-full z-50 top-0 left-0 h-[110px] pl-[100px] items-center flex bg-[#E0E3E7] transition-transform duration-700 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="logo flex items-center ">
                <img src={logoDark} className="size-[80px] mr-[50px]" alt="" />
            </div>
            <ul className="flex items-center text-[120%] bold-900 absolute left-[12%]">
                <li className="flex items-center danhmuc absolute py-[27px]">
                    <i className=" px-[15px] py-[10px] rounded-lg hover:bg-[#EEFFF7] hover:text-[white] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                        <FontAwesomeIcon className="text-[#009981] font-bold" icon={faList} />
                    </i>
                    <ul className="category bold w-[350px] rounded-b-lg text-[30px] flex items-center ">
                        {listCategory}
                    </ul>
                </li>
                {listMenu}
            </ul>
            <ul className="right-[15%] absolute flex w-[45%]">
                <form className="mr-10 w-full">
                    <Search/>              
                </form>
                <li className="text-[30px] pr-[50px]"><FontAwesomeIcon icon={faHeart} /></li>
                <li className="text-[30px]"><FontAwesomeIcon icon={faBagShopping} /> </li>
            </ul>
            <a href="#" className="flex p-[30px] pt-[10px] pb-[10px] text-[#009981] text-[20px] right-[3%] absolute rounded-[8px] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#EEFFF7]">
                <div className="mr-[20px]"><FontAwesomeIcon icon={faUser} /> </div>
                Tài khoản
            </a>
        </header>
    );
}
