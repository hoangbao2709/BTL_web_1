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
import { useData } from './getData';

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

    const data = useData(image, link, result);
    const element = data[0] || {
        name: 'N/A',
        tap: 'N/A',
        gia: 0,
        gia_goc: 0,
        tac_gia: 'N/A',
        doituong: 'N/A',
        khuon_kho: 'N/A',
        so_trang: 'N/A',
        trong_luong: 0,
    };

    function formatPrice(price) {
        return price;
    }

    function formatGram(price) {
        return price;
    }

    function HandlePlus() {
        setSoLuong(soLuong + 1);
    }

    function HandleMinus() {
        if(soLuong - 1 > 0)
        setSoLuong(soLuong - 1);
    }

    return (
        <div className="h-screen bg-cover bg-center"
        style={{
            backgroundImage: `url(${bg})`,
            backgroundAttachment: 'fixed',
        }}>
            <Header></Header>
            <div className="bg-cover bg-center h-screen md:w-[100%] max-lg:pt-[100px] lg:px-[100px] container mx-auto flex justify-center border bg-[#F4F4F4] border-black">
                <div className="lg:w-[100%] max-lg:w-[100%] md:w-[100%] flex justify-center items-center content-center max-lg:block">  
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                navigation={true}
                                modules={[Navigation]}
                                className="lg:w-[40%] sm:w-[70%] sm:mt-[10%] max-sm:w-[90%] max-sm:mt-[5%]"
                            >
                                {image.map((image, index) => (
                                    <SwiperSlide key={index} className="flex content-center relative items-center justify-center">
                                        <img className="w-full object-contain" src={image} alt={`Slide ${index + 1}`} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                    <div className="lg:w-[60%] max-lg:w-[100%] h-[715px] lg:pl-[20px] max-lg:px-[20px] rounded-3xl block relative max-lg:text-[14px]">
                        <div className="items-center break-words">
                            <div className="break-words font-sans-serif">
                                <label className="sm:text-[50px] max-sm:text-[20px] block break-words">
                                    {element.name}
                                </label>

                                <label className="mt-0 sm:text-[50px] max-sm:text-[20px]  block">
                                    {element.tap}
                                </label>

                                <div className="flex items-center">
                                    <div>
                                        <label className="sm:text-[25px] max-sm:text-[14px]">Rating: </label>

                                        <span className={"text-yellow-500"}>
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>

                                        <label className="sm:text-[25px] max-sm:text-[14px]">{" | " + 10 + " đánh giá"} </label>
                                        <p className="sm:text-[25px] max-sm:text-[14px]">Đã bán: 100</p>
                                    </div>
                                    <label className="sm:text-[30px] max-sm:text-[20px] pr-[50px] absolute right-0"><FontAwesomeIcon icon={faHeart} /></label>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div>
                                <div className="border-t-2 border-black w-full my-2"></div>
                                <div className="2xl:flex xl:block">
                                    <div className="xl:flex">
                                        <div >
                                            <label className="text-[red] sm:text-[25px] max-sm:text-[14px] mr-[30px]"><strong>{formatPrice((parseInt(element.gia)))}</strong></label>
                                        </div>
                                        <div >
                                            <label className="text-gray-400 sm:text-[25px] max-sm:text-[14px] line-through" id="original-price"><strong>{formatPrice(parseInt(element.gia_goc))}</strong></label>
                                        </div>
                                    </div>
                                    <div >
                                        <label className="sm:text-[25px] max-sm:text-[14px]  right-0 2xl:absolute xl:block lg:block" id="original-price"><strong>Bạn đã tiết kiệm được {formatPrice(parseInt(element.gia_goc) - (parseInt(element.gia)))}</strong></label>
                                    </div>
                                </div>
                                <div>

                                </div>
                                <div className="border-t-2 border-black w-full mt-2"></div>
                                <li>
                                    <label className="sm:text-[30px] max-sm:text-[20px]">Tác giả: <strong className="text-[red]">{element.tac_gia}</strong></label>
                                </li>
                                <li>
                                    <label className="sm:text-[30px] max-sm:text-[20px]">Đối tượng: <strong className="text-[red]">{element.tac_gia}</strong></label>
                                </li>
                                <li>
                                    <label className="sm:text-[30px] max-sm:text-[20px]">Khuôn khổ: <strong className="text-[red]">{element.khuon_kho}</strong></label>
                                </li>
                                <li>
                                    <label className="sm:text-[30px] max-sm:text-[20px]">Số trang: <strong className="text-[red]">{element.so_trang}</strong></label>
                                </li>
                                <li>
                                    <label className="sm:text-[30px] max-sm:text-[20px]">Trọng lượng: <strong className="text-[red]">{formatGram(element.trong_luong)}</strong></label>
                                </li>
                            </div>
                            <div className="left-[72%] top-[130px] xl:absolute lg:block lg:mt-[20px] max-lg:block max-lg:w-[100%] ">
                                <p className="sm:text-[30px] max-sm:text-[20px]">Số lượng</p>
                                <ul className="flex border border-[#8A8C91] xl:w-[200px] lg:w-[100%] h-[50px] mt-[20px] max-lg:w-[100%]">
                                    <li className="w-[25%] flex items-center justify-center border border-[#8A8C91] cursor-pointer" onClick={HandlePlus}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </li>
                                    <li className="w-[50%] flex items-center justify-center border border-[#8A8C91]">
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
                                <p className="bg-[#FF4086] rounded-lg text-white mt-[20px] py-4 flex text-center justify-center items-center cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#FF0000]">THÊM VÀO GIỎ HÀNG</p>
                                <p className="bg-[#28DD3B] rounded-lg text-white mt-[20px] py-4 flex text-center justify-center items-center cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#007F00]">MUA NGAY</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


//
