class Node {
    constructor() {
        this.Max = 40; 
        this.children = new Array(this.Max).fill(null); 
        this.countWord = 0;
    }
}

class Trie {
    constructor() {
        this.root = new Node(); 
    }

    addWord(word) {
        let currentNode = this.root;
        for (let char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0); 
            console.log(index);
            if (currentNode.children[index] === null) {
                const x = new Node();
                currentNode.children[index] = x;
            }
            currentNode = currentNode.children[index];
        }
        currentNode.countWord++;
    }

    findWord(word){
        let currentNode = this.root;
        for (let char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if(currentNode === null){
                return false;
            }
            currentNode = currentNode.children[index];
        }
        return currentNode.countWord > 0;
    }
}

const trie = new Trie();
trie.addWord('hello');
trie.addWord('hellooo');

function test(event){
    const { name, value } = event.target;
    if (name === "name") console.log(trie.findWord(value));
}

export function Search(){
    return(
        <dib>
            <input
                onKeyUp={test}
                type="text"
                className="form-control border-2 border-solid rounded-[10px] w-[300px] pl-[20px] text-[20px] mr-[50px]"
                name="name"
                placeholder="Tìm kiếm sản phẩm"
            />   
        </dib>
    )
}