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
// n: 노드의 개수
const n = Number(inputs[0]);
const arr = inputs.slice(1).map((v) => v.split(" ").map((v2) => Number(v2)));
// 양방향 그래프
const map = {};
arr.forEach((v) => {
  if (map[v[0]]) map[v[0]].push(v[1]);
  else map[v[0]] = [v[1]];
  if (map[v[1]]) map[v[1]].push(v[0]);
  else map[v[1]] = [v[0]];
});
// 부모 노드를 저장할 배열
const parents = Array.from({ length: n + 1 }, () => 0);
// 방문 여부를 저장할 배열
const visited = Array.from({ length: n + 1 }, () => false);

// 1번 노드부터 탐색 시작
const que = [[1, map[1]]];

while (que.length > 0) {
  // cur: nodeArr 의 부모노드 , nodeArr: 부모 노드와 연결된 노드들의 배열
  const [cur, nodeArr] = que.shift();
  visited[cur] = true;

  for (const node of nodeArr) {
    // 이미 방문한 노드라면 continue
    if (visited[node]) continue;
    // 특정 노드번호의 부모노드를 parents 라는 부모 배열에 저장
    parents[node] = cur;
    // 현재 노드가 부모노드가 되어서 다음 노드를 탐색
    que.push([node, map[node]]);
  }
}

// 출력
console.log(parents.slice(2).reduce((a, v) => a + v + "\n", ""));
