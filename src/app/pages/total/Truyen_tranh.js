import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Test } from './../helper/pagination';
import { useData } from './../helper/getData';

export function Truyen_tranh(item) {
    const importAll = (r) => r.keys().map(r);
    const img = importAll(require.context('./../../BackEnd/php/images/truyen_tranh', true, /\.(png|webp|svg|jpg)$/));
    const images = useData(img, "truyen_tranh");
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
        <div>
          <Test currentPage={Number(itemNumber)} location={resultLocation} images={images} childWidth={item.Width}/>
        </div>
      </div>
    );
}