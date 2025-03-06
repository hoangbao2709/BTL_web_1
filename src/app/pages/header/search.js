import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Data } from './../../BackEnd/getData'

class Node {
    constructor() {
        this.Max = 256;
        this.children = new Array(this.Max).fill(null);
        this.countWord = 0;
        this.result = [];
        this.books = {}; // Sử dụng đối tượng để lưu trữ nhiều sách
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
                currentNode.books[book.id] = book; // Lưu trữ sách theo ID
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
        console.log(result);
        return result;
    }

    collectWords(node, result) {
        if (node.countWord > 0) {
            result.push(...node.result);
        }
        for (let child of node.children) {
            if (child) {
                this.collectWords(child, result);
            }
        }
    }
}

const trie = new Trie();

export function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const resultsRef = useRef();
    const data = Data("tat_ca_san_pham");
 
    data.forEach(element => {
        trie.addWord(element.name, element);
    })

    function test(event) {
        const { value } = event.target;
        setSearchTerm(value);
        const foundWords = trie.findWord(value);
        setResults(foundWords);
    }

    function handleClickOutside(event) {
        if (resultsRef.current && !resultsRef.current.contains(event.target)) {
            setResults([]);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-[80%]">
            <div className='flex items-center rounded-lg bg-white w-[100%] mr-[20px]'>
                <input
                    onKeyUp={test}
                    type="text"
                    className="form-control py-2 outline-none rounded-[10px] w-[70%] pl-[20px] text-[20px] mr-[10px]"
                    name="name"
                    placeholder="Tìm kiếm sản phẩm"
                />
                <button className='flex px-[20px] cursor-pointer w-[30%] py-2 rounded-r-lg border-l-2 border-collapse hover:bg-[#EEFFF7]'>
                    <li className="text-[20px]"><FontAwesomeIcon icon={faMagnifyingGlass} /></li>
                    <label className='ml-[20px] cursor-pointer'>Tìm kiếm</label> 
                </button>
            </div>
            <div ref={resultsRef} className='flex absolute z-20 w-[67%] bg-white mt-[10px] rounded-lg'>
                {results.length > 0 && (
                    <ul className=" results-list text-[20px] w-full">
                        {results.map((result, index) => (
                            <li className='w-full' key={index}>
                                <a className='block w-fullh-full px-4 py-2 rounded-lg hover:bg-gray-100' href={`/Product/${result.Page}/${result.id}`}>
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