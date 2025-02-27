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
import { paginationHelper } from './helper/pagination'; // Make sure to import your pagination helper as a function

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
  "/Tat_ca_san_pham",
  "/Lich_su_truyen_thong",
  "/Van_hoc_Viet_Nam",
  "/Van_hoc_nuoc_ngoai",
  "/Kien_thuc_khoa_hoc",
  "/Truyen_tranh",
  "/Wings_book",
];

export function Main() {
  const location = useLocation();
  const pathParts = location.pathname;
  const pageNumber = pathParts.length > 1 ? pathParts[pathParts.length - 1] : null;
  
  let temp = pathParts.split(`/${pageNumber}`);
  const listCategory = category.map((element, index) => {
    let isActive = false;
    if(temp[0] == linkCategory[index]){
      isActive = true;
    }
    if (temp === '/' && index === 0) {
      isActive = true;
    }
    return (
      <li
        key={index}
        className={`border-b list-none border-black pt-[10px] pb-[10px] pl-[30px] pr-[30px] hover:bg-[#F5ECD5] hover:text-[red] ${isActive ? 'bg-[#F5ECD5] text-[red]' : ''}`}
      >
        <a href={linkCategory[index]}>{element}</a>
      </li>
    );
  });

  let resultLocation = "";

  if (location.pathname !== '/') {
    resultLocation = location.pathname;
  }else{
    resultLocation = "/Tat_ca_san_pham";
  }
  return (
    <div>
      <Header />
      <div className="flex">
        <Images />
      </div>
      <div className="flex justify-center mt-[50px]">
        <div className='w-[80%] flex'>
          <div className='w-[20%]'>
            <header>
              <div className='text-[40px] mb-[20px]'><p>Tất cả sản phẩm</p></div>
              <div className='border border-black'>
                <p className='font-bold flex justify-center content-center border-b border-black pt-[10px] pb-[10px] text-[20px] bg-[#D51C24] text-[white]'>Danh mục sản phẩm</p>
                <ul>
                  {listCategory}
                </ul>
              </div>
            </header>
          </div>
          <div className='w-[80%] mt-[50px]'>
            <Routes>
              <Route path="/" element={<Tat_ca_san_pham />} />
              <Route path="/Tat_ca_san_pham/:pageNumber?" element={<Tat_ca_san_pham resultLocation="/Tat_ca_san_pham" />} />              
              <Route path="/Kien_thuc_khoa_hoc/:pageNumber?" element={<Kien_thuc_khoa_hoc resultLocation="/Kien_thuc_khoa_hoc" />} />
              <Route path="/Lich_su_truyen_thong/:pageNumber?" element={<Lich_su_truyen_thong resultLocation="/Lich_su_truyen_thong" />} />
              <Route path="/Truyen_tranh/:pageNumber?" element={<Truyen_tranh resultLocation="/Truyen_tranh" />} />
              <Route path="/Van_hoc_nuoc_ngoai/:pageNumber?" element={<Van_hoc_nuoc_ngoai resultLocation="/Van_hoc_nuoc_ngoai" />} />
              <Route path="/Van_hoc_Viet_Nam/:pageNumber?" element={<Van_hoc_Viet_Nam resultLocation="/Van_hoc_Viet_Nam" />} />
              <Route path="/Wings_book/:pageNumber?" element={<Wings_book resultLocation="/Wings_book" />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}