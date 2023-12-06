const local_input = `
3 5
1 2 4
2 3 4 5 6
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const inputs = input.trim().split("\n");
const [aSize, bSize] = inputs[0].split(" ").map((v) => Number(v));

// 집합 받기
const [aSet, bSet] = inputs
  .slice(1, 3)
  .map((str) => str.split(" ").reduce((a, v) => a.set(v, true), new Map()));

// 대칭 차집합의 원소의 갯수
let cnt = 0;
// 같은 키 갯수
let sum = 0;
for (const [key, value] of aSet) {
  if (bSet.get(key)) sum++;
}
// 전체 사이즈 에서 같은 키 갯수를 빼면 차집합 의 갯수
cnt += bSet.size - sum;

// 초기화 후 다른 집합에 대해 반복
sum = 0;
for (const [key, value] of bSet) {
  if (aSet.get(key)) sum++;
}
cnt += aSet.size - sum;
// 출력
console.log(cnt);
