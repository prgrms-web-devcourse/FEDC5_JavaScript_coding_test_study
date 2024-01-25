const local_input = `
7
ca
cade
caed
cae
coff
c
cb
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const lines = input.trim().split("\n");
const sorted = lines.slice(1).sort();

// console.log(sorted);

const result = [];

while(sorted.length) {
  const cur = sorted.pop();

  if(!result.length) {
    result.push(cur);
  } else {
    const find = result.find(el => el.match(`^${cur}`));

    if(!find) {
      result.push(cur);
    } 
  }
}

console.log(result.length);