import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBook, faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { Data } from './getData';

class Node {
    constructor() {
        this.Max = 256;
        this.children = new Array(this.Max).fill(null);
        this.countWord = 0;
        this.result = [];
        this.books = {};
    }
}

function removeAccents(str) {
    const accents = [
        { base: 'a', letters: /[áàảãạâầấẩẫậăằắẳẵặ]/g },
        { base: 'e', letters: /[éèẻẽẹêềếểễệ]/g },
        { base: 'i', letters: /[íìỉĩị]/g },
        { base: 'o', letters: /[óòỏõọôồốổỗộơờớởỡợ]/g },
        { base: 'u', letters: /[úùủũụưừứửữự]/g },
        { base: 'y', letters: /[ýỳỷỹỵ]/g },
        { base: 'd', letters: /[đ]/g }
    ];

    accents.forEach(({ base, letters }) => {
        str = str.replace(letters, base);
    });

    return str;
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    addWord(word, book) {
        let currentNode = this.root;
        let tempword = word.toLowerCase();
        tempword = removeAccents(tempword);
        
        for (let char of tempword) {
            const index = char.charCodeAt(0);
            if (!currentNode.children[index]) {
                currentNode.children[index] = new Node();
            }
            currentNode = currentNode.children[index];

            if (!currentNode.books[book.id]) {
                currentNode.result.push(word);
                currentNode.books[book.id] = book;
            }
        }
        currentNode.countWord++;
    }

    findWord(prefix) {
        let currentNode = this.root;
        let result = [];
        prefix = prefix.toLowerCase();
        prefix = removeAccents(prefix);
        
        for (let char of prefix) {
            const index = char.charCodeAt(0);
            if (!currentNode.children[index]) {
                return [];
            }
            currentNode = currentNode.children[index];
        }
    
        result = Object.values(currentNode.books);
        return result;
    }
}

const trie = new Trie();

export default function Search(item) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('Tất cả sản phẩm');
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const resultsRef = useRef();
    const resultsRef1 = useRef();

    const categories = [
        "Tất cả sản phẩm",
        "Lịch sử truyền thống",
        "Văn học Việt Nam",
        "Văn học nước ngoài",
        "Kiến thức, khoa học",
        "Truyện tranh",
        "Wings Books"
    ];

    let linkCategory = [
        "tat_ca_san_pham",
        "lich_su_truyen_thong",
        "van_hoc_Viet_Nam",
        "van_hoc_nuoc_ngoai",
        "kien_thuc_khoa_hoc",
        "truyen_tranh",
        "wings_book",
    ];
    
    const data = Data(linkCategory[index]);

    const listCategory = categories.map((element, index) => (
        <li
            key={index}
            className={`border-b border-black pt-[5px] p-[10px] bg-white hover:bg-[#F5ECD5] hover:text-[red]`}
            onClick={() => {
                setCurrentCategory(element);
                handleClick(index);
            }}
        >
            <FontAwesomeIcon icon={faBook} />
            <span className="pl-[5px] ml-[10px]">{element}</span>
        </li>
    ));

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(element => {
                if (element && element.name) {
                    trie.addWord(element.name, element);
                }
            });
        }
    }, [data]);

    const test = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        const foundWords = trie.findWord(value);
        setResults(foundWords);
    };

    const handleClickOutside = (event) => {
        if (resultsRef.current && !resultsRef.current.contains(event.target)) {
            setResults([]);
        }
        if (resultsRef1.current && !resultsRef1.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = (index) => {
        setOpen(!open);
        setIndex(index);
    };

    return (
        <div className={`${item.childWidth >= 1300 ? "w-[800px]" : "w-[600px] ml-[100px]"} z-50`}>
            <div className='flex items-center z-50 bg-[#F8F8F8] w-[100%] relative'>
                <input
                    onKeyUp={test}
                    type="text"
                    className="form-control bg-[#F8F8F8] outline-none rounded-[10px] w-[90%] pl-[20px] text-[20px] mr-[10px]"
                    name="name"
                    placeholder="Tìm kiếm sản phẩm"
                    aria-label="Tìm kiếm sản phẩm"
                />
                <ul ref={resultsRef1} className="items-center text-[15px] bold-900 cursor-pointer w-[300px]">
                    <li className="px-[15px] py-[10px] flex items-center border-l-2 border-[#8A8C91] relative" onClick={handleClick}>
                        {currentCategory}
                        <FontAwesomeIcon className={`absolute right-[10px] ${item.childWidth >= 1300 ? "" : "hidden"}`} icon={faAnglesDown} />
                    </li>
                    {open && (
                        <ul className="bold w-[200px] rounded-lg text-[15px] items-center absolute top-[50px] mt-[10px]">
                            {listCategory}
                        </ul>
                    )}
                </ul>
                <button className='flex justify-center cursor-pointer w-[10%] p-4 rounded-r-lg border-l-2 border-collapse bg-[#17AF91] hover:bg-[#15A78A]'>
                    <FontAwesomeIcon className="text-[20px]" icon={faMagnifyingGlass} />
                </button>
            </div>
            <div ref={resultsRef} className='flex absolute z-20 w-[518px] bg-white mt-[10px] rounded-lg'>
                {results.length > 0 && (
                    <ul className="results-list text-[20px] w-full">
                        {results.map((result, index) => (
                            <li className='w-full' key={index}>
                                <a className='block w-full h-full px-4 py-2 rounded-lg hover:bg-gray-100' href={`/Product/${result.Page}/${result.id}`}>
                                    {result.name}
                                </a>
                                {index !== results.length - 1 && (
                                    <div className='w-[100%] flex contain-content items-center justify-center'>
                                        <div className='w-[95%] border-b border-b-black px-4'></div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}