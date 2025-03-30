import Header from "../header/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef, useEffect } from 'react';
import bg from './mau-background-dep-3.jpg';
import { useLocation } from 'react-router-dom';
import { useData } from './getData';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ChevronUp } from "react-feather";

export default function Product() {
    const location = useLocation();
    const [soLuong, setSoLuong] = useState(1);
    const pathParts = location.pathname.split("/").filter(part => part);
    const result = pathParts[pathParts.length - 1];
    const link = pathParts[pathParts.length - 2];
    const importAll = (r) => r.keys().map(r);
    const [index, setIndex] = useState(0);
    const swiperRef = useRef(null);
    const chillSwiperRef = useRef(null);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(3);

    const [img, setImages] = useState([]);
    let image = [];

    async function loadAndProcessImages() {
        try {
            let imagePaths = [];
            if (link === "tat_ca_san_pham") {
                imagePaths = import.meta.glob('./../../BackEnd/php/images/tat_ca_san_pham/**/*.{jpg,jpeg,png,gif,svg,webp}');
            } else if (link === "Kien_thuc_khoa_hoc") {
                imagePaths = import.meta.glob('./../../BackEnd/php/images/kien_thuc_khoa_hoc/**/*.{jpg,jpeg,png,gif,svg,webp}');
            } else if (link === "Lich_su_truyen_thong") {
                imagePaths = import.meta.glob('./../../BackEnd/php/images/lich_su_truyen_thong/**/*.{jpg,jpeg,png,gif,svg,webp}');
            } else if (link === "Truyen_tranh") {
                imagePaths = import.meta.glob('./../../BackEnd/php/images/truyen_tranh/**/*.{jpg,jpeg,png,gif,svg,webp}');
            } else if (link === "Van_hoc_nuoc_ngoai") {
                imagePaths = import.meta.glob('./../../BackEnd/php/images/van_hoc_nuoc_ngoai/**/*.{jpg,jpeg,png,gif,svg,webp}');
            } else if (link === "Van_hoc_Viet_Nam") {
                imagePaths = import.meta.glob('./../../BackEnd/php/images/van_hoc_Viet_Nam/**/*.{jpg,jpeg,png,gif,svg,webp}');
            } else if (link === "Wings_book") {
                imagePaths = import.meta.glob('./../../BackEnd/php/images/wings_book/**/*.{jpg,jpeg,png,gif,svg,webp}');
            }
            const imagePromises = Object.values(imagePaths).map(importer => importer());
            const loadedImages = await Promise.all(imagePromises);
            setImages(loadedImages.map(module => module.default));
        } catch (error) {
        }
    }
    
    useEffect(() => {
        loadAndProcessImages();
    }, []);

    img.forEach((element, index) => {
        let parts = element.split("/");
        if (parts.length > 3) {
            let subParts = parts[parts.length - 1].split("_");
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
    const [favourite, setFavourite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/getFavorite.php?id=${encodeURIComponent(element.id)}`);
            const data = await response.json();
            setFavourite(data.length > 0);
          } catch (error) {
            console.error("Error fetching favorite status:", error);
          }
        };
        fetchData();
      }, [element.id]);

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
        if (soLuong - 1 > 0)
            setSoLuong(soLuong - 1);
    }

    function handleClick(index) {
        setIndex(index);
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    }

    function handleUp() {
        if (image.length > 0 && from + to < image.length) {
            if (chillSwiperRef.current) {
                chillSwiperRef.current.slideTo(from + 1);
            }
            setFrom(from + 1);
        }
    }

    function handleDown() {
        if (from > 0) {
            if (chillSwiperRef.current) {
                chillSwiperRef.current.slideTo(from - 1);
            }
            setFrom(from - 1);
        }
    }

    const parentRef = useRef(null);
    const [childWidth, setChildWidth] = useState(0);

    const updateChildWidth = () => {
        if (parentRef.current) {
            const parentWidth = parentRef.current.offsetWidth;
            setChildWidth(parentWidth);
        }
    };

    useEffect(() => {
        updateChildWidth();
        window.addEventListener('resize', updateChildWidth);
        return () => {
            window.removeEventListener('resize', updateChildWidth);
        };
    }, []);

    useEffect(() => {
        favourite ?
        fetch(`https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/favorite.php?id=${encodeURIComponent(element.id)}`)
        : fetch(`https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/deleteFavorite.php?id=${encodeURIComponent(element.id)}`)
    }, [favourite]); 

    function handleFavorite(){
        setFavourite(!favourite);
    }

    function addToStore(){
        fetch(`https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/store.php?&id=${encodeURIComponent(element.id)}&sl=${soLuong}`)
    }

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ';
    }

    function formatGram(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <div className="h-screen bg-cover w-[100%] bg-center"
            ref={parentRef}
            style={{
                backgroundImage: `url(${bg})`,
                backgroundAttachment: 'fixed',
            }}
        >
            <Header childWidth={childWidth} />
            <div className="bg-cover mt-[70px] bg-center h-screen w-[100%] max-lg:pt-[100px] lg:px-[30px] container mx-auto flex justify-center border bg-[white] border-black">
                <div className="w-[100%] flex justify-center mt-[110px] content-center max-lg:block">
                    <div className="w-[10%] h-[715px] relative">
                        <Swiper
                            modules={[Scrollbar, A11y]}
                            spaceBetween={30}
                            slidesPerView={3}
                            scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => (chillSwiperRef.current = swiper)}
                            direction="vertical"
                            style={{ height: '600px' }}
                        >
                            <div className="flex w-full absolute top-0 z-20 cursor-pointer justify-center" onClick={handleDown}>
                                <FontAwesomeIcon className="flex justify-center items-center text-white bottom-0 h-[30px] w-[30px] cursor-pointer bg-opacity-50 bg-[red]" icon={faChevronUp} />
                            </div>
                            {image.map((img, index) => {
                                return (
                                    <SwiperSlide>
                                        <div className={`relative transition-transform duration-500 ${index === 0 ? 'slide-up' : ''}`}>
                                            <img
                                                className="w-full object-contain mb-[20px] cursor-pointer"
                                                onClick={() => handleClick(index)}
                                                src={img}
                                                alt={`Image ${index}`}
                                            />
                                            <p className="absolute top-0 text-white h-[30px] w-[30px] bg-[#77CBDE] font-bold flex items-center justify-center">{index + 1}</p>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                            <div className="flex w-full z-50 absolute bottom-0 justify-center" onClick={handleUp}>
                                <FontAwesomeIcon className="flex justify-center items-center text-white bottom-0 h-[30px] w-[30px] cursor-pointer bg-opacity-50 bg-[red]" icon={faChevronDown} />
                            </div>
                        </Swiper>
                        <p className="w-full flex justify-center items-center font-bold text-[red]">từ {from + 1} đến {from + to}</p>
                    </div>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        navigation={true}
                        modules={[Navigation, Pagination]}
                        className="lg:w-[39%] sm:w-[70%] h-[715px] max-sm:w-[90%] max-sm:mt-[5%]"
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                    >
                        {image.map((img, ind) => (
                            <SwiperSlide key={ind} className="flex content-center relative items-center justify-center">
                                <img className="w-full object-contain size-full" src={img} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="lg:w-[50%] max-lg:w-[100%] font-mono h-[715px] lg:pl-[20px] max-lg:px-[20px] rounded-3xl block relative max-lg:text-[14px]">
                        <div className="items-center break-words">
                            <div className="break-words font-sans-serif">
                                <label className="sm:text-[30px] max-sm:text-[20px] block break-words">
                                    {element.name}
                                </label>

                                <label className="mt-0 sm:text-[30px] max-sm:text-[20px]  block">
                                    Tập: {element.tap}
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
                                    <p onClick={handleFavorite} className="cursor-pointer sm:text-[30px] max-sm:text-[20px] pr-[50px] absolute right-0"><FontAwesomeIcon icon={favourite ? faHeartSolid : faHeartRegular} /></p>
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
                                        <label className="sm:text-[25px] max-sm:text-[14px] right-0 2xl:absolute xl:block lg:block" id="original-price"><strong>Bạn đã tiết kiệm được {formatPrice(parseInt(element.gia_goc) - (parseInt(element.gia)))}</strong></label>
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
                                    <label className="sm:text-[30px] max-sm:text-[20px]">Trọng lượng: <strong className="text-[red]">{formatGram(element.trong_luong)} gram</strong></label>
                                </li>
                            </div>
                            <div className="left-[72%] top-[130px] xl:absolute lg:block lg:mt-[20px] max-lg:block max-lg:w-[100%] ">
                                <p className="sm:text-[30px] max-sm:text-[20px]">Số lượng</p>
                                <ul className="flex border border-[#8A8C91] xl:w-[200px] lg:w-[100%] h-[50px] mt-[20px] max-lg:w-[100%]">
                                    <li className="w-[25%] flex items-center justify-center border border-[#8A8C91] cursor-pointer" onClick={HandleMinus}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </li>
                                    <li className="w-[50%] flex items-center justify-center border border-[#8A8C91]">
                                        <input
                                            value={soLuong}
                                            onChange={(e) => setSoLuong(Number(e.target.value) || 0)}
                                            className="w-[100%] text-[30px] text-center border bg-[#F4F4F4] h-full border-[#8A8C91] form-control outline-none flex items-center justify-center"
                                            style={{ border: 'none' }}
                                        />
                                    </li>
                                    <li className="w-[25%] flex items-center justify-center border border-[#8A8C91] cursor-pointer" onClick={HandlePlus}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </li>
                                </ul>
                                <p onClick={addToStore} className="bg-[#FF4086] rounded-lg text-white mt-[20px] py-4 flex text-center justify-center items-center cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#FF0000]">THÊM VÀO GIỎ HÀNG</p>
                                <p className="bg-[#28DD3B] rounded-lg text-white mt-[20px] py-4 flex text-center justify-center items-center cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#007F00]">MUA NGAY</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



