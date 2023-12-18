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

const inputs = input.trim().split("\n");
let cnt = 0;
const n = Number(inputs[0]);
const arr = inputs.slice(1).map((v) => v.split(" ").map((v2) => Number(v2)));
const map = {};
arr.forEach((v) => {
  if (map[v[0]]) map[v[0]].push(v[1]);
  else map[v[0]] = [v[1]];
  if (map[v[1]]) map[v[1]].push(v[0]);
  else map[v[1]] = [v[0]];
});
const parents = Array.from({ length: n + 1 }, () => 0);
const visited = Array.from({ length: n + 1 }, () => false);

const que = [[1, map[1]]];

while (que.length > 0) {
  const [cur, nodeArr] = que.shift();

  visited[cur] = true;

  for (const node of nodeArr) {
    if (visited[node]) continue;
    parents[node] = cur;
    que.push([node, map[node]]);
  }
}
console.log(parents.slice(2).reduce((a, v) => a + v + "\n", ""));
