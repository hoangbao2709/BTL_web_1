import React from 'react';
import { useLocation } from 'react-router-dom';
import { paginationHelper } from './../helper/pagination'; // Make sure to import your pagination helper as a function

function importAll(r) {
  return r.keys().map(r);
}

const img = importAll(require.context('./../../BackEnd/php/images/kien_thuc_khoa_hoc', true, /\.(png|webp|svg)$/));

let items = [];

let images = [];
console.log(img);
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

export function Van_hoc_nuoc_ngoai(item) {
    const location = useLocation();
    const pathParts = location.pathname;
    const pageNumber = pathParts.includes(item.resultLocation)
  ? pathParts.replace(item.resultLocation + '/', "")  // Thay thế resultLocation bằng "1" nếu có
  : pathParts.replace(item.resultLocation, "1"); // Loại bỏ resultLocation khi không có
    const resultLocation = pathParts.replace("/" + pageNumber, "");
    let itemNumber = "";
    if(String(pageNumber) === String(resultLocation)){
      itemNumber = "1";       
    }
    else itemNumber = String(pageNumber);
    
    console.log(resultLocation); 

    return (
      <div>
        <div className="flex relative">
          { paginationHelper(itemNumber, resultLocation, images) }
        </div>
      </div>
    );
}