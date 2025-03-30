import Header from "./header/header";
import Images from "./review/image";
import Tat_ca_san_pham  from "./total/Tat_ca_san_pham";
import Kien_thuc_khoa_hoc  from "./total/Kien_thuc_khoa_hoc";
import Lich_su_truyen_thong  from "./total/Lich_su_truyen_thong";
import Truyen_tranh  from "./total/Truyen_tranh";
import Van_hoc_nuoc_ngoai  from "./total/Van_hoc_nuoc_ngoai";
import Van_hoc_Viet_Nam  from "./total/Van_hoc_Viet_Nam";
import Wings_book  from "./total/Wings_book";
import Favorite  from "./total/Favorite";
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import bg from './images/nen2.jpg';

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
const Main = () => {
  const location = useLocation();
  const pathParts = location.pathname;
  const headerRef = useRef(null);

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

    const parentRef = useRef(null);
    const [childWidth, setChildWidth] = useState(0);
  
    const updateChildWidth = () => {
      if (parentRef.current) {
        const parentWidth = parentRef.current.offsetWidth;
        setChildWidth(parentWidth); 
      }
    };
  
    useEffect(() => {
      updateChildWidth(); 
  
      window.addEventListener('resize', updateChildWidth); 
  
      return () => {
        window.removeEventListener('resize', updateChildWidth);
      };
    }, []);
  

  return (
    <div 
      ref={parentRef}
      className=""
      style={{
        backgroundImage: `url(${bg})`,
        backgroundAttachment: 'fixed',
      }}
    >
      <Header childWidth={childWidth}/>
      <div className="flex mt-[150px] w-[200px]">
        <Images />
      </div>
      <div className={`main flex w-[100%] justify-center mt-[50px] `}>
        <div className='w-[1200px] flex'>
          <div className='w-[100%] container mx-auto px-10 '>
            <Routes>
              <Route path="/" element={<Tat_ca_san_pham Width={childWidth}/>} />
              <Route path="/Tat_ca_san_pham/:pageNumber?" element={<Tat_ca_san_pham resultLocation="/main/Tat_ca_san_pham" Width={childWidth} />} />
              <Route path="/Kien_thuc_khoa_hoc/:pageNumber?" element={<Kien_thuc_khoa_hoc resultLocation="/main/Kien_thuc_khoa_hoc" Width={childWidth} />} />
              <Route path="/Lich_su_truyen_thong/:pageNumber?" element={<Lich_su_truyen_thong resultLocation="/main/Lich_su_truyen_thong" Width={childWidth} />} />
              <Route path="/Truyen_tranh/:pageNumber?" element={<Truyen_tranh resultLocation="/main/Truyen_tranh" Width={childWidth} />} />
              <Route path="/Van_hoc_nuoc_ngoai/:pageNumber?" element={<Van_hoc_nuoc_ngoai resultLocation="/main/Van_hoc_nuoc_ngoai" Width={childWidth} />} />
              <Route path="/Van_hoc_Viet_Nam/:pageNumber?" element={<Van_hoc_Viet_Nam resultLocation="/main/Van_hoc_Viet_Nam" Width={childWidth} />} />
              <Route path="/Favorite/:pageNumber?" element={<Favorite resultLocation="/main/Favorite" Width={childWidth} />} />
              ${childWidth >= 1024 ? 'block' : 'hidden'} <Route path="/Wings_book/:pageNumber?" element={<Wings_book resultLocation="/main/Wings_book" Width={childWidth} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main