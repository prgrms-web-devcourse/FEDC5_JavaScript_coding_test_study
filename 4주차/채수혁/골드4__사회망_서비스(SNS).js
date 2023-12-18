const local_input = `
8
1 2
1 3
1 4
2 5
2 6
4 7
4 8
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;
const inputs = input
  .trim()
  .split("\n")
  .slice(1)
  .map((v) => v.split(" ").map((v2) => Number(v2)));

const n = Number(input.trim().split("\n")[0]);
const dp = Array.from({ length: n + 1 }, () =>
  Array.from({ length: 2 }, () => 0)
);

const map = {};
const visited = Array.from({ length: n + 1 }, () => false);
inputs.forEach((v) => {
  if (map[v[0]]) map[v[0]].push(v[1]);
  else map[v[0]] = [v[1]];
  if (map[v[1]]) map[v[1]].push(v[0]);
  else map[v[1]] = [v[0]];
});

const dfs = (cur) => {
  visited[cur] = true;
  dp[cur][0] = 0;
  dp[cur][1] = 1;

  for (const node of map[cur]) {
    if (visited[node]) continue;
    dfs(node);
    dp[cur][0] += dp[node][1];
    dp[cur][1] += Math.min(dp[node][0], dp[node][1]);
  }
};

dfs(1);
console.log(Math.min(dp[1][0], dp[1][1]));
