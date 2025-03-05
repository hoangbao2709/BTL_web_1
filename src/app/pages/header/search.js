class Node {
    constructor() {
        this.Max = 256;
        this.children = new Array(this.Max).fill(null);
        this.countWord = 0;
        this.result = [];
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    addWord(word) {
        let currentNode = this.root;
        word = word.toLowerCase();
        for (let char of word) {
            const index = char.charCodeAt(0);
            if (!currentNode.children[index]) {
                const x = new Node();
                currentNode.children[index] = x;
                currentNode.children[index].result.push(word);
            }
            currentNode = currentNode.children[index];
        }
        currentNode.countWord++;
    }

    findWord(word) {
        let currentNode = this.root;
        for (let char of word) {
            const index = char.charCodeAt(0);
            if (currentNode === null || !currentNode.children[index]) {
                return false;
            }
            currentNode = currentNode.children[index];            
        }
        console.log(currentNode.result);
        return currentNode.countWord > 0;
    }
}

const trie = new Trie();
trie.addWord('Hoàng Thanh Chí Bảo');
trie.addWord('hellooo');

function test(event) {
    const { name, value } = event.target;
    if (name === "name") console.log(trie.findWord(value.toLowerCase()));
}

export function Search() {
    return (
        <div>
            <input
                onKeyUp={test}
                type="text"
                className="form-control border-2 border-solid rounded-[10px] w-[300px] pl-[20px] text-[20px] mr-[50px]"
                name="name"
                placeholder="Tìm kiếm sản phẩm"
            />
        </div>
    );
}
