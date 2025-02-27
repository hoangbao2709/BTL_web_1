import React from 'react';
import {Main} from './../main'
const pagination = {
    pageSize: 10,
    totalItems: 20,
    totalItemsPerPage: 10, 
    pageRanges: 5 
};

let systemConfig = {
    prefixAdmin: ""
}
let keyword = "";
let currentStatus = "";

export const paginationHelper = (currentPage, location) => {
    currentPage = (currentPage === '/') ? 1 : (Number(currentPage) || 1);
    const totalItems = pagination.totalItems;
    const totalItemsPerPage = pagination.totalItemsPerPage;
    const totalPages = Math.ceil(totalItems / totalItemsPerPage);
    const to = Math.min(totalItemsPerPage * currentPage, totalItems);
    const from = to - totalItemsPerPage + 1;
    const pageRange = pagination.pageRanges;

    let link = `${systemConfig.prefixAdmin}${currentStatus}`;
    if (keyword) {
        link += `?keyword=${keyword}&page=`;
    } else {
        link += '?page=';
    }

    let xhtmlPagination = [], xhtmlStart = [], xhtmlNext = [], xhtmlPrevious = [], xhtmlEnd = [], xhtmlPages = [];

    const countI = Math.ceil(pageRange / 2);
    let min = currentPage - countI + 1;
    let max = min + pageRange;

    if (min <= 1) {
        min = 1;
    }
    if (max > totalPages) {
        max = totalPages;
    }

    // if (min > 1) {
    //     xhtmlPages.push(<li key="start-ellipsis"><a href="">...</a></li>);
    // }
    
    for (let i = 1; i <= 10; i++) {
        if (i !== currentPage) {
            xhtmlPages.push( 
                <li key={i}>
                    <a href={`${location}/${i}`} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        {i}
                    </a>
                </li>
            );
        } else{
            xhtmlPages.push( 
                <li key={i}>
                    <a href={`${location}/${i}`} aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{i}</a>
                </li>
            );
        }
    }


    let result = xhtmlPages.filter((element, index) => index !== currentPage);

   // if(currentPage > 1){
        xhtmlStart.push(<li>
            <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Start</a>
          </li>);
        xhtmlPrevious.push(<li>
            <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
          </li>);
   // }
    //if(currentPage < totalPages){
        xhtmlNext.push(<li>
            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>);
        xhtmlEnd.push(<li>
            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">End</a>
          </li>)
    //}

    if (max < totalPages) {
        xhtmlPages.push(<li key="end-ellipsis"><a href="">...</a></li>);
    }

    xhtmlPagination = xhtmlStart + xhtmlPrevious + xhtmlPages + xhtmlNext + xhtmlEnd;
    
    return (
        <nav aria-label="Page navigation example" className='absolute right-[0px]'>
            <ul className="inline-flex  text-[30px]">
                {xhtmlStart}
                {xhtmlPrevious}
                {result}
                {xhtmlNext}
                {xhtmlEnd}

            </ul>
        </nav>
        
    );
}