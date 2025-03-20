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
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
                <FontAwesomeIcon icon={faBook} />
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

export function Header(item) {
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
        <div className="z-100">
            <header id="yourElementId" className={`fixed z-50 w-full top-0 left-0 h-[200px] transition-transform duration-700 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex z-50 pl-[100px] bg-[white] items-center">
                    <div className="logo flex items-center">
                        <img src={logoDark} className="h-[80px] mr-[50px]" alt="Logo" />
                    </div>
                    <ul className={`absolute z-100 ${item.childWidth >= 1024 ? 'block' : 'hidden'}  w-[45%] right-[500px]`}>
                        <form className="mr-10 w-full">
                            <Search childWidth={item.childWidth}/>
                        </form>
                    </ul>

                    <ul className="absolute flex p-[30px] pt-[10px] pb-[10px] text-[#009981] text-[20px] right-[3%]">
                        <li className="text-[30px] px-[20px] mx-[5px] rounded-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#EEFFF7]">
                            <FontAwesomeIcon icon={faHeart} />
                        </li>
                        <li className="text-[30px] px-[20px] mx-[5px] rounded-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#EEFFF7]">
                            <FontAwesomeIcon icon={faBagShopping} />
                        </li>
                        <li className="text-[30px] px-[20px] mx-[5px] rounded-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#EEFFF7]">
                            <FontAwesomeIcon icon={faUser} />
                        </li>
                    </ul>
                </div>

                <div className={`h-[72px] w-full bg-[black] flex items-center justify-center transition-transform duration-700 ${isVisible ? 'translate-y-0' : 'translate-y-[120px]'}`}>
                    <div className="flex items-center text-[20px] relative w-[1400px] justify-center">
                            <div className="flex items-center w-[300px] absolute left-0 h-full py-[36px] bg-[#15A78A] group">
                                <i className="px-[15px] rounded-lg">
                                    <FontAwesomeIcon className="text-[white] font-bold" icon={faList} />
                                    <label className="text-white font-normal px-[10px]" style={{ fontStyle: 'normal' }}>Danh mục sản phẩm</label>
                                </i>
                                <ul className="absolute left-0 w-[300px] text-[23px] top-[70px] items-center bg-[#15A78A] hidden group-hover:block">
                                    {listCategory}
                                </ul>
                            </div>
                            <ul className="text-white flex text-[20px]">
                                <li className="px-[20px] hover:text-[#15A78A] cursor-pointer">HOME <FontAwesomeIcon icon={faChevronDown} /></li>
                                <li className="px-[20px] hover:text-[#15A78A] cursor-pointer">SHOP <FontAwesomeIcon icon={faChevronDown} /></li>
                                <li className="px-[20px] hover:text-[#15A78A] cursor-pointer">PRODUCT <FontAwesomeIcon icon={faChevronDown} /></li>
                                <li className="px-[20px] hover:text-[#15A78A] cursor-pointer">PAGES <FontAwesomeIcon icon={faChevronDown} /></li>
                                <li className="px-[20px] hover:text-[#15A78A] cursor-pointer">BLOG <FontAwesomeIcon icon={faChevronDown} /></li>
                                <li className="px-[20px] hover:text-[#15A78A] cursor-pointer">ELEMENTS <FontAwesomeIcon icon={faChevronDown} /></li>
                            </ul>
                            <p className="absolute right-0 text-white font-bold pl-[30px] border-l-2 border-white">Clearance Up to 30% Off</p>
                        </div>
                </div>
            </header>
        </div>
    );
}
