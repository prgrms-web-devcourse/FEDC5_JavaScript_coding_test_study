// 225,752KB, 960ms
const local_input = `
3 5
1 2 4
2 3 4 5 6
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const lines = input.trim().split('\n');

const a = lines[1].split(' ');
const b = lines[2].split(' ');

let obj = {};

a.forEach(el => {
    if(obj.hasOwnProperty(el))
        obj[el] += 1;
    else
        obj[el] = 1;
});

b.forEach(el => {
    if(obj.hasOwnProperty(el)) 
        obj[el] += 1 
    else
        obj[el] = 1
});

const result = Object.entries(obj).filter(arr => arr[1] === 1);

console.log(result.length);