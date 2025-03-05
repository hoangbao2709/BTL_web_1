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
        className={`list-nonept-[10px] pb-[10px] pl-[30px] pr-[30px] hover:bg-[#F5ECD5] ${isActive ? 'bg-[#DDDDDD] ' : ''}`}
      >
        <FontAwesomeIcon icon={faBook} />

        <a href={linkCategory[index]}>{element}</a>
      </li>
    );
  });

  let resultLocation = "";

  if (location.pathname !== '/') {
    resultLocation = location.pathname;
  } else {
    resultLocation = "/Tat_ca_san_pham";
  }
  return (
    <div className="h-[2000px]" >
      <Header />
      <div className="flex">
        <Images />
      </div>
      <div className="flex w-[90%] justify-center mt-[50px]">
        <div className='w-[90%] flex'>
          <div className='w-[299px]'>
            <header className="">
              <div className='border border-black rounded-lg font-bold'>
                <p className='font-bold flex justify-center content-center pt-[10px] pb-[10px] text-[20px]'>Danh mục sản phẩm</p>
                <ul>
                  {listCategory}
                </ul>
              </div>
            </header>
          </div>
          <div className='w-[90%] mt-[50px] container mx-auto px-10 '>
            <Routes>
              <Route path="/" element={<Tat_ca_san_pham />} />
              <Route path="/Tat_ca_san_pham/:pageNumber?" element={<Tat_ca_san_pham resultLocation="/main/Tat_ca_san_pham" />} />
              <Route path="/Kien_thuc_khoa_hoc/:pageNumber?" element={<Kien_thuc_khoa_hoc resultLocation="/main/Kien_thuc_khoa_hoc" />} />
              <Route path="/Lich_su_truyen_thong/:pageNumber?" element={<Lich_su_truyen_thong resultLocation="/main/Lich_su_truyen_thong" />} />
              <Route path="/Truyen_tranh/:pageNumber?" element={<Truyen_tranh resultLocation="/main/Truyen_tranh" />} />
              <Route path="/Van_hoc_nuoc_ngoai/:pageNumber?" element={<Van_hoc_nuoc_ngoai resultLocation="/main/Van_hoc_nuoc_ngoai" />} />
              <Route path="/Van_hoc_Viet_Nam/:pageNumber?" element={<Van_hoc_Viet_Nam resultLocation="/main/Van_hoc_Viet_Nam" />} />
              <Route path="/Wings_book/:pageNumber?" element={<Wings_book resultLocation="/main/Wings_book" />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}