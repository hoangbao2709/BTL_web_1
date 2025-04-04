
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Modal from "../helper/modal";
import React, { useState } from 'react';
import "./style/style.css"
const PaginationHelper = ({ data = [], checkedItems, handleCheckboxChange, formatPrice, handleStatusChange, toggleModal, open, edit, setID, results}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pagination = {
        totalItems: data.length,
        totalItemsPerPage: 10,
        pageRanges: 10
    };

    const totalItems = pagination.totalItems;
    const totalItemsPerPage = pagination.totalItemsPerPage;
    const totalPages = Math.ceil(totalItems / totalItemsPerPage);
    const pageRange = pagination.pageRanges;

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

    function handleClickStart(){
        setCurrentPage(1);
    }

    function handleClickPrev(){
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }
    function handleClickEnd(){
        setCurrentPage(totalPages);
    }

    function handleClickNext(){
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    }

    function handleClickI(page) {
        setCurrentPage(page);
    }
    
    for (let i = 1; i <= max && i <= totalPages; i++) { 
        if (i !== currentPage) {
            xhtmlPages.push(
                <li key={i}>
                    <div 
                        onClick={() => handleClickI(i)} 
                        className="flex items-center justify-center p-2 m-1 h-8 leading-tight text-gray-500 bg-white border rounded-lg border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        {i}
                    </div>
                </li>
            );
        } else {
            xhtmlPages.push(
                <li key={i}>
                    <div 
                        onClick={() => handleClickI(i)}
                        aria-current="page" 
                        className="flex items-center justify-center p-2 m-1 h-8 text-blue-600 border border-gray-300 rounded-lg bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                        {i}
                    </div>
                </li>
            );
        }
    }

    xhtmlStart.push(
        <li onClick={handleClickStart}>
            <div className="flex items-center max-sm:hidden justify-center p-2 m-1 h-8  leading-tight text-gray-500 bg-white border border-e-0 rounded-lg border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Start
            </div>
        </li>
    );
    xhtmlPrevious.push(
        <li onClick={handleClickPrev}>
            <div className="flex items-center justify-center p-2 m-1 h-8  leading-tight text-gray-500 bg-white rounded-lg border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                &#60;
            </div>
        </li>
    );

    xhtmlNext.push(
        <li onClick={handleClickNext}>
            <div className="flex items-center justify-center p-2 m-1 h-8 leading-tight text-white bg-black border rounded-lg border-gray-300hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                &#62;
            </div>
        </li>
    );
    xhtmlEnd.push(
        <li onClick={handleClickEnd}>
            <div className="flex max-sm:hidden items-center max-sm:hiden justify-center p-2 m-1 h-8 leading-tight text-white bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                End
            </div>
        </li>
    )


    if (max < totalPages) {
        xhtmlPages.push(<li key="end-ellipsis" className='flex items-center justify-center p-5 m-3 h-8 leading-tight text-white bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>...</li>);
    }

    let index = (currentPage - 1) * totalItemsPerPage;
    let max_index = totalItemsPerPage;

    if(edit){
        checkedItems = [];
    }

    let type;

    edit ? type = "radio" : type = "checkbox";

    function getData() {
        const items = [];
        
        for (let i = index; i < index + max_index; i++) {
            if (i < data.length) {
                const element = data[i] != null ? data[i] : {};
                items.push(
                    <ul className={`flex text-[20px] h-[40px] w-full py-2 ${i % 2 === 0 ? "bg-[#E0E3E7]" : ""}`} key={element.id || i}>
                        <li className="w-[2%] px-[2%]">
                            <input
                                type={type}
                                className={`size-4 rounded-[50%] cursor-pointer ${element.id ? "" : "hidden"}`}
                                checked={checkedItems[i]}
                                onChange={() => handleCheckboxChange(i, results)}
                                name="isRadio"
                            />
                        </li>
                        <li className="w-[5%] px-[2%]">{element.id || ""}</li>
                        <li className="w-[30%] px-[2%] overflow-hidden">{element.name || ""}</li>
                        <li className={`w-[13%] ${element.id ? "" : "hidden"}`}>{formatPrice(element.gia_goc || "")}</li>
                        <li className={`w-[10%] px-[1.5%] ${element.id ? "" : "hidden"}`}>{formatPrice(element.gia || "")}</li>
                        <li className="w-[10%] flex items-center justify-center">{element.giam_gia || ""}</li>
                        <li className={`checkbox-wrapper-8 w-[9%] cursor-pointer ml-[3%] rounded-lg flex items-center justify-center ${element.id ? "" : "hidden"}`}>
                            <input
                                className="tgl tgl-skewed"
                                onClick={() => handleStatusChange(element.id || "")}
                                id={`checkbox-${i}`}
                                checked={element.Status === "Active"}
                                type="checkbox"
                            />
                            <label className="tgl-btn" data-tg-off="Inactive" data-tg-on="Active" htmlFor={`checkbox-${i}`}></label>
                        </li>
                        <li className={`w-[10%] pl-[7.5%] flex items-center justify-center cursor-pointer ${element.id ? "" : "hidden"}`} onClick={() => toggleModal(i)}>
                            <FontAwesomeIcon className="size-7" icon={faBars} />
                        </li>
                        {open[i] && element.id && (
                            <Modal open={open[i]} onClose={() => toggleModal(i)}>
                                <ul className={`w-[500px] text-[30px] text-white`}>
                                    <li className="px-[2%]">Tập: <label className="text-[red]">{element.tap || ""}</label></li>
                                    <li className="px-[2%] bg-[#2D2F39]">Tác giả: <label className="text-[red]">{element.tac_gia || ""}</label></li>
                                    <li className="px-[2%]">Đối tượng: <label className="text-[red]">{element.doi_tuong || ""}</label></li>
                                    <li className="px-[2%] bg-[#2D2F39]">Khuôn khổ: <label className="text-[red]">{element.khuon_kho || ""}</label></li>
                                    <li className="px-[2%]">Số trang: <label className="text-[red]">{element.Page || ""}</label></li>
                                    <li className="px-[2%] bg-[#2D2F39]">Trọng lượng: <label className="text-[red]">{element.trong_luong || ""}</label></li>
                                </ul>
                            </Modal>
                        )}
                    </ul>
                );
            } else {
                items.push(
                    <ul className={`flex text-[20px] h-[40px] w-full py-2 ${i % 2 === 0 ? "bg-[#E0E3E7]" : ""}`} key={`empty-${i}`}>
                    </ul>
                );
            }
        }
        
        return items;
    }

    const countStatus = results.reduce((accumulator, item) => {
        if (item.Status === "Active") {
            accumulator.active += 1;
        } else if (item.Status === "Inactive") {
            accumulator.inactive += 1;
        }
        return accumulator;
    }, { active: 0, inactive: 0 });

    return (
        <div className='shadow-lg rounded-lg '>
            {getData()}
            <div className='flex relative h-[70px] w-full border-t border-[#D0D1D3] items-center'>
                <div className='flex  relative items-center text-[20px] '>
                    <p className='ml-[10px]'> Tổng số : {results.length}</p>
                    <p className='ml-[50px]'> Active: {countStatus.active}</p>
                    <p className='ml-[50px]'> Inactive: {countStatus.inactive}</p>
                </div>
                <nav className='absolute right-0'>
                    <ul className="inline-flex text-[30px] max-sm:text-[15px] max-sm:w-[30]">
                        {xhtmlStart}
                        {xhtmlPrevious}
                        {xhtmlPages}
                        {xhtmlNext}
                        {xhtmlEnd}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default PaginationHelper;
