function solution(n, edge) {
  const que = [[1, 0]];
  const graph = {};
  edge.forEach((v) => {
    if (!graph[v[0]]) graph[v[0]] = [v[1]];
    else graph[v[0]].push(v[1]);

    if (!graph[v[1]]) graph[v[1]] = [v[0]];
    else graph[v[1]].push(v[0]);
  });
  const visited = Array.from({ length: n + 1 }, () => false);
  const cnts = Array.from({ length: n + 1 }, () => 0);
  let index = 0;
  visited[1] = true;
  while (que.length > 0) {
    const [node, cnt] = que.shift();
    index = cnt;
    cnts[cnt] += 1;

    for (const next of graph[node]) {
      if (visited[next]) continue;
      que.push([next, cnt + 1]);
      visited[next] = true;
    }
  }
  return cnts[index];
}
