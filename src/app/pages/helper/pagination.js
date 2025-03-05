import React from 'react';
import Frame from '../helper/frame';

export const paginationHelper = (currentPage, location, images = []) => {

    const pagination = {
        totalItems: images.length,
        totalItemsPerPage: 16,
        pageRanges: 10
    };

    currentPage = Number(currentPage);
    const totalItems = pagination.totalItems;
    const totalItemsPerPage = pagination.totalItemsPerPage;
    const totalPages = Math.ceil(totalItems / totalItemsPerPage);
    // const to = Math.min(totalItemsPerPage * currentPage, totalItems);
    // const from = to - totalItemsPerPage + 1;
    const pageRange = pagination.pageRanges;

    // if (to > totalItems) to = totalItems;

    let xhtmlStart = [], xhtmlNext = [], xhtmlPrevious = [], xhtmlEnd = [], xhtmlPages = [];

    const countI = Math.ceil(pageRange / 2);
    let min = currentPage - countI + 1, max = totalPages;

    if (min <= 1) {
        min = 1;
    }
    max = min + pageRange;
    if (max > totalPages) {
        max = totalPages;
    }

    if (min > 1) {
        xhtmlPages.push(<li key="start-ellipsis" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border rounded-e-lg border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</li>);
    }

    let i = 1;

    if (min + countI >= totalPages) {
        i = totalPages - pageRange + 1;
    } else {
        i = min;
    }

    if (i <= 0) i = 1;

    for (i; i <= max && i <= totalPages; i++) {
        let temp = location + "/" + i;
        if (i !== currentPage) {
            xhtmlPages.push(
                <li key={i}>
                    <a href={`${temp}`} className="flex items-center justify-center p-5 m-3 h-8  leading-tight text-gray-500 bg-white border rounded-lg border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        {i}
                    </a>
                </li>
            );
        } else {
            xhtmlPages.push(
                <li key={i}>
                    <a href={`${temp}`} aria-current="page" className="flex items-center justify-center p-5 m-3 h-8  text-blue-600 border border-gray-300 rounded-lg bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                        {i}
                    </a>
                </li>
            );
        }
    }
    if(currentPage !== 1){
        xhtmlStart.push(<li>
            <a href={`${location}/1`} className="flex items-center justify-center p-5 m-3 h-8  leading-tight text-gray-500 bg-white border border-e-0 rounded-lg border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Start
            </a>
        </li>);
        xhtmlPrevious.push(<li>
            <a href={`${location}/${currentPage - 1}`} className="flex items-center justify-center p-5 m-3 h-8  leading-tight text-gray-500 bg-white rounded-lg border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                &#60;
            </a>
        </li>);
    }else{
        xhtmlStart.push(<li>
            <a href={`${location}/1`} className="flex items-center justify-center p-5 m-3 h-8  leading-tight text-gray-500 bg-white border border-e-0 rounded-lg border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Start
            </a>
        </li>);
        xhtmlPrevious.push(<li>
            <a href={`${location}/1`} className="flex items-center justify-center p-5 m-3 h-8  leading-tight text-gray-500 bg-white rounded-lg border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                &#60;
            </a>
        </li>);
    }


    if(currentPage !== totalPages){
        xhtmlNext.push(<li>
            <a href={`${location}/${currentPage + 1}`} className="flex items-center justify-center p-5 m-3 h-8 leading-tight text-white bg-black border rounded-lg border-gray-300hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                &#62;
            </a>
        </li>);
        xhtmlEnd.push(<li>
            <a href={`${location}/${totalPages}`} className="flex items-center justify-center p-5 m-3 h-8 leading-tight text-white bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                End
            </a>
        </li>)
    }
    else{
        xhtmlNext.push(<li>
            <a href={`${location}/${totalPages}`} className="flex items-center justify-center p-5 m-3 h-8 leading-tight text-white bg-black border rounded-lg border-gray-300hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                &#62;
            </a>
        </li>);
        xhtmlEnd.push(<li>
            <a href={`${location}/${totalPages}`} className="flex items-center justify-center p-5 m-3 h-8 leading-tight text-white bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                End
            </a>
        </li>)
    }


    if (max < totalPages) {
        xhtmlPages.push(<li key="end-ellipsis" className='flex items-center justify-center p-5 m-3 h-8 leading-tight text-white bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>...</li>);
    }
    return (
        <div>
            <Frame item={images} index={(currentPage - 1) * totalItemsPerPage} max_index={totalItemsPerPage} />
            <nav aria-label="Page navigation example" className='flex justify-center'>
                <ul className="inline-flex  text-[30px]">
                    {xhtmlStart}
                    {xhtmlPrevious}
                    {xhtmlPages}
                    {xhtmlNext}
                    {xhtmlEnd}
                </ul>
            </nav>
        </div>

    );
}