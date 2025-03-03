import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { paginationHelper } from './../helper/pagination';
import axios, {isCancel, AxiosError} from 'axios';

export function Kien_thuc_khoa_hoc(item) {
  const [] = useState([]);
  const [book, setBook] = useState([]);
  function componentDidMount(){
    fetch('http://localhost/BTL_web_1/src/app/BackEnd/php/index.php').then(response => {
      console.log(response);
      return response.json();
    }).then(result => {
      console.log(result);
      this.setState({
          employee_rs:result
      }); 
    })
  }

  console.log("book ", book);

  function importAll(r) {
    return r.keys().map(r);
  }

  const img = importAll(require.context('./../../BackEnd/php/images/kien_thuc_khoa_hoc', true, /\.(png|webp|svg)$/));

  let items = [];
  
  let images = [];
  
  let number = "";
  let dem = 0;
  let tempImg = [];
  for (let i = 0; i < img.length; i++) {
    const fileName = img[i].split('/').pop();
    const tempNumber = fileName.split('_')[0];
    if (number !== tempNumber) {
      
      let tempItem = {
        img: tempImg,
        gia_goc: "50.000",
        gia: "45.000",
        giam_gia: "10%",
        name: "Charlie tài ba - Phiêu lưu nơi đảo xa"
      }
      images.push(tempItem);
      number = tempNumber;
      items[number] = [];
      tempImg.splice(0, tempImg.length);
    }
    if (number === tempNumber) {
      tempImg.push(img[i]);
    }
  }

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
  "http://localhost:5173/",
  "https://nxbkimdong.com.vn/collections/lich-su-truyen-thong",
  "https://nxbkimdong.com.vn/collections/van-hoc-viet-nam",
  "https://nxbkimdong.com.vn/collections/van-hoc-nuoc-ngoai",
  "https://nxbkimdong.com.vn/collections/van-hoc-nuoc-ngoai",
  "https://nxbkimdong.com.vn/collections/kien-thuc-khoa-hoc",
  "https://nxbkimdong.com.vn/collections/truyen-tranh",
  "https://nxbkimdong.com.vn/collections/wings"
];

const listCategory = category.map((element, index) => {
  return (
    <li key={index} className="border-b list-none border-black pt-[10px] pb-[10px] pl-[30px] pr-[30px] hover:bg-[#F5ECD5] hover:text-[red]">
      <a href={linkCategory[index]}>{element}</a>
    </li>
  );
});

const location = useLocation();
const pathParts = location.pathname;
const pageNumber = pathParts.includes(item.resultLocation)
  ? pathParts.replace(item.resultLocation + '/', "")
  : pathParts.replace(item.resultLocation, "1");
const resultLocation = pathParts.replace("/" + pageNumber, "");
let itemNumber = "";
if (String(pageNumber) === String(resultLocation)) {
  itemNumber = "1";
}
else itemNumber = String(pageNumber);

return (
  <div>
    <div className="flex relative">
      {paginationHelper(itemNumber, resultLocation, images)}
    </div>
  </div>
);
}