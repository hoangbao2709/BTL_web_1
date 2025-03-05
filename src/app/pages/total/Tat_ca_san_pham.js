import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { paginationHelper } from './../helper/pagination';
import { useData } from './../helper/getData';

export function Tat_ca_san_pham(item) {
    const importAll = (r) => r.keys().map(r);
    const img = importAll(require.context('./../../BackEnd/php/images/tat_ca_san_pham', true, /\.(png|webp|svg)$/));
    const images = useData(img);
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
      <div className='flex relative'>
        
        {paginationHelper(itemNumber, resultLocation, images)}
      </div>
    );
}