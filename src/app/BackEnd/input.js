import { useState, useRef } from "react";
import $ from "jquery";
import Modal from "../pages/helper/modal";
import "./css/style.css";

export function Input() {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [result, setResult] = useState("");

    const [final, setFullfinal] = useState({
        Kien_thuc_khoa_hoc: false,
        Lich_su_truyen_thong: false,
        Tat_ca_san_pham: false,
        Truyen_tranh: false,
        Van_hoc_nuoc_ngoai: false,
        Van_hoc_Viet_Nam: false,
        Wings_book: false
    })

    const [item, setFullitem] = useState({
        id: '',
        name: '',
        gia_goc: '',
        gia: '',
        giam_gia: '',
        link: '',
        Kien_thuc_khoa_hoc: false,
        Lich_su_truyen_thong: false,
        Tat_ca_san_pham: false,
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

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setResult(data);
            },
        });
        const formData = new FormData();
        formData.append('file', file);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8000/input.php", true);
        xhttp.send(formData);
    };

    const [file, setFile] = useState(null);
    const inputRef = useRef(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            const fileObj = droppedFiles[0];
            setFile(fileObj);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleBrowseClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (

        <div className="w-[100%]  h-screen flex content-center justify-center">
            <form className="w-[80%] content-center" action="http://localhost:8000/input.php" method="post" onSubmit={handleSubmit}>
                <div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                            <input type="text" id="id" name="id" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ID" />
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" />
                        </div>
                        <div>
                            <label htmlFor="gia_goc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá gốc</label>
                            <input type="text" id="gia_goc" name="gia_goc" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Giá gốc" />
                        </div>
                        <div>
                            <label htmlFor="gia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
                            <input type="text" id="gia" name="gia" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Giá" />
                        </div>
                        <div>
                            <label htmlFor="giam_gia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giảm giá</label>
                            <input type="text" id="giam_gia" name="giam_gia" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Giảm giá" />
                        </div>
                        <div>
                            <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL</label>
                            <input type="text" id="link" name="link" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Link" />
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5">Submit</button>
                    <h1>{result}</h1>
                    <button type="button" onClick={() => setOpen(true)} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-[25px]">
                        Thêm vào những trang mà bạn muốn
                    </button>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="content-center w-[500px] mt-[30px] flex">
                            <ul className="w-[500px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {Object.keys(final).filter(key => key.startsWith("Kien_thuc") || key.startsWith("Lich_su") || key.startsWith("Tat_ca") || key.startsWith("Truyen") || key.startsWith("Van_hoc") || key.startsWith("Wings")).map((key) => (
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
                                            {final[key] ? (
                                                <>
                                                    <button onClick={() => setOpen1(true)} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                                        Blue
                                                    </button>
                                                    <Modal open={open1} onClose={() => setOpen1(false)}>
                                                        <div className="h-[200px] w-[200px] bg-white">
                                                            <button onClick={() => setOpen1(false)} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                                                Blue
                                                            </button>
                                                        </div>
                                                    </Modal>
                                                </>
                                            ) : null}
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
                            }} type="button" className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                Accept
                            </button>
                            <button onClick={() => {
                                setOpen(false)
                                Object.keys(item).slice(6).forEach((key, index) => {
                                    item[key] = false;
                                    final[key] = false;
                                    console.log(`Index: ${index}, Key: ${key}, Value: ${item[key]}`);
                                });
                            }} type="button" className="w-full text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                Cancel
                            </button>
                        </div>
                    </Modal>
                    <div
                        className="drag-area"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <div className="icon"><i className="fas fa-cloud-upload-alt"></i></div>
                        <header className="text-white">Drag & Drop to Upload File</header>
                        <span className="text-white">OR</span>
                        <div className="button m-[20px]" onClick={handleBrowseClick}>Browse Image</div>
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleFileChange}
                            hidden
                        />
                        {file && <p>File: {file.name}</p>}
                    </div>
                </div>
            </form>
        </div>

    );
}