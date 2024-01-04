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

// n: 노드의 개수
const n = Number(input.trim().split("\n")[0]);
// dp: dp[i][0] = i번 노드가 얼리어답터가 아닐 때, dp[i][1] = i번 노드가 얼리어답터일 때
const dp = Array.from({ length: n + 1 }, () =>
  Array.from({ length: 2 }, () => 0)
);

// 양방향 그래프
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

  // 현재 노드의 자식 노드들을 탐색
  for (const node of map[cur]) {
    if (visited[node]) continue;
    dfs(node);
    // 현재 노드가 얼리어답터가 아닐 때, 자식 노드는 얼리어답터여야 한다.
    dp[cur][0] += dp[node][1];
    // 현재 노드가 얼리어답터일 때, 자식 노드는 얼리어답터일 수도 있고 아닐 수도 있다.
    // 따라서 최소를 구하므로 자식 노드가 얼리어답터일 때와 아닐 때 중 작은 값을 더해준다.
    dp[cur][1] += Math.min(dp[node][0], dp[node][1]);
  }
};

dfs(1);
// 최상위 노드인 1번 노드가 얼리어답터일 때와 아닐 때 중 작은 값을 출력
console.log(Math.min(dp[1][0], dp[1][1]));
