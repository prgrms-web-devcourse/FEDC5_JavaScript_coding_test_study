function solution(n, edge) {
  const graph = Array.from(Array(n + 1), () => []);
  let distance = Array(n + 1).fill(0);

  edge.forEach(([u, v]) => {
    graph[u].push(v);
    graph[v].push(u);
  });

  bfs(1);

  function bfs(i) {
    const queue = [i];
    distance[i] = 1;

    while (queue.length) {
      const x = queue.shift();

      graph[x].forEach((e) => {
        if (distance[e] === 0) {
          distance[e] = distance[x] + 1;
          queue.push(e);
        }
      });
    }
  }
  const max = Math.max(...distance);

  return distance.filter((e) => e === max).length;
}
