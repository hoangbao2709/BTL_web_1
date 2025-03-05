import { Header } from "./../header/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import img from './../../BackEnd/php/images/kien_thuc_khoa_hoc/1/1_ngan-nam-su-viet_nha-le-trung-hung_cu-bang-don_b674ffa4770d4254a961bccc1703aad5_large.jpg';
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
    const importAll = (r) => r.keys().map(r);
    const img = importAll(require.context(`./../../BackEnd/php/images/tat_ca_san_pham/`, true, /\.(png|webp|svg|jpg)$/));
    let image = [];

    img.forEach((element, index) => {
        let parts = element.split("/");
        if (parts.length > 3) { 
            let subParts = parts[3].split("_");
            if (subParts.length > 0) {
                console.log(subParts[0],result);
                if (subParts[0] === result) { 
                    if (subParts[0] === result) { 
                        image.push(element);
                    }
                }
            }
        }
    });
    console.log(image);
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
            <div className="bg-cover bg-center pt-[200px] px-[100px] container mx-auto flex justify-center border bg-[#F4F4F4] border-black">
                <div className="w-[100%] ml-[2%] z-0 flex justify-center  ">
                    {/* {files.length > 0 && ( */}
                    <div className="z-0 bg-white w-[40%]   overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-white relative fix  p-0 m-0 ml-[25px] mr-[25px]">
                        <div>
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                navigation={true}
                                modules={[Navigation]}
                                className="w-full"
                            >
                                <SwiperSlide className="flex content-center items-center justify-center">
                                    <img className="w-full h-auto object-contain" src={image[0]} alt="Slide" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                    {/* )} */}
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
                                            className="w-[100%] text-center border border-[#8A8C91] form-control outline-none flex items-center justify-center"
                                            style={{ border: 'none' }}
                                        />
                                    </li>
                                    <li className="w-[25%] flex items-center justify-center border border-[#8A8C91] cursor-pointer" onClick={HandleMinus}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </li>
                                </ul>
                                <p className="bg-[#DD283B] rounded-lg text-white mt-[20px] py-4 flex text-center justify-center items-center">THÊM VÀO GIỎ HÀNG</p>
                                <p className="bg-[#28DD3B] rounded-lg text-white mt-[20px] py-4 flex text-center justify-center items-center">MUA NGAY</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


//
