// trie로 N개의 문자를 기록해두고
// M개의 문자가 이에 포함되는지 확인한다.
const array = [
  "5",
  "10",
  "baekjoononlinejudge",
  "startlink",
  "codeplus",
  "sundaycoding",
  "codingsh",
  "baekjoon",
  "star",
  "start",
  "code",
  "sunday",
  "coding",
  "cod",
  "online",
  "judge",
  "plus",
];

const countN = Number(array[0]);
const countM = Number(array[1]);

const N = array.slice(2, 2 + countN);
const M = array.slice(2 + countN, 2 + countN + countM);
console.log(N, M);

// tire 문자열 삽입
// 1. 루트는 비어있다.
// 2. 문자가 존재하는지 확인 후 없으면 추가 후 이동
class Node {
  constructor(value = "") {
    this.value = value;
    this.children = new Map();
  }
}

let count = 0;

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(string) {
    let currentNode = this.root;

    for (const char of string) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new Node(currentNode.value + char));
      }

      currentNode = currentNode.children.get(char);
    }
  }

  has(string) {
    let currentNode = this.root;

    for (const char of string) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char);
    }

    return true;
  }
}

const trie = new Trie();
for (const i in N) {
  trie.insert(N[i]);
}

for (const i in M) {
  if (trie.has(M[i]) === true) {
    count += 1;
  }
}

console.log(count);
