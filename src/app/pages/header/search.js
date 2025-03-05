import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; // Corrected import

class Node {
    constructor() {
        this.Max = 256;
        this.children = new Array(this.Max).fill(null);
        this.countWord = 0;
        this.result = [];
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
        this.newRoot = new Node();
    }

    addWord(word) {
        let currentNode = this.root;
        let tempword = word;
        tempword = tempword.toLowerCase();
        tempword = removeAccents(tempword);
        console.log(tempword);
        for (let char of tempword) {
            const index = char.charCodeAt(0);
            console.log(index);
            if (!currentNode.children[index]) {
                const x = new Node();
                currentNode.children[index] = x;
            }
            currentNode = currentNode.children[index];
            if (!currentNode.result.includes(word)) {
                currentNode.result.push(word);
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

        this.collectWords(currentNode, result);
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
trie.addWord('Hoàng Thanh Chí Bảo');
trie.addWord('á');
trie.addWord('ắ');
// trie.addWord('Hoàng Thanh  Bảo');
// trie.addWord('hellooo');
// trie.addWord('Hoàng Thanh Chí Bảo');

export function Search() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [results, setResults] = React.useState([]);

    function test(event) {
        const { value } = event.target;
        setSearchTerm(value);
        const foundWords = trie.findWord(value);
        setResults(foundWords);
    }

    return (
        <div >
            <div className='flex items-center rounded-lg bg-white mr-[20px]'>
                <input
                    onKeyUp={test}
                    type="text"
                    className="form-control py-2 outline-none rounded-[10px] w-[440px] pl-[20px] text-[20px] mr-[10px]"
                    name="name"
                    placeholder="Tìm kiếm sản phẩm"
                />
                <button className='flex px-[20px] cursor-pointer py-2 rounded-r-lg border-l-2 border-collapse hover:bg-[#EEFFF7] '>
                    <li className="text-[20px]"><FontAwesomeIcon icon={faMagnifyingGlass} /></li>
                    <label className='ml-[20px] cursor-pointer'>Tìm kiếm</label> 
                </button>
            </div>
            <div className='flex absolute z-20 w-[440px] bg-white mt-[10px] rounded-lg'>
                {results.length > 0 && (
                    <ul className="pl-[20px] results-list text-[20px] ">
                        {results.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}