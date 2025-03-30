import { useState, useRef, useEffect } from "react";
import $ from "jquery";
import Modal from "../pages/helper/modal";
import "./css/style.css";
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { Minus } from "react-feather";
import { Data } from "./getData";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import Task from "./image";
import {
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { CSS } from "@dnd-kit/utilities";
import "./css/Task.css";

export default function Input() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [edit, setEdit] = useState(false);
    const [submittedName, setSubmittedName] = useState('');
    const [submittedGia_goc, setSubmittedGia_goc] = useState('');
    const [submittedGiam_gia, setSubmittedGiam_gia] = useState('');
    const [submittedTap, setSubmittedTap] = useState('');
    const [submittedTac_gia, setSubmittedTac_gia] = useState('');
    const [submittedDoi_tuong, setSubmittedDoi_tuong] = useState('');
    const [submittedKhuon_kho, setSubmittedKhuon_kho] = useState('');
    const [submittedSo_trang, setSubmittedSo_trang] = useState('');
    const [submittedTrong_luong, setSubmittedTrong_luong] = useState('');
    let data = null;
    const chillSwiperRef = useRef(null);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(3);
    const swiperRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [id, setID] = useState();

    data = Data("tat_ca_san_pham", "All")
    useEffect(() => {
        if (data) {
            setID(data.length > 0 ? data[data.length - 1].id + 1 : 1);
        }
    }, [data]);

    const rating = 4;
    const [final, setFullfinal] = useState({
        Kien_thuc_khoa_hoc: false,
        Lich_su_truyen_thong: false,
        Tat_ca_san_pham: false,
        Truyen_tranh: false,
        Van_hoc_nuoc_ngoai: false,
        Van_hoc_Viet_Nam: false,
        Wings_book: false
    });

    const [item, setFullitem] = useState({
        id: '',
        name: '',
        gia_goc: '',
        gia: '',
        giam_gia: '',
        link: '',
        Kien_thuc_khoa_hoc: false,
        Lich_su_truyen_thong: false,
        Truyen_tranh: false,
        Van_hoc_nuoc_ngoai: false,
        Van_hoc_Viet_Nam: false,
        Wings_book: false
    });

    const handleChangeNew = (event) => {
        const { name, checked } = event.target;
        if (name in item) {
            setFullfinal((prev) => ({
                ...prev,
                [name]: checked,
            }));
        }
    };

    const handleEdit= () => {
        setEdit(!edit);
    };

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ';
    }
    function formatGram(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        if (name === "name") setSubmittedName(value);
        if (name === "gia_goc") setSubmittedGia_goc(value);
        if (name === "giam_gia") setSubmittedGiam_gia(value);
        if (name === "tap") setSubmittedTap("Tập: " + value);
        if (name === "tac_gia") setSubmittedTac_gia(value);
        if (name === "doi_tuong") setSubmittedDoi_tuong(value);
        if (name === "khuon_kho") setSubmittedKhuon_kho(value);
        if (name === "so_trang") setSubmittedSo_trang(value);
        if (name === "trong_luong") setSubmittedTrong_luong(value + " gram");

        if (type === "checkbox") {
            setFullitem((prev) => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFullitem((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const [files, setFiles] = useState([]);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        const formData = new FormData(form[0]);
        for (let i = 0; i < files.length; i++) {
            formData.append('file[]', files[i].title);
        }
    
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: formData,
            processData: false,
            contentType: false,
            success(data) {
                if (data.success) {
                    setID(id + 1);
                    // alert(data.message); 
                } else {
                    alert(data.message); 
                }
            },
        });
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        const fileTemp = Array.from(droppedFiles);

        if (fileTemp.length > 0) {
            const image = [];
            if (fileTemp.length > 0) {
                fileTemp.map((element, index) => {
                    setFiles(prevFiles => [
                        ...prevFiles,
                        { id: index, title: element }
                    ]);
                })
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleBrowseClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            const image = [];
            if (selectedFiles.length > 0) {
                selectedFiles.map((element, index) => {
                    setFiles(prevFiles => [
                        ...prevFiles,
                        { id: index, title: element }
                    ]);
                })
            }
        }
    };

    const handleMinus = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const getTaskPos = (id) => files.findIndex((task) => task.id === id);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id === over.id) return;

        setFiles((tasks) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);

            return arrayMove(tasks, originalPos, newPos);
        });
    };

    function handleUp() {
        if (files.length > 0 && from + to < files.length) {
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

    function HandleClick(index) {
        setIndex(index);
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    }

    return (
        <div className="w-[100%] lg justify-center content-center relative flex h-screen">
            <form className="w-[20%] z-10 content-center" action={"http://localhost:8000/input.php"} method="post" onSubmit={handleSubmit}>
                <div>
                    <div className="grid mb-10">
                        <div className="mb-2">
                            <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">ID</label>
                            <input type="text" id="id" name="id" defaultValue={id} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ID" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="tap" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Tập</label>
                            <input type="text" id="tap" name="tap" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tập" />
                        </div>
                        <div className="flex">
                            <div type="button" onClick={() => setOpen2(true)} className="cursor-pointer w-[50%] mr-[5px] text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm text-center px-3 py-2.5 mt-[25px]">
                                Thêm thông tin sản phẩm
                            </div>
                            <div type="button" onClick={() => setOpen(true)} className="cursor-pointer w-[50%] flex justify-center content-center ml-[5px] text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm text-center py-2.5 mt-[25px]">
                                <p className="h-full flex items-center justify-center">Chọn trang thêm</p>
                            </div>
                        </div>
                        <button type="submit" className="w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-[25px]">
                            Submit
                        </button>
                    </div>
                    <Modal open={open2} onClose={() => setOpen2(false)}>
                        <div className="z-10 w-[400px]">
                            <div className="mb-2">
                                <label htmlFor="tac_gia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tác giả</label>
                                <input type="text" id="tac_gia" name="tac_gia" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tác giả" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="doi_tuong" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Đối tượng</label>
                                <input type="text" id="doi_tuong" name="doi_tuong" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Đối tượng" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="khuon_kho" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Khuôn khổ</label>
                                <input type="text" id="khuon_kho" name="khuon_kho" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Khuôn khổ" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="so_trang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số trang</label>
                                <input type="text" id="so_trang" name="so_trang" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Số trang" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="trong_luong" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trọng lượng</label>
                                <input type="text" id="trong_luong" name="trong_luong" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Trọng lượng" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="gia_goc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá gốc</label>
                                <input type="text" id="gia_goc" name="gia_goc" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Giá gốc" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="giam_gia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giảm giá</label>
                                <input type="text" id="giam_gia" name="giam_gia" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Giảm giá" />
                            </div>
                        </div>
                    </Modal>

                    <Modal className="z-10" open={open} onClose={() => setOpen(false)}>
                        <div className=" content-center z-10 w-[500px] mt-[30px] flex">
                            <ul className="w-[500px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-black">
                                {Object.keys(final).filter(key => key.startsWith("Kien_thuc") || key.startsWith("Lich_su") || key.startsWith("Truyen") || key.startsWith("Van_hoc") || key.startsWith("Wings")).map((key) => (
                                    <li key={key} className="w-full border-b border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center ps-3 h-[50px]">
                                            <input
                                                type="checkbox"
                                                id={key}
                                                name={key}
                                                checked={final[key]}
                                                onChange={handleChangeNew}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label htmlFor={key} className="w-[70%] py-3 ms-2 text-[25px] font-medium text-gray-900 dark:text-gray-300">
                                                {key.replace(/_/g, ' ').toUpperCase()}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-[20px]">
                            <button onClick={() => {
                                setOpen(false);
                                Object.entries(final).forEach(([key, value], index) => {
                                    item[key] = final[key];
                                });
                            }} type="button" className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-5">
                                Accept
                            </button>
                            <button onClick={() => {
                                setOpen(false)
                                Object.keys(item).slice(6).forEach((key, index) => {
                                    item[key] = false;
                                    final[key] = false;
                                });
                            }} type="button" className="w-full text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                Cancel
                            </button>
                        </div>
                    </Modal>
                    <div
                        className="drag-area shadow-2xl border-2 border-[#DDDDDD] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-white hover:bg-white relative fix"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <div className="icon"><i className="fas fa-cloud-upload-alt"></i></div>
                        <header className="bold">Drag & Drop to Upload File</header>
                        <span className="bold">OR</span>
                        <div className="button m-[20px]" onClick={handleBrowseClick}>Browse Image</div>
                        <input
                            type="file"
                            name="file"
                            ref={inputRef}
                            onChange={handleFileChange}
                            hidden
                            multiple
                        />
                        {files && <p>File: {files.name}</p>}
                    </div>
                </div>
            </form>
            <div className="w-[70%] ml-[2%] z-0 flex justify-center items-center bg-">
                <div className="w-[10%] h-[715px]">
                <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="relative">
                            <SortableContext items={files} strategy={verticalListSortingStrategy}>
                                <Swiper
                                    modules={[Scrollbar]}
                                    spaceBetween={30}
                                    slidesPerView={3}
                                    scrollbar={{ draggable: true }}
                                    direction="vertical"
                                    style={{ height: '600px' }}
                                    allowTouchMove={false}
                                    onSwiper={(swiper) => (chillSwiperRef.current = swiper)}
                                >
                                    {files.length > 0 ? 
                                        <div className="flex w-full absolute top-0 z-20 cursor-pointer justify-center" onClick={handleDown}>
                                            <FontAwesomeIcon className="flex justify-center items-center text-white bottom-0 h-[30px] w-[30px] cursor-pointer bg-opacity-50 bg-[red]" icon={faChevronUp} />
                                        </div>    
                                        : <div></div>
                                    }

                                    {files.map((image, ind) => {
                                        return (
                                            <SwiperSlide  className="cursor-pointer" onClick={() => HandleClick(ind)}>
                                                {edit ? 
                                                    <Task  key={image.id} id={image.id} title={image} handleClick={HandleClick} index={ind}/>:
                                                    <img className="w-full h-auto  object-contain " src={URL.createObjectURL(image.title)} alt={`Slide ${index + 1}`} />
                                                    
                                                }  
                                            </SwiperSlide>
                                        );
                                    })}
                                    {files.length > 0 ? 
                                        <div className="flex w-full z-50 absolute bottom-0 justify-center" onClick={handleUp}>
                                            <FontAwesomeIcon className="flex justify-center items-center text-white bottom-0 h-[30px] w-[30px] cursor-pointer bg-opacity-50 bg-[red]" icon={faChevronDown} />
                                        </div>
                                        : <div></div>
                                    }
                                </Swiper>
                            </SortableContext>
                        </div>
                    </DndContext>
                    {files.length > 0 ? 
                        <div class={`inline-flex items-center justify-center rounded-lg mt-[20px] cursor-pointer h-[50px] w-full bg-[#77CBDE] ${edit ? "bg-[#FF5555] text-[white]" : ""}`} onClick={handleEdit}>
                            <span class="w-full inline-flex items-center justify-center text-[20px] font-medium ">
                                {edit ? "Edit Image" : "Show Image" }
                            </span>
                        </div>
                        : <div></div>
                    }
                </div>
                <div className="z-0  w-[500px] relative overflow-hidden fix border  p-0 m-0 ml-[25px] mr-[25px]">
                    <div className="relative h-[715px] w-[500px]">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            navigation={true}
                            modules={[Navigation]}
                            className="w-100% h-[715px]"
                            onSwiper={(swiper) => (swiperRef.current = swiper)}

                        >
                            {files.map((image, index) => (
                                <SwiperSlide key={index} className="flex  relative justify-center">
                                    <div onClick={() => handleMinus(index)} className="z-10 absolute cursor-pointer top-[3%] left-[85%]">
                                        <FontAwesomeIcon className="size-10 bg-[red] rounded-[50%]" icon={faMinus} />
                                    </div>
                                    <img className="w-full h-auto  object-contain " src={URL.createObjectURL(image.title)} alt={`Slide ${index + 1}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div className="w-[45%] h-[715px] pl-[20px] rounded-3xl block relative">
                    <div className="items-center break-words">
                        {submittedName && (
                            <div className="break-words font-sans-serif">
                                <label className="text-[30px] block break-words">
                                    {submittedName}
                                </label>
                                {submittedTap && (
                                    <label className="mt-0 text-[30px] block">
                                        {submittedTap}
                                    </label>
                                )}
                                <div className="flex items-center">
                                    <div>
                                        <label className="text-[25px]">Rating: </label>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <span key={index} className={(index < rating ? "text-yellow-500" : "text-gray-400")}>
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                        ))}
                                        <label className="text-[25px]">{" | " + 10 + " đánh giá"} </label>
                                        <p className="text-[25px]">Đã bán: 100</p>
                                    </div>
                                    <label className="text-[30px] pr-[50px] absolute right-0"><FontAwesomeIcon icon={faHeart} /></label>
                                </div>
                            </div>
                        )}
                    </div>
                    {submittedGia_goc && (
                        <div>
                            <div className="border-t-2 border-black w-full my-2"></div>
                            {submittedGiam_gia && (
                                <div className="flex">
                                    <div >
                                        <label className="text-[red] text-[20px] mr-[30px]"><strong>{formatPrice(parseInt(parseInt(submittedGia_goc) - (parseInt(submittedGia_goc) * parseInt(submittedGiam_gia)) / 100))}</strong></label>
                                    </div>
                                    <div >
                                        <label className="text-gray-400 text-[20px] line-through" id="original-price"><strong>{formatPrice(parseInt(submittedGia_goc))}</strong></label>
                                    </div>
                                    <div >
                                        <label className="text-[20px] absolute right-0" id="original-price"><strong>Bạn đã tiết kiệm được {formatPrice(parseInt((parseInt(submittedGia_goc) * parseInt(submittedGiam_gia)) / 100))}</strong></label>
                                    </div>
                                </div>
                            )}
                            {!submittedGiam_gia && (
                                <div>
                                    <div className="mt-4">
                                        <label className="text-[red] text-[20px]"><strong>{formatPrice(submittedGia_goc)}</strong></label>
                                    </div>
                                </div>
                            )}
                            <div className="border-t-2 border-black w-full mt-2"></div>
                        </div>
                    )}
                    {submittedTac_gia && (
                        <li>
                            <label className="text-[20px]">Tác giả: <strong className="text-[red]">{submittedTac_gia}</strong></label>
                        </li>
                    )}
                    {submittedDoi_tuong && (
                        <li>
                            <label className="text-[20px]">Đối tượng: <strong className="text-[red]">{submittedDoi_tuong}</strong></label>
                        </li>
                    )}
                    {submittedKhuon_kho && (
                        <li>
                            <label className="text-[20px]">Khuôn khổ: <strong className="text-[red]">{submittedKhuon_kho}</strong></label>
                        </li>
                    )}
                    {submittedSo_trang && (
                        <li>
                            <label className="text-[20px]">Số trang: <strong className="text-[red]">{formatGram(submittedSo_trang)}</strong></label>
                        </li>
                    )}
                    {submittedTrong_luong && (
                        <li>
                            <label className="text-[20px]">Trọng lượng: <strong className="text-[red]">{formatGram(submittedTrong_luong)}</strong></label>
                        </li>
                    )}
                </div>
            </div>
        </div>

    );
}