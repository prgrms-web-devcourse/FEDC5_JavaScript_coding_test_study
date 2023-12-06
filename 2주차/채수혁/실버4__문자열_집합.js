const local_input = `
5 11
baekjoononlinejudge
startlink
codeplus
sundaycoding
codingsh
baekjoon
codeplus
codeminus
startlink
starlink
sundaycoding
codingsh
codinghs
sondaycoding
startrink
icerink
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const inputs = input.trim().split("\n");

const [n, m] = inputs[0].split(" ").map((v) => Number(v));

const mapS = new Map();

// n 만큼 해시 테이블 만들기
for (let i = 0; i < n; i++) {
  const key = inputs[1 + i];
  mapS.set(key, true);
}
// m 만큼 돌면서 해시테이블 이 적용되어있는지 보기
let cnt = 0;
for (let i = 0; i < m; i++) {
  const key = inputs[1 + n + i];
  if (mapS.get(key)) {
    cnt++;
  }
}
console.log(cnt);
