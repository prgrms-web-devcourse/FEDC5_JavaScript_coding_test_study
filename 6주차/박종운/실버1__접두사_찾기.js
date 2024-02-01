const local_input = `
5 10
baekjoononlinejudge
startlink
codeplus
sundaycoding
codingsh
baekjoon
star
start
code
sunday
coding
cod
online
judge
plus
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const lines = input.trim().split("\n");
const [N] = lines[0].split(' ').map(Number);
const strs = lines.slice(1, N+1);
const prefixs = lines.slice(N+1);

const set = new Set();

strs.forEach(str => {
  for(i=1; i<=str.length; i++) {
    set.add(str.slice(0, i));
  }
});

let count = 0;

prefixs.forEach(prefix => {
  set.has(prefix) && count++
})

console.log(count)