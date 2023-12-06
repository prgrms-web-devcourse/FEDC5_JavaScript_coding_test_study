// 92,692KB, 576ms
const local_input = `
3 5
1 2 4
2 3 4 5 6
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const lines = input.trim().split('\n');

let answer = 0;

const arrA = lines[1].split(' ');
const arrB = lines[2].split(' ');

const objA = {};
const objB = {};

arrA.forEach(el => {
  objA[el] = true;
})

arrB.forEach(el => {
  objB[el] = true;
})

arrA.forEach(el => {
  if(!objB[el] === true) {
    answer++;
  }
})

arrB.forEach(el => {
  if(!objA[el] === true) {
    answer++;
  }
})

console.log(answer);
