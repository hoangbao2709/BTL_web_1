import Modal from "../pages/helper/modal";
import { useState, useEffect } from "react";
import { useData } from "./getData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";

export function Post() {
    const [open, setOpen] = useState(false);
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
    const [checked, setChecked] = useState(false);
    const [status, setStatus] = useState(false);
    const [data, setData] = useState([]);
    const fetchedData = useData("kien_thuc_khoa_hoc"); 
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
        setActive(true);
        setInActive(false);
        setEdit(false);
        setDelete(false);
        setAction(false);
        setAll(false);
        setUse("Active");
    }

    function HandleInActive() {
        setActive(false);
        setInActive(true);
        setEdit(false);
        setDelete(false);
        setAction(false);
        setAll(false);
        setUse("InActive");
    }

    function HandleEdit() {
        setActive(false);
        setInActive(false);
        setEdit(true);
        setDelete(false);
        setAction(false);
        setAll(false);
        setUse("Edit");
    }

    function HandleDelete() {
        setActive(false);
        setInActive(false);
        setEdit(false);
        setDelete(true);
        setAction(false);
        setAll(false);
        setUse("Delete");
    }

    function HandleAll() {
        setActive(false);
        setInActive(false);
        setEdit(false);
        setDelete(false);
        setAction(false);
        setAll(true);
        setUse("All");
    }

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ';
    }

    const handleStatusChange = (id) => {
        const updatedData = data.map((element) => {
            if (element.id === id) {
                return { ...element, Status: element.Status === "Active" ? "Inactive" : "Active" };
            }
            return element;
        });
        setData(updatedData);
    };

    function getHTML(test) {
        return data.map((element, index) => (
            <ul className={`flex text-[20px] py-2 ${index % 2 === 0 ? "bg-[#E0E3E7]" : ""}`} key={element.id}>
                <li className="w-[2%] px-[2%]">
                    {!test && (<input type="checkbox" />)}
                    {test && (<input type="checkbox" checked />)}
                </li>
                <li className="w-[5%] px-[2%]">{element.id}</li>
                <li className="w-[30%] px-[2%]">{element.name}</li>
                <li className="w-[13%]">{formatPrice(element.gia_goc)}</li>
                <li className="w-[10%] px-[1.5%]">{formatPrice(element.gia)}</li>
                <li className="w-[10%] flex items-center justify-center">{element.giam_gia}</li>
                <li 
                    className={`w-[8%] cursor-pointer ml-[3%] rounded-lg flex items-center justify-center ${element.Status === "Active" ? "bg-[#5CB85C]" : "bg-[#ED9C28]"}`} 
                    onClick={() => handleStatusChange(element.id)} // Thêm sự kiện nhấn
                >
                    {element.Status}
                </li>
                <li className="w-[10%] pl-[7.5%] flex items-center justify-center">
                    <FontAwesomeIcon className="size-7" icon={faBars} />
                </li>
            </ul>
        ));
    }
    const result = getHTML(checked);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);

        
    };

    return (
        <form className="mt-[70px] container mx-auto" action="http://localhost:8000/input.php" method="post" onSubmit={handleSubmit}>
            <header className="flex"><p className="text-[70px] font-serif">Edit Item</p></header>
            <div>
                <p className="bg-[#D9EDF7] py-[15px] pl-[15px] rounded-t-lg flex">List Items</p>
                <div className="border-x-4 border-b-4 pb-[20px] px-[20px] rounded-b-lg border-[#D9EDF7]">
                <div className="flex h-[80px] items-center ">
                    <div className={`flex w-[114px] h-[40px] items-center cursor-pointer transition-transform absolute duration-700 ease-in-out ${action ? "translate-x-[115px] hover:scale-110 " : "-translate-x-[0px] "}`} onClick={HandleActive}>
                        <p className="w-[100px] m-[10px] z-0 flex h-full justify-center items-center text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
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
                    <div className={`flex w-[114px] h-[40px] cursor-pointer items-center transition-transform absolute duration-700 ease-in-out ${!action ? "translate-x-[115px] hover:scale-110" : "-translate-x-[0px]"}`} >
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
                </div>
                <ul className="flex py-[20px] text-[20px]">
                    <li className="w-[2%] px-[2%]"><input type="checkbox" onClick={() => setChecked(!checked)} /></li>
                    <li className="w-[5%] px-[2%]">ID</li>
                    <li className="w-[30%] px-[2%]">Name</li>
                    <li className="w-[13%]">Giá gốc</li>
                    <li className="w-[10%] px-[2%]">Giá</li>
                    <li className="w-[10%] px-[2%]">Giảm giá</li>
                    <li className="w-[10%] px-[5%]">Status</li>
                    <li className="w-[10%] ml-[8%]">Thêm</li>
                </ul>
                {result}
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ul className="flex">
                        <li className="w-[5%] px-[2%]">Tập</li>
                        <li className="w-[10%] px-[2%]">Tác giả</li>
                        <li className="w-[10%] px-[2%]">Đối tượng</li>
                        <li className="w-[10%] px-[2%]">Khuôn khổ</li>
                        <li className="w-[10%] px-[2%]">Số trang</li>
                        <li className="w-[10%] px-[2%]">Trọng lượng</li>
                    </ul>
                </Modal>
                </div>
            </div>
        </form>
    );
}