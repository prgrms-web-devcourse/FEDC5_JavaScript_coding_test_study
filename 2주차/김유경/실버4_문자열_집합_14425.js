const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : `${__dirname}/input.txt`;
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.trim());

const [n, m] = input
  .shift()
  .split(" ")
  .map((x) => +x);

const sArr = input.slice(0, n);
const checkArr = input.slice(n);

const map = new Map();

sArr.forEach((e) => {
  map.set(e, 1);
});

const count = checkArr.filter((e) => map.has(e));
console.log(count.length);
