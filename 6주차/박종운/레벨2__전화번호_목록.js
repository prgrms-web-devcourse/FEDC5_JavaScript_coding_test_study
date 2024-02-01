class Node {
  constructor(key = "", value = null) {
    this.key = key;
    this.value = value;
    this.children = new Map();
  }
}
class Trie {
  constructor() {
    this.root = new Node();
  }
  insert(text) {
    let currentNode = this.root;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (!currentNode.children.has(char)) {
        const key = currentNode.key + char;
        const isLastWordIndex = i === text.length - 1;
        const value = isLastWordIndex ? currentNode.key + char : null;
        currentNode.children.set(char, new Node(key, value));
      }
      currentNode = currentNode.children.get(char);
    }
  }
  has(text) {
    let currentNode = this.root;
    for (const char of text) {
      currentNode = currentNode.children.get(char);
      if (currentNode === false) {
        return false;
      }
    }
    return currentNode.value === text;
  }
  autoComplete(text) {
    let currentNode = this.root;
    const children = [];

    for (const char of text) {
      currentNode = currentNode.children.get(char);
      if (currentNode === false) {
        console.log("not found node!");
        return [];
      }
    }

    function recursion(node) {
      if (node.value) {
        children.push(node.value);
      }
      if (node.children.size) {
        node.children.forEach((el) => {
          recursion(el);
        });
      }
    }
    recursion(currentNode);
    return children;
  }
}

function solution(phone_book) {
    var answer = true;
    
    const trie = new Trie();
    
    phone_book.sort((a,b) => b.length - a.length);
    
    for(i=0; i<phone_book.length; i++) {
        const num = phone_book[i]
        
        trie.insert(num);
        
        const temp = trie.autoComplete(num);
        
        if(temp.length && temp[0] !== num) {
            answer = false;
            break;
        }
    }
    
    return answer
}