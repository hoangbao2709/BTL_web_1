import { Header } from "./../header/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import bg from './mau-background-dep-3.jpg';
import { useLocation } from 'react-router-dom';
import { useData } from './../helper/getData';

export function Product() {
    const location = useLocation();
    const [soLuong, setSoLuong] = useState(1);
    const pathParts = location.pathname.split("/").filter(part => part); 
    const result = pathParts[pathParts.length - 1];
    const link = pathParts[pathParts.length - 2];
    const importAll = (r) => r.keys().map(r);

    let img = [];
    let image = [];

    if(link === "tat_ca_san_pham"){
        img = importAll(require.context(`./../../BackEnd/php/images/tat_ca_san_pham/`, true, /\.(png|webp|svg|jpg)$/));
    }else if(link === "Kien_thuc_khoa_hoc"){
        img = importAll(require.context(`./../../BackEnd/php/images/kien_thuc_khoa_hoc/`, true, /\.(png|webp|svg|jpg)$/))
    }else if(link === "Lich_su_truyen_thong"){
        img = importAll(require.context(`./../../BackEnd/php/images/lich_su_truyen_thong/`, true, /\.(png|webp|svg|jpg)$/))
    }else if(link === "Truyen_tranh"){
        img = importAll(require.context(`./../../BackEnd/php/images/truyen_tranh/`, true, /\.(png|webp|svg|jpg)$/))
    }else if(link === "Van_hoc_nuoc_ngoai"){
        img = importAll(require.context(`./../../BackEnd/php/images/van_hoc_nuoc_ngoai/`, true, /\.(png|webp|svg|jpg)$/))
    }else if(link === "Van_hoc_Viet_Nam"){
        img = importAll(require.context(`./../../BackEnd/php/images/van_hoc_Viet_Nam/`, true, /\.(png|webp|svg|jpg)$/))
    }else if(link === "Wings_book"){
        img = importAll(require.context(`./../../BackEnd/php/images/wings_book/`, true, /\.(png|webp|svg|jpg)$/))
    }

    img.forEach((element, index) => {
        let parts = element.split("/");
        if (parts.length > 3) { 
            let subParts = parts[3].split("_");
            if (subParts.length > 0) {
                if (subParts[0] === result) { 
                    if (subParts[0] === result) { 
                        image.push(element);
                    }
                }
            }
        }
    });

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ';
    }

    function formatGram(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function HandlePlus() {
        setSoLuong(soLuong + 1);
    }

    function HandleMinus() {
        if(soLuong - 1 > 0)
        setSoLuong(soLuong - 1);
    }

    return (
        <div className="h-[screen] bg-cover bg-center"
        style={{
            backgroundImage: `url(${bg})`,
            backgroundAttachment: 'fixed',
        }}>
            <Header></Header>
            <div className="bg-cover h-[1500px] bg-center pt-[200px] px-[100px] container mx-auto flex justify-center border bg-[#F4F4F4] border-black">
                <div className="w-[100%] ml-[2%] z-0 flex justify-center  ">
                    <div className="z-0 h-[760px] w-[40%] overflow-hidden relative fix  p-0 m-0 ml-[25px] mr-[25px]">
                        <div>
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                navigation={true}
                                modules={[Navigation]}
                                className="w-100% h-[715px]"
                            >
                                
                                {image.map((image, index) => (
                                    <SwiperSlide key={index} className="flex content-center relative items-center justify-center">

                                        <img className="w-full h-auto  object-contain " src={image} alt={`Slide ${index + 1}`} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="w-[60%] h-[715px] pl-[20px] rounded-3xl block relative">
                        <div className="items-center break-words">
                            <div className="break-words font-sans-serif">
                                <label className="text-[50px] block break-words">

                                </label>

                                <label className="mt-0 text-[30px] block">

                                </label>

                                <div className="flex items-center">
                                    <div>
                                        <label className="text-[25px]">Rating: </label>

                                        <span className={"text-yellow-500 text-gray-400"}>
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>

                                        <label className="text-[25px]">{" | " + 10 + " đánh giá"} </label>
                                        <p className="text-[25px]">Đã bán: 100</p>
                                    </div>
                                    <label className="text-[30px] pr-[50px] absolute right-0"><FontAwesomeIcon icon={faHeart} /></label>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div>
                                <div className="border-t-2 border-black w-full my-2"></div>
                                <div className="flex">
                                    <div >
                                        <label className="text-[red] text-[25px] mr-[30px]"><strong>{formatPrice(parseInt(parseInt(1000) - (parseInt(1000) * parseInt(1000)) / 100))}</strong></label>
                                    </div>
                                    <div >
                                        <label className="text-gray-400 text-[25px] line-through" id="original-price"><strong>{formatPrice(parseInt(1000))}</strong></label>
                                    </div>
                                    <div >
                                        <label className="text-[25px] absolute right-0" id="original-price"><strong>Bạn đã tiết kiệm được {formatPrice(parseInt((parseInt(1000) * parseInt(1000)) / 100))}</strong></label>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-4">
                                        <label className="text-[red] text-[30px]"><strong>{formatPrice(1000)}</strong></label>
                                    </div>
                                </div>
                                <div className="border-t-2 border-black w-full mt-2"></div>
                                <li>
                                    <label className="text-[30px]">Tác giả: <strong className="text-[red]">bao</strong></label>
                                </li>
                                <li>
                                    <label className="text-[30px]">Đối tượng: <strong className="text-[red]">bao</strong></label>
                                </li>
                                <li>
                                    <label className="text-[30px]">Khuôn khổ: <strong className="text-[red]">bao</strong></label>
                                </li>
                                <li>
                                    <label className="text-[30px]">Số trang: <strong className="text-[red]">{formatGram("bao")}</strong></label>
                                </li>
                                <li>
                                    <label className="text-[30px]">Trọng lượng: <strong className="text-[red]">{formatGram("bao")}</strong></label>
                                </li>
                            </div>
                            <div className="absolute left-[72%] top-[130px]">
                                <p className="text-[30px]">Số lượng</p>
                                <ul className="flex border border-[#8A8C91] w-[200px] h-[50px] mt-[20px]">
                                    <li className="w-[25%] flex items-center justify-center border border-[#8A8C91] cursor-pointer" onClick={HandlePlus}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </li>
                                    <li className=" w-[50%] flex items-center justify-center border border-[#8A8C91]">
                                        <input
                                            value={soLuong}
                                            onChange={(e) => setSoLuong(Number(e.target.value) || 0)}
                                            className="w-[100%] text-center border bg-[#F4F4F4] border-[#8A8C91] form-control outline-none flex items-center justify-center"
                                            style={{ border: 'none' }}
                                        />
                                    </li>
                                    <li className="w-[25%] flex items-center justify-center border border-[#8A8C91] cursor-pointer" onClick={HandleMinus}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </li>
                                </ul>
                                <p className="bg-[#FF4086] rounded-lg text-white mt-[20px] py-4 flex text-center justify-center items-center cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#FF0000]">THÊM VÀO GIỎ HÀNG</p>
                                <p className="bg-[#28DD3B] rounded-lg text-white mt-[20px] py-4 flex text-center justify-center items-center cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#007F00]">MUA NGAY</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


//
