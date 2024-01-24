function solution(n, edge) {
  // 인접 리스트 = 연결 리스트 이용
  const graph = Array.from(Array(n + 1), () => []); // 0이 아닌 1번 부터 시작
  console.log(graph);

  // 양방향 그래프 구현
  for (const [src, dest] of edge) {
    graph[src].push(dest);
    graph[dest].push(src);
  }
  console.log(graph);

  // 0으로 초기화
  // 각 정점의 거리를 구하는 배열
  const distance = Array(n + 1).fill(0);
  distance[1] = 1;

  console.log(distance);
  // BFS
  const queue = [1]; // 1 3 2 6 4 5
  while (queue.length > 0) {
    const src = queue.shift(); // 매열 첫 요소 제거 후 반환
    for (const dest of graph[src]) { //src=1 dest=3,2
      // console.log(dest);
      // 한번도 가지 않은 경로 값은 0
      // 0이 아닌 값 = 방문했던 노드 -> 최단 거리를 구하는 것이기 때문에 다시 방문할 필요 없음
      if (distance[dest] === 0) { //3->2 2->3 //1->3 1->2
        console.log(dest);
        queue.push(dest);
        distance[dest] = distance[src] + 1; // 도착지 = 출발지 + 1 (경로)
      }
    }
  }

  console.log(distance);

  const max = Math.max(...distance); // 최대 거리
  console.log(max); //3
  return distance.filter((item) => item === max).length; // 최대 거리와 같은 거리를 같은 것의 개수
}
solution(6, [
  [3, 6],
  [4, 3],
  [3, 2],
  [1, 3],
  [1, 2],
  [2, 4],
  [5, 2],
]);
