import logoDark from "./../images/logo.webp";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons'; 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; // Corrected import
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
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

let menu = [
    "Tin tức",
    "Giới thiệu",
    // "Our Story",
    // "Blog",
    // "Contact Us"
];

let linkMenu = [

];

const listCategory = category.map((element, index) => {
    if (index !== category.length - 1) {
        return (
            <li key={index} className="border-b  border-black pt-[5px] p-[10px] bg-white hover:bg-[#F5ECD5] hover:text-[red]">
                <FontAwesomeIcon icon={faBook} />
                <a className="pl-[5] ml-[10px]" href={linkCategory[index]}>{element}</a>
            </li>
        );
    } else {
        return (
            <li key={index} className="rounded-b-lg border-b border-black pt-[5px] p-[10px] bg-white hover:bg-[#F5ECD5] hover:text-[red]">
                <FontAwesomeIcon icon={faBook} />
                <a className="pl-[%] ml-[10px]" href={linkCategory[index]}>{element}</a>
            </li>
        );
    }
});

const listMenu = menu.map((element, index) => {
    return (
        <li className="pr-[15px] pl-[15px] pt-[10px] pb-[10px] ml-[5px] mr-[5px] rounded-lg hover:bg-[#493D9E] hover:text-[white] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 ">
            <a href="">{element}</a>
        </li>
    );
});

export function Header() {
    return (
        <header className="h-[110px] pl-[100px] items-center flex relative bg-[#E0E3E7]">
            <div className="logo flex items-center ">
                <img src={logoDark} className="size-[80px] mr-[50px]" alt="" />
            </div>
            <ul className="flex items-center text-[150%] absolute left-[15%]">
                <li className="pr-[30px] danhmuc absolute pb-[28px] pt-[37px]">
                    <i className="pr-[15px] pl-[15px] pt-[10px] pb-[10px] rounded-lg hover:bg-[#493D9E] hover:text-[white] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"><FontAwesomeIcon icon={faList} /></i>
                    <ul className="category bold w-[350px] rounded-b-lg text-[30px] ">
                        {listCategory}
                    </ul>
                </li>
                {listMenu}
            </ul>
            <ul className="right-[25%] absolute flex">
                <input type="text" className="border-2 border-solid rounded-[10px] w-[300px] pl-[20px] text-[20px] mr-[50px]" placeholder="Tìm kiếm sản phẩm" />
                <li className="text-[30px] pr-[50px]"><FontAwesomeIcon icon={faMagnifyingGlass} /></li>
                <li className="text-[30px] pr-[50px]"><FontAwesomeIcon icon={faHeart} /></li>
                <li className="text-[30px]"><FontAwesomeIcon icon={faBagShopping} /> </li>
            </ul>
            <a href="#" className="p-[30px] pt-[10px] pb-[10px] bg-[black] text-[white] text-[30px] right-[3%] absolute rounded-[8px] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">Đăng Nhập</a>
            <a href="" className="p-[30px] pt-[10px] pb-[10px] text-[black] text-[30px] right-[15%] absolute rounded-[8px] transition delay-150 duration-300 ease-in-out hover:text-[white] hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">Đăng ký</a>
        </header>
    );
}
