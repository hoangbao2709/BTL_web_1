import Modal from "../pages/helper/modal";
import { useState, useEffect, use } from "react";
import { Data } from "./getData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
import { useLocation } from 'react-router-dom';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import PaginationHelper from "./../pages/Admin/pagination";
import Search from "./search";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Post() {
    const [submittedName, setSubmittedName] = useState('');
    const [submittedGia_goc, setSubmittedGia_goc] = useState('');
    const [submittedGiam_gia, setSubmittedGiam_gia] = useState('');
    const [submittedTap, setSubmittedTap] = useState('');
    const [submittedTac_gia, setSubmittedTac_gia] = useState('');
    const [submittedDoi_tuong, setSubmittedDoi_tuong] = useState('');
    const [submittedKhuon_kho, setSubmittedKhuon_kho] = useState('');
    const [submittedSo_trang, setSubmittedSo_trang] = useState('');
    const [submittedTrong_luong, setSubmittedTrong_luong] = useState('');
    const [action, setAction] = useState(false);
    const [active, setActive] = useState(false);
    const [edit, setEdit] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [InActive, setInActive] = useState(false);
    const [All, setAll] = useState(false);
    const [Use, setUse] = useState("Bulk Action");
    const [status, setStatus] = useState(false);
    const [data, setData] = useState([]);
    let fetchedData = null;
    const [Link, setLink] = useState("/admin/post/All");
    const [open, setOpen] = useState([false, false, false]);
    const [checkedItems, setCheckedItems] = useState(Array(data.length).fill(false));
    const [allChecked, setAllChecked] = useState(false);
    const [Category, setCategory] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("Tất cả sản phẩm");
    const [index, setIndex] = useState(0);
    const [ID, setID] = useState(0);
    let category = [
        "Tất cả sản phẩm",
        "Lịch sử truyền thống",
        "Văn học Việt Nam",
        "Văn học nước ngoài",
        "Kiến thức, khoa học",
        "Truyện tranh",
        "Wings Books"
    ];

    const [linkCategory, setLinkCategory] = useState(new Array(category.length).fill(false));

    let linkcategory = [
        "tat_ca_san_pham",
        "lich_su_truyen_thong",
        "van_hoc_Viet_Nam",
        "van_hoc_nuoc_ngoai",
        "kien_thuc_khoa_hoc",
        "truyen_tranh",
        "wings_book",
    ];

    const location = useLocation();
    let pathParts = location.pathname;
    pathParts = pathParts.split("/");
    pathParts = pathParts[pathParts.length - 1];

    if (pathParts === "post" || pathParts === "All") {
        fetchedData = Data(linkcategory[index], "All")
    } else if (pathParts === "Active") {
        fetchedData = Data(linkcategory[index], "Active")
    } else if (pathParts === "InActive") {
        fetchedData = Data(linkcategory[index], "InActive")
    }

    useEffect(() => {
        if (fetchedData) {
            setData(fetchedData);
        }
    }, [fetchedData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") setSubmittedName(value);
        if (name === "gia_goc") setSubmittedGia_goc(value);
        if (name === "giam_gia") setSubmittedGiam_gia(value);
        if (name === "tap") setSubmittedTap("Tập: " + value);
        if (name === "tac_gia") setSubmittedTac_gia(value);
        if (name === "doi_tuong") setSubmittedDoi_tuong(value);
        if (name === "khuon_kho") setSubmittedKhuon_kho(value);
        if (name === "so_trang") setSubmittedSo_trang(value);
        if (name === "trong_luong") setSubmittedTrong_luong(value + " gram");
    };

    function handleAction() {
        setAction(!action);
    }

    function HandleActive() {
        if (edit) {
            setCheckedItems(Array(data.length).fill(false));
        }
        setActive(true);
        setInActive(false);
        setEdit(false);
        setDelete(false);
        setAction(false);
        setAll(false);
        setUse("Active");
        setLink("/admin/post/Active");
    }

    function HandleInActive() {
        if (edit) {
            setCheckedItems(Array(data.length).fill(false));
        }
        setActive(false);
        setInActive(true);
        setEdit(false);
        setDelete(false);
        setAction(false);
        setAll(false);
        setUse("InActive");
        setLink("/admin/post/InActive");
    }

    function HandleEdit() {
        setCheckedItems(Array(data.length).fill(false));
        setActive(false);
        setInActive(false);
        setEdit(true);
        setDelete(false);
        setAction(false);
        setAll(false);
        setUse("Edit");
    }

    function HandleDelete() {
        if (edit) {
            setCheckedItems(Array(data.length).fill(false));
        }
        setActive(false);
        setInActive(false);
        setEdit(false);
        setDelete(true);
        setAction(false);
        setAll(false);
        setUse("Delete");
        setLink("/admin/post/Delete");
    }

    function HandleAll() {
        if (edit) {
            setCheckedItems(Array(data.length).fill(false));
        }
        setActive(false);
        setInActive(false);
        setEdit(false);
        setDelete(false);
        setAction(false);
        setAll(true);
        setUse("All");
        setLink("/admin/post/All");
    }

    function HandleCategory() {
        setCategory(!Category);
    }

    function HandleCurrentCategory(index) {
        setCurrentCategory(category[index]);

        setLinkCategory(prevState => {
            const newState = new Array(category.length).fill(false);
            newState[index] = true;
            return newState;
        });
    }

    const handleCheckboxChange = (index, results) => {
        setCheckedItems(prevCheckedItems => {
            const newCheckedItems = [...prevCheckedItems];
            newCheckedItems[index] = !newCheckedItems[index];
            return newCheckedItems;
        });
        if(Use === "Edit"){
            setCheckedItems(Array(results.length).fill(false));
            setLink("/admin/post/edit/" + results[index].id);
        }
    };

    const handleCheckAll = () => {
        const newCheckedItems = Array(data.length).fill(!allChecked);
        setCheckedItems(newCheckedItems);
        setAllChecked(!allChecked);
    };

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ';
    }

    const handleStatusChange = (id) => {
        if (data !== null) {
            const updatedData = data.map((element) => {
                if (element.id === id) {
                    const newStatus = element.Status === "Active" ? "Inactive" : "Active";
                    fetch(`https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/setStatus.php?&url=${encodeURIComponent(element.Page)}&variable=${encodeURIComponent(newStatus)}&id=${encodeURIComponent(id)}`)
                        .then((response) => response.json())
                        .then((data) => {
                        })
                        .catch((error) => {
                            console.error("Error fetching data:", error);
                        });
                    return { ...element, Status: newStatus };
                }
                return element;
            });
            setData(updatedData);
        }
    };

    const toggleModal = (index) => {
        setOpen(prevOpen => {
            const newOpen = [...prevOpen];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });
    };

    function getHTML() {
        if (Array.isArray(data) && data.length > 0) {
            return (
                <PaginationHelper
                    data={data}
                    checkedItems={checkedItems}
                    handleCheckboxChange={handleCheckboxChange}
                    formatPrice={formatPrice}
                    handleStatusChange={handleStatusChange}
                    toggleModal={toggleModal}
                    open={open}
                    edit={edit}
                    setID={setID}
                    results={data}
                />
            );
        } else {
            return <p>No data available</p>;
        }
    }
    const result = getHTML();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);
    };

    function navigateTo(url) {
        window.location.href = url;
    }

    function HandleApply() {
        if (Use === "All") {
            navigateTo(Link);
        } else if (Use === "Active") {
            navigateTo(Link);
        } else if (Use === "InActive") {
            navigateTo(Link);
        } else if (Use === "Edit") {
            navigateTo(Link);
        } else if (Use === "Delete") {
            for (let index = 0; index < checkedItems.length; index++) {
                if (checkedItems[index] === true) {
                    try {
                        const response = fetch(`https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/delete.php?&id=${encodeURIComponent(data[index].id)}`);
                        const result = response.json();
                    } catch (error) {
                        console.error("Error deleting item:", error);
                    }
                }
            }
            window.location.reload();
        }
    }

    const listCategory = category.map((element, index) => {
        const handleClick = (event) => {
            HandleCurrentCategory(index);
            setIndex(event.currentTarget.getAttribute('data-key'));
        };

        const handleCategory = () => {
            setCategory(false);
        };

        return (
            <li
                key={index}
                data-key={index}
                onClick={(event) => {
                    handleCategory();
                    handleClick(event);
                }}
                class="cursor-pointer rounded-lg pt-[5px] bg-white hover:text-[red] relative group"
            >
                <div className="flex items-center p-[10px]">
                    <FontAwesomeIcon icon={faBook} />
                    <p className="pl-[5px] ml-[10px]">{element}</p>
                </div>
                <div className="relative w-full h-1 bg-white">
                    <div className="absolute left-0 bottom-0 h-full w-0 bg-[red] transition-all duration-700 ease-in-out group-hover:w-full"></div>
                </div>
            </li>
        );
    });

    const [input, SecrchResult, results] = Search(fetchedData, checkedItems, handleCheckboxChange, formatPrice, handleStatusChange, toggleModal, open, edit, setID);

    return (
        <form className="container mx-auto" action="http://localhost:8000/input.php" method="post" onSubmit={handleSubmit}>
            <header className="flex"><p className="text-[70px] font-serif">List Item</p></header>
            <div>
                <p className="bg-[#D9EDF7] py-[15px] pl-[15px] rounded-t-lg flex">List Items</p>
                <div className="border-x-4 border-b-4 pb-[20px] px-[20px] rounded-b-lg border-[#D9EDF7]">
                    <div className="flex h-[80px] items-center relative ">
                        <div className={`flex w-[114px] h-[40px] items-center cursor-pointer transition-transform absolute duration-700 ease-in-out ${action ? "translate-x-[115px] hover:scale-110 " : "-translate-x-[0px] "}`} onClick={HandleAll}>
                            <p href="/admin/post/All" className="w-[100px] m-[10px] z-0 flex h-full justify-center items-center text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                All
                            </p>
                        </div>
                        <div className={`flex w-[114px] h-[40px] items-center cursor-pointer transition-transform absolute duration-700 ease-in-out ${action ? "translate-x-[230px] hover:scale-110 " : "-translate-x-[0px] "}`} onClick={HandleActive}>
                            <p className="w-[100px] m-[10px] z-0 flex h-full justify-center items-center text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Active
                            </p>
                        </div>
                        <div className={`flex w-[114px] h-[40px] cursor-pointer items-center transition-transform absolute duration-700 ease-in-out ${action ? "translate-x-[345px] hover:scale-110 " : "-translate-x-[0px]"}`} onClick={HandleInActive}>
                            <p className={`w-[100px] m-[10px] z-0 flex h-full justify-center items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}>
                                InActive
                            </p>
                        </div>
                        <div className={`flex w-[114px] h-[40px] cursor-pointer items-center transition-transform absolute duration-700 ease-in-out ${action ? "translate-x-[460px] hover:scale-110 " : "-translate-x-[0px]"} `} onClick={HandleEdit}>
                            <p className={`w-[100px] m-[10px] z-0 flex h-full justify-center items-center focus:outline-none text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}>
                                Edit
                            </p>
                        </div>
                        <div className={`flex w-[114px] h-[40px] cursor-pointer items-center transition-transform absolute duration-700 ease-in-out ${action ? "translate-x-[575px] hover:scale-110" : "-translate-x-[0px]"}`} onClick={HandleDelete}>
                            <p className={`w-[100px] m-[10px] z-0 flex h-full justify-center items-center focus:outline-none text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}>
                                Delete
                            </p>
                        </div>
                        <div className={`flex w-[114px] h-[40px] cursor-pointer items-center transition-transform absolute duration-700 ease-in-out ${!action ? "translate-x-[115px] hover:scale-110" : "-translate-x-[0px]"}`} onClick={HandleApply}>
                            <p className={`w-[100px] m-[10px] z-0 flex h-full justify-center items-center focus:outline-none text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}>
                                Apply
                            </p>
                        </div>
                        <div className={`hover:scale-110 m-[10px] h-[42px]  w-[100px] flex relative cursor-pointer items-center justify-center  ${Use === "Bulk Action" && "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm  text-center "}
                                                                                                                                            ${Use === "Active" && "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}
                                                                                                                                            ${Use === "InActive" && "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}
                                                                                                                                            ${Use === "Edit" && "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}
                                                                                                                                            ${Use === "Delete" && "text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}
                                                                                                                                            ${Use === "All" && "text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}
                        `} onClick={handleAction}>
                            <p>{Use}</p>
                        </div>
                        <i onClick={HandleCategory} className="absolute  w-[400px] text-[#009981] flex items-center right-[0] px-[15px] py-[10px] rounded-lg hover:bg-[#EEFFF7] hover:text-[black]">
                            <FontAwesomeIcon className="text-[30px] font-bold" icon={faList} />
                            <label className="text-[30px] font-bold px-4">{currentCategory}</label>
                        </i>
                        {Category &&
                            <ul className="absolute z-50 shadow-lg right-[0px] border bg-white top-[90px] bold w-[400px] rounded-lg text-[30px] items-center">
                                {listCategory}
                            </ul>
                        }
                        <div
                            className={`w-[1000px] items-center justify-center flex transition-opacity duration-300 ease-in-out ${
                                !action ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                            >
                        {input}
                        </div>
                    </div>
                    <ul className="flex py-[20px] text-[20px] shadow-lg border rounded-t-lg ">
                        <li className="w-[2%] px-[2%]"><input type="checkbox" disabled={edit} className="size-4 cursor-pointer" onClick={() => handleCheckAll()} /></li>
                        <li className="w-[5%] px-[2%]">ID</li>
                        <li className="w-[30%] px-[2%]">Name</li>
                        <li className="w-[13%]">Giá gốc</li>
                        <li className="w-[10%] px-[2%]">Giá</li>
                        <li className="w-[10%] px-[2%]">Giảm giá</li>
                        <li className="w-[10%] px-[5%]">Status</li>
                        <li className="w-[10%] ml-[8%]" >Thêm</li>
                    </ul>
                    {results.length > 0 ? SecrchResult : result}
                </div>
            </div>
        </form>
    );
}