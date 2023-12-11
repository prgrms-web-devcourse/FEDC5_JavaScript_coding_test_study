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

const lines = input.trim().split('\n');
const [N, M] = lines[0].split(' ').map(el => Number(el));
const S = lines.slice(1, N+1);
const strs = lines.slice(N+1);

const obj = {};

S.forEach(el => {
  obj[el] = true;
})

let answer = 0;

strs.forEach(str => {
  if(obj[str] === true) {
    answer++;
  }
})

console.log(answer)