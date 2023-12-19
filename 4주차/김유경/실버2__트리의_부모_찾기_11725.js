const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : `${__dirname}/input.txt`;
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input.shift());
const arr = input.map((x) =>
  x
    .trim()
    .split(" ")
    .map((x) => +x)
);

const graph = Array.from(Array(n + 1), () => []);
const visited = Array(n + 1).fill(false);
const parent = Array(n + 1).fill(0);

arr.forEach(([v, u]) => {
  graph[u].push(v);
  graph[v].push(u);
});

dfs(1);

function dfs(i) {
  if (!visited[i]) {
    visited[i] = true;
    graph[i].forEach((e) => {
      if (!visited[e]) {
        parent[e] = i;
        dfs(e);
      }
    });
  }
}

console.log(parent.slice(2).join("\n"));
