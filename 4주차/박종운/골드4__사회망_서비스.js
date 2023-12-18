const readline = require('readline');

const rl = readline.createInterface({
  input: process.execArgv.includes("--stack-size=65536") ? 
    process.stdin : require('fs').createReadStream(__dirname + '/input.txt'),
  output: process.stdout
});

let N;
let graph;
let dp;
let visited;

function dfs(cur) {
  visited[cur] = true;

  for (const child of graph[cur]) {
    if (!visited[child]) {
      dfs(child);
      dp[cur][0] += dp[child][1];
      dp[cur][1] += Math.min(...dp[child]);
    }
  }
}

rl.question('', input => {
  N = parseInt(input);
  graph = Array.from({ length: N + 1 }, () => []);
  dp = Array.from({ length: N + 1 }, () => [0, 1]);
  visited = Array(N + 1).fill(false);

  rl.on('line', line => {
    const [u, v] = line.split(' ').map(Number);
    graph[u].push(v);
    graph[v].push(u);
  }).on('close', () => {
    dfs(1);
    console.log(Math.min(...dp[1]));

    process.exit();
  });
});