const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : `${__dirname}/input.txt`;
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.trim());

const n = Number(input[0]);
const arr = input.slice(2).map((x) => x.split(" ").map((x) => +x));
let answer = 0;

// 1. 그래프의 간선들의 가중치를 오름차순으로 정렬
arr.sort((a, b) => a[2] - b[2]);

const parent = [];
for (let i = 0; i < n; i++) parent.push(i);

// 각 섬의 부모를 찾는 재귀 함수
// 만약 초기 값이 아니라면 parent[x]를 이용해 위로 올라가서 부모값 찾음
const getParent = (parent, x) => {
  if (parent[x] === x) return x;
  return (parent[x] = getParent(parent, parent[x]));
};

// 두 섬의 부모를 하나로 합쳐준다.
// 이때 두 부모중 작은 값을 가지는 부모로 합쳐준다.
const unionParent = (parent, x, y) => {
  const n1 = getParent(parent, x);
  const n2 = getParent(parent, y);
  if (n1 < n2) return (parent[n2] = n1);
  else return (parent[n1] = n2);
};

// 두 섬의 부모를 찾고, 부모가 같으면 true, 다르면 false return
const findParent = (parent, x, y) => {
  const n1 = getParent(parent, x);
  const n2 = getParent(parent, y);
  if (n1 === n2) return true;
  else return false;
};

// 2. 사이클을 형성하지 않는 선에서 순서대로 간선을 선택
for (let node of arr) {
  if (!findParent(parent, node[0], node[1])) {
    // 3. 선택된 간선을 MST 집합에 추가한다.
    answer += node[2]; // 정답에 해당 가중치를 더해준다 (오름차순으로 정렬해서 작은값 선택 가능)
    unionParent(parent, node[0], node[1]); // 이제 두 섬은 연결되었으니 합쳐준다
  }
}

console.log(answer);
