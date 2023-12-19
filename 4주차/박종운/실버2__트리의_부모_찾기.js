const local_input = `
7
1 6
6 3
3 5
4 1
2 4
4 7
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const lines = input.trim().split('\n');

const N = Number(lines[0]);
const edges = lines.slice(1).map(el => el.split(' ').map(Number));

const graph = {};

edges.forEach(el => {
  if(!graph[el[0]]) graph[el[0]] = [];
  if(!graph[el[1]]) graph[el[1]] = [];
  graph[el[0]].push(el[1])
  graph[el[1]].push(el[0])
})

const queue = [1];
const visited = new Set([1]);
const parentNodes = [];

while(queue.length) {
  const currentNode = queue.shift();
  const childNodes = graph[currentNode].filter(childNode => !visited.has(childNode));

  childNodes.forEach(childNode => {
    parentNodes[childNode] = currentNode;
    queue.push(childNode);
  })
  
  visited.add(currentNode);
}

console.log(parentNodes.slice(2).join('\n'))