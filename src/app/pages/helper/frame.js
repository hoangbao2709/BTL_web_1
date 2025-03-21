import './style/frame.css';
import React, { useRef, useEffect, useState } from 'react';

type FrameProps = {
    item: { img: string[]; page: string; id: string; giam_gia: number; name: string; gia: number; gia_goc: number }[]; 
    index: number; 
    max_index: number; 
};

const Frame: React.FC<FrameProps> = ({ item, index, max_index, childWidth }) => {
    let totalView: JSX.Element[] = []; 
    let oneView: JSX.Element[] = []; 


    function formatPrice(price: number) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ';
    }

    const getImg = (img: string[]) => {
        const result = img.filter(ele => {
            const fileName = ele.split('/');
            const pathParts = fileName[fileName.length - 1].split("_");
            return pathParts.includes("isReview");
        });
        return result;
    };

    let count = 0;

    if(childWidth < 640){
        count = 2;
    }else if(childWidth < 1280){
        count = 3;
    }else if(childWidth < 1600){
        count = 4;
    }else{
        count = 4;
    }

    const view = item.slice(index, index + max_index).map((element, idx) => {
        const imgs = getImg(element.img); 

        if (idx % count === 0 && idx !== 0) {
            totalView.push(
                <ul className='flex w-full h-full mb-[50px] justify-center' key={`group-${idx}`}>
                    {oneView}
                </ul>
            );
            oneView = []; 
        }

        const imgSrc = imgs.length > 0 ? imgs[0] : ''; 

        oneView.push(
            <li
                className='w-[100%] bg-white shadow-2xl overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#E0E3E7] relative fix border border-[#e9e9e9] p-0 m-0 mx-[15px] max-sm:mx-1 '
                key={`item-${element.id}`}
            >   
                <a href={`/Product/${element.page}/${element.id}`}>
                    <div className='overflow-hidden fit object-cover'>
                        <img
                            src={imgSrc}
                            alt="Framed"
                        />
                    </div>
                    <p className='font-bold absolute top-[3%] right-[4%] px-[3%] py-[5%] bg-[red] rounded-[50%] text-[white]'> - {element.giam_gia}%</p>
                    <div className='left-0 h-[100px] right-0 p-3'> 
                        <div className='mt-2 relative'>
                            <p className='font-bold mb-[10px]'>{element.name}</p>
                            <div className='text-[red] text-[14] relative'>
                                <label className='absolute z-10 left-0'>{formatPrice(element.gia)}</label>
                                <label className='absolute ml-[10px] text-[black] right-[0px]'>{formatPrice(element.gia_goc)}</label>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        );
        return null;
    });

    if (oneView.length > 0) {
        totalView.push(
            <ul className='flex w-full mb-[50px] justify-center' key={`group-last`}>
                {oneView}
                {Array.from({ length: count - (oneView.length % count) }).map((_, ind) => (
                    oneView.length % count !== 0 && (
                        <li
                            className='w-[100%] relative fix  p-0 m-0 ml-[25px] mr-[25px]'
                            key={`placeholder-${ind}`}
                        >
                        </li>
                    )
                ))}
            </ul>
        );
    }

    return (
        <div className='flex justify-center items-center content-center'>
            <div className={`2xl:w-[full] xl:w-[full] lg:w-[full]  md:w-[full]  sm:w-[full] max-sm:w-[400px] `}>
                {totalView}
            </div>
        </div>
    );
};

export default Frame;