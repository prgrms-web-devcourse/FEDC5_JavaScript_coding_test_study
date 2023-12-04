const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : `${__dirname}/input.txt`;
let input = fs.readFileSync(filePath).toString().trim().split("\n");

input = input.map((x) =>
  x
    .trim()
    .split(" ")
    .map((x) => +x)
);

const arrA = input[1];
const arrB = input[2];

const mapA = new Map();
const mapB = new Map();

arrA.forEach((e) => {
  mapA.set(e, 1);
});

arrB.forEach((e) => {
  mapB.set(e, 1);
});

const ab = arrA.filter((e) => !mapB.has(e));
const ba = arrB.filter((e) => !mapA.has(e));

console.log(ab.length + ba.length);
