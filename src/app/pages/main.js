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

export function Main() {
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

    const parentRef = useRef(null);
    const [childWidth, setChildWidth] = useState(0);
  
    const updateChildWidth = () => {
      if (parentRef.current) {
        const parentWidth = parentRef.current.offsetWidth;
        setChildWidth(parentWidth); // Tính chiều rộng là 50% của phần tử cha
      }
    };
  
    useEffect(() => {
      updateChildWidth(); // Cập nhật chiều rộng ban đầu
  
      window.addEventListener('resize', updateChildWidth); // Lắng nghe sự kiện thay đổi kích thước cửa sổ
  
      return () => {
        window.removeEventListener('resize', updateChildWidth); // Gỡ bỏ sự kiện khi component bị hủy
      };
    }, []);

  return (
    <div ref={parentRef}
      className="h-[screen] bg-cover bg-center"
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
        <div className='w-[90%] flex'>
          <div className={`w-[299px] ${childWidth >= 1024 ? 'block' : 'hidden'} relative`}>
            <header className={`fixed top-[30%] transition-transform duration-1000  ${scrollPosition >= 700 ? 'translate-y-0' : '-translate-y-[1000px]'}`}>
              <div className="shadow-lg rounded-lg font-bold bg-white">
                <div>
                  <p className="font-bold flex justify-center items-center pt-[10px] bg-[red] rounded-t-lg pb-[10px] text-[20px]">
                    Khoảng giá
                  </p>
                  <ul>
                    {listCategory}
                    <div className={`justify-center rounded-b-lg cursor-pointer flex text-center items-center py-[10px] pl-[10px] pr-[30px] border-b bg-[#00ffe1] hover:text-white hover:bg-[#00c4ad] `}>
                      Xác nhận
                    </div>
                  </ul>
                </div>
              </div>
            </header>
          </div>
          <div className='w-[100%] mt-[50px] container mx-auto px-10 '>
            <Routes>
              <Route path="/" element={<Tat_ca_san_pham Width={childWidth}/>} />
              <Route path="/Tat_ca_san_pham/:pageNumber?" element={<Tat_ca_san_pham resultLocation="/main/Tat_ca_san_pham" Width={childWidth} />} />
              <Route path="/Kien_thuc_khoa_hoc/:pageNumber?" element={<Kien_thuc_khoa_hoc resultLocation="/main/Kien_thuc_khoa_hoc" Width={childWidth} />} />
              <Route path="/Lich_su_truyen_thong/:pageNumber?" element={<Lich_su_truyen_thong resultLocation="/main/Lich_su_truyen_thong" Width={childWidth} />} />
              <Route path="/Truyen_tranh/:pageNumber?" element={<Truyen_tranh resultLocation="/main/Truyen_tranh" Width={childWidth} />} />
              <Route path="/Van_hoc_nuoc_ngoai/:pageNumber?" element={<Van_hoc_nuoc_ngoai resultLocation="/main/Van_hoc_nuoc_ngoai" Width={childWidth} />} />
              <Route path="/Van_hoc_Viet_Nam/:pageNumber?" element={<Van_hoc_Viet_Nam resultLocation="/main/Van_hoc_Viet_Nam" Width={childWidth} />} />
              ${childWidth >= 1024 ? 'block' : 'hidden'} <Route path="/Wings_book/:pageNumber?" element={<Wings_book resultLocation="/main/Wings_book" Width={childWidth} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}