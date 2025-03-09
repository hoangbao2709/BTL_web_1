import { Header } from "./header/header";
import { Images } from "./review/image";
import { Tat_ca_san_pham } from "./total/Tat_ca_san_pham";
import { Kien_thuc_khoa_hoc } from "./total/Kien_thuc_khoa_hoc";
import { Lich_su_truyen_thong } from "./total/Lich_su_truyen_thong";
import { Truyen_tranh } from "./total/Truyen_tranh";
import { Van_hoc_nuoc_ngoai } from "./total/Van_hoc_nuoc_ngoai";
import { Van_hoc_Viet_Nam } from "./total/Van_hoc_Viet_Nam";
import { Wings_book } from "./total/Wings_book";
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bg from './images/nen2.jpg';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Banner_1 from './images/banner-1.jpg';
import Banner_2 from './images/banner-2.jpg';
import Banner_3 from './images/banner-3.jpg';
import Banner_4 from './images/banner-4.jpg';

let category = [
  "Tất cả",
  "Nhỏ hơn 100,000₫",
  "Từ 100,000₫ - 200,000₫",
  "Từ 200,000₫ - 300,000₫",
  "Từ 300,000₫ - 400,000₫",
  "Từ 400,000₫ - 500,000₫",
  "Lớn hơn 500,000₫"
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
  "Our Story",
  "Blog",
  "Contact Us"
];

const listMenu = menu.map((element, index) => {
  return (
    <li className="pr-[15px] pl-[10px] pt-[10px] pb-[10px] text-[white] font-bold ml-[5px] mr-[5px] ">
      <a href="">{element}</a>
    </li>
  );
});

export function Home() {
  const location = useLocation();
  const pathParts = location.pathname;
  const headerRef = useRef(null);


  const listCategory = category.map((element, index) => {
    let isActive = false;

    const pathSegments = location.pathname.split('/');
    const path = pathSegments[pathSegments.length - 1];

    const pageNumber = Number(path) ? pathParts.replace("/" + path, "") : pathParts;

    if (pageNumber == linkCategory[index]) {
      isActive = true;
    }
    if (pageNumber === '/main' && index === 0) {
      isActive = true;
    }
    return (
      <li
        key={index}
        className={`list-nonept-[10px] flex text-center items-center py-[10px] pl-[10px] pr-[30px] border-b border-[#D0D1D3] hover:bg-[#F5ECD5] `}
      >
        <input type="checkbox" className="size-5"></input>
        <a className="pl-5" href={linkCategory[index]}>{element}</a>
      </li>
    );
  });

  let resultLocation = "";

  if (location.pathname !== '/') {
    resultLocation = location.pathname;
  } else {
    resultLocation = "/Tat_ca_san_pham";
  }
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="h-[2000px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundAttachment: 'fixed',
      }}
    >
      <Header />
      <div className="flex mt-[150px] w-[200px]">
        <Images />
      </div>
      <div className="w-full justify-center flex h-[1000px] bg-white">
        
      </div>


    </div>
  );
}