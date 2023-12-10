const local_input = `
6
9
1 2 5
1 3 4
2 3 2
2 4 7
3 4 6
3 5 11
4 5 3
4 6 8
5 6 8
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const inputs = input.trim().split("\n");
const n = inputs[0];
const m = inputs[1];
const parent = Array.from({ length: n }, (_, i) => i);

const edges = inputs.slice(2).map((v) => {
  return v.split(" ").map((v) => Number(v));
});

function findParent(x) {
  if (parent[x] !== x) {
    parent[x] = findParent(parent[x]);
  }
  return parent[x];
}

function unionParent(a, b) {
  a = findParent(a);
  b = findParent(b);
  if (a < b) parent[b] = a;
  else parent[a] = b;
}

function isUnioin(a, b) {
  return findParent(a) === findParent(b);
}

function kruskal() {
  let result = 0;
  edges.sort((a, b) => a[2] - b[2]);
  for (let edge of edges) {
    const [a, b, cost] = edge;
    if (!isUnioin(a, b)) {
      unionParent(a, b);
      result += cost;
    }
  }
  return result;
}

console.log(kruskal());
