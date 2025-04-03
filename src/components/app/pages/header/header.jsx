import logoDark from "./../images/logo.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Search from './search'
import React, { useRef, useEffect, useState } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './css/style.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

let category = [
    "Tất cả sản phẩm",
    "Lịch sử truyền thống",
    "Văn học Việt Nam",
    "Văn học nước ngoài",
    "Kiến thức, khoa học",
    "Truyện tranh",
    "Wings Books"
];

let linkCategory = [
    "/main/Tat_ca_san_pham",
    "/main/Lich_su_truyen_thong",
    "/main/Van_hoc_Viet_Nam",
    "/main/Van_hoc_nuoc_ngoai",
    "/main/Kien_thuc_khoa_hoc",
    "/main/Truyen_tranh",
    "/main/Wings_book",
];

const listCategory = category.map((element, index) => {
    if (index !== category.length - 1) {
        return (
            <li key={index} className="border-b  border-black pt-[5px] bg-white hover:text-[red]">
                <FontAwesomeIcon icon={faBook} />
                <a className="pl-[5px] ml-[10px]" href={linkCategory[index]}>{element}</a>
            </li>
        );
    } else {
        return (
            <li key={index} className="rounded-b-lg border-b border-black pt-[5px] bg-white hover:text-[red]">
                <FontAwesomeIcon icon={faBook} />
                <a className="pl-[5px] ml-[10px]" href={linkCategory[index]}>{element}</a>
            </li>
        );
    }
});


export default function Header(item) {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const [favourite, setFavourite] = useState([]);
    const [listFavourite, setListFavourite] = useState(false);
    const [store, setStore] = useState([]);
    const [listStore, setListStore] = useState(false);
    const resultsRef1 = useRef();
    const resultsRef2 = useRef();
    const [images, setImages] = useState([]);

    useEffect(() => {
      async function loadImages() {
        const imagePaths = import.meta.glob('../../BackEnd/php/images/tat_ca_san_pham/**/*.{jpg,jpeg,png,gif,svg,webp}');
        const imagePromises = Object.values(imagePaths).map(importer => importer());
        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages.map(module => module.default));
      }
      
      loadImages();
    }, []);

    let imageFavorite = useState([]);
    let imageStore = useState([]);
    const [clickFavorite, setClickFavorite] = useState(Array(favourite.length).fill(false));
    const [clickStore, setClickStore] = useState(Array(store.length).fill(false));
    const getImgFavourite = (img) => {
        let result = [];
        if(favourite.length > 0){
            favourite.forEach(element => {
                const filteredImages = img.filter(ele => {
                    const fileName = ele.split('/');
                    const pathParts = fileName[fileName.length - 1].split("_");
                    return pathParts.includes("0") && pathParts.includes(element.id.toString());
                });
                result.push(filteredImages);
            });
        }
        return result;
    };

    const getImgStore = (img) => {
        let result = [];
        if(store.length > 0)
            store.forEach(element => {
                const filteredImages = img.filter(ele => {
                    const fileName = ele.split('/');
                    const pathParts = fileName[fileName.length - 1].split("_");
                    return pathParts.includes("0") && pathParts.includes(element.id.toString());
                });
                result.push(filteredImages);
            });
        return result;
    };

    imageFavorite = getImgFavourite(images);
    imageStore = getImgStore(images);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/getAllFavorite.php`);
            const data = await response.json();
            setFavourite(data);
          } catch (error) {
            console.error("Error fetching favorite status:", error);
          }
        };
        fetchData();
    }, [favourite]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/getAllStore.php`);
            const data = await response.json();
            setStore(data);
          } catch (error) {
            console.error("Error fetching favorite status:", error);
          }
        };
        fetchData();
    }, [store]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 700) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const indexFavorite = clickFavorite.findIndex(value => value === true);
        if (indexFavorite !== -1) {
            fetch(`https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/deleteFavorite.php?id=${encodeURIComponent(indexFavorite)}`)
                .then(response => response.json()) 
                .catch(error => console.error('Error fetching data:', error));
                setClickFavorite(prevCheckedItems => {
                    const newCheckedItems = [...prevCheckedItems];
                    newCheckedItems[indexFavorite] = false; 
                    return newCheckedItems;
                });
        }
        const indexStore = clickStore.findIndex(value => value === true);
        if (indexStore !== -1) {
            fetch(`https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/deleteStore.php?id=${encodeURIComponent(indexStore)}`)
                .then(response => response.json()) 
                .catch(error => console.error('Error fetching data:', error));
                setClickStore(prevCheckedItems => {
                    const newCheckedItems = [...prevCheckedItems];
                    newCheckedItems[indexStore] = false; 
                    return newCheckedItems;
                });
        }
    }, [clickFavorite, clickStore]);

    function handleClickFavorite(id) {
        setClickFavorite(prevCheckedItems => {
            const newCheckedItems = [...prevCheckedItems];
            newCheckedItems[id] = true; 
            return newCheckedItems;
        });
    }

    function handleClickStore(id) {
        setClickStore(prevCheckedItems => {
            const newCheckedItems = [...prevCheckedItems];
            newCheckedItems[id] = true; 
            return newCheckedItems;
        });
    }

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ';
    }

    const ListFavourite = () => {
        return (
            <div ref={resultsRef1} className="w-[280px] absolute shadow-2xl p-[4px] mt-[20px] border-2 font-mono border-[#C2C2D9] rounded-sm bg-white text-black right-0 z-50">
            <p className="text-[17px] py-[5px] mb-[5px] flex justify-center items-center bg-[#D51C24] text-white rounded-md"> Danh sách yêu thích của tôi</p>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={3}
                scrollbar={{ draggable: true }}
                direction="vertical"
                className={`h-[360px] m-0`}
            >
                {favourite.length > 0 && favourite.map((element, index) => (
                    <SwiperSlide className="m-0" key={index}> 
                        <a className="fit object-cover flex items-center" href={`/Product/tat_ca_san_pham/${element.id}`}>
                            <img className="h-[100px]" src={imageFavorite[index]}></img>
                            <div className="ml-2 w-[160px]">
                                <p className="text-[14px]">{element.name}</p>
                                <p className="text-[14px]">Tập: {element.tap}</p>
                                <p className="text-[14px]">Giá sản phẩm: {formatPrice(element.gia)}</p>
                            </div>
                            <div className="text-[red] cursor-pointer" onClick={() => {handleClickFavorite(element.id)}}>x</div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
            <a className="text-[17px] py-[5px] mb-[5px] flex justify-center items-center bg-[#17AF91] text-white font-bold rounded-sm" href="/main/Favorite"> Xem thêm</a>
        </div>
        );
    };

    const ListStore = () => {
        return (
            <div ref={resultsRef2} className="w-[280px] absolute shadow-2xl p-[4px] mt-[20px] border-2 font-mono border-[#C2C2D9] rounded-sm bg-white text-black right-0 z-50">
            <p className="text-[14px] py-[5px] mb-[5px] flex bg-[#D51C24] text-white rounded-md p-3"> Giỏ hàng của tôi ({store.length || 0} Sản phẩm)</p>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={3}
                scrollbar={{ draggable: true }}
                direction="vertical"
                className={`h-[360px] m-0`}
            >
                {store.length > 0 && store.map((element, index) => (
                    <SwiperSlide className="m-0" key={index}> 
                        <div className="fit object-cover flex items-center" href={`/Product/tat_ca_san_pham/${element.id}`}>
                            <img className="h-[100px]" src={imageStore[index]}></img>
                            <div className="ml-2 w-[160px]">
                                <p className="text-[14px]">{element.name}</p>
                                <p className="text-[14px]">Tập: {element.tap}</p>
                                <p className="text-[14px]">Giá sản phẩm: {formatPrice(element.gia)}</p>
                            </div>
                            <div className="text-[red] cursor-pointer" onClick={() => {handleClickStore(element.id)}}>x</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <p className="text-[20px]">Tạm tính: <label className="font-bold text-[red]">{formatPrice(store.length > 0 && store.reduce((accumulator, item) => {
                    return accumulator + Number(item.gia);
                }, 0))}</label> 
            </p>
            <div className="flex w-full">
                <a className="text-[17px] w-[50%] m-[5px] py-[5px] mb-[5px] flex justify-center items-center bg-[white] text-[red] border border-[red] rounded-sm" href="/main/Favorite"> Xem giỏ hàng</a>
                <a className="text-[17px] w-[50%] m-[5px] py-[5px] mb-[5px] flex justify-center items-center font-bold bg-[red] text-white rounded-sm" href="/main/Favorite"> Thanh toán</a>
            </div>
        </div>
        );
    };

    const handleClickOutside = (event) => {
        if (resultsRef1.current && !resultsRef1.current.contains(event.target)) {
            setListFavourite(false);
        }
        if (resultsRef2.current && !resultsRef2.current.contains(event.target)) {
            setListStore(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function ClickFavorite(){
        setListFavourite(!listFavourite);
    }

    function ClickStore(){
        setListStore(!listStore);
    }
    
    return (
        <div className="z-100">
            <header id="yourElementId" className={`fixed z-50 w-full top-0 left-0 transition-transform duration-700 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex z-50 pl-[100px] bg-[white] items-center">
                    <div className="logo flex items-center">
                        <img src={logoDark} className="h-[50px] my-[10px] mr-[50px]" alt="Logo" />
                    </div>
                    <ul className={`absolute z-100 block w-[45%] right-[500px]`}>
                        <form className="mr-10 w-full">
                            <Search childWidth={item.childWidth}/>
                        </form>
                    </ul>

                    <ul  className="absolute flex p-[30px] pt-[10px] pb-[10px] text-[#009981] text-[20px] right-[3%]">
                        <li className="text-[30px] px-[20px] hover:text-[red] cursor-pointer mx-[5px] relative rounded-lg transition delay-150 duration-300 ease-in-out hover:bg-[#EEFFF7]">
                            <FontAwesomeIcon onClick={ClickFavorite} icon={faHeart} />
                            <p className="absolute top-[-10px] h-[25px] w-[25px] flex items-center justify-center rounded-[50%] bg-[red] right-0 text-white text-[15px]">{favourite.length || 0}</p>
                            {listFavourite && ListFavourite()}
                        </li>
                        <li className="text-[30px] px-[20px] hover:text-[red] cursor-pointer mx-[5px] relative rounded-lg hover:bg-[#EEFFF7]">
                            <FontAwesomeIcon onClick={ClickStore} icon={faBagShopping} />
                            <p className="absolute top-[-10px] h-[25px] w-[25px] flex items-center justify-center rounded-[50%] bg-[red] right-0 text-white text-[15px]">{store.length || 0}</p>
                            {listStore && ListStore()}
                        </li>
                        <li className="text-[30px] px-[20px] hover:text-[red] cursor-pointer mx-[5px] rounded-lg hover:bg-[#EEFFF7]">
                            <FontAwesomeIcon icon={faUser} />
                        </li>
                    </ul>
                </div>
                
                <div className={`h-[50px] w-full bg-[black] flex items-center justify-center transition-transform duration-700 ${isVisible ? 'translate-y-0' : 'translate-y-[50px]'}`}>
                    <div className="flex items-center text-[20px] h-full relative w-[1400px] justify-center">
                            <div className="flex items-center w-[300px] absolute left-0 h-full  bg-[#15A78A] group">
                                <i className="px-[15px] rounded-lg">
                                    <FontAwesomeIcon className="text-[white] font-bold" icon={faList} />
                                    <label className="text-white font-normal px-[10px]" style={{ fontStyle: 'normal' }}>Danh mục sản phẩm</label>
                                </i>
                                <ul className="absolute bg-white left-0 w-[300px] text-[23px] top-[50px] px-[15px] items-center hidden group-hover:block">
                                    {listCategory}
                                </ul>
                            </div>
                            <ul className="text-white flex text-[20px]">
                                <li className="px-[10px] hover:text-[#15A78A] cursor-pointer">HOME <FontAwesomeIcon icon={faChevronDown} /></li>
                                <li className="px-[10px] hover:text-[#15A78A] cursor-pointer">SHOP <FontAwesomeIcon icon={faChevronDown} /></li>
                                <li className="px-[10px] hover:text-[#15A78A] cursor-pointer">PRODUCT <FontAwesomeIcon icon={faChevronDown} /></li>
                                <li className="px-[10px] hover:text-[#15A78A] cursor-pointer">BLOG <FontAwesomeIcon icon={faChevronDown} /></li>
                            </ul>
                            <p className="absolute right-0 text-white font-bold pl-[30px] border-l-2 border-white">Clearance Up to 30% Off</p>
                        </div>
                </div>
            </header>
        </div>
    );
}


