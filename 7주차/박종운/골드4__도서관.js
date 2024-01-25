const local_input = `
7 2
-37 2 -6 -39 -29 11 -28
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const lines = input.trim().split("\n");
const size = lines[0].split(' ').map(Number)[1];
const positions = lines[1].split(' ').map(Number).sort((a,b) => a-b);

// console.log(positions);

const posNums = [];
const negNums = [];

const steps = [];

positions.forEach(el => el > 0 ? posNums.push(el) : negNums.push(el));

negNums.reverse();

while(posNums.length) {
  const group = [posNums.pop()];

  while(group.length < size && posNums.length) {
    group.push(posNums.pop());
  }

  steps.push(group[0]);
}

while(negNums.length) {
  const group = [negNums.pop()];

  while(group.length < size && negNums.length) {
    group.push(negNums.pop());
  }

  steps.push(Math.abs(group[0]))
}

let sum = 0;

steps.forEach(el => sum+=el*2);

console.log(sum - Math.max(...steps ?? [0]))
