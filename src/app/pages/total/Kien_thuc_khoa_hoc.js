import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Test } from './../helper/pagination';
import { useData } from './../helper/getData';

export function Kien_thuc_khoa_hoc(item) {
  const importAll = (r) => r.keys().map(r);
  const img = importAll(require.context('./../../BackEnd/php/images/kien_thuc_khoa_hoc/', true, /\.(png|webp|svg|jpg)$/));
  const images = useData(img,"kien_thuc_khoa_hoc");
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
        <Test currentPage={Number(itemNumber)} location={resultLocation} images={images} childWidth={item.Width}/>
      </div>
    </div>
  );
}
