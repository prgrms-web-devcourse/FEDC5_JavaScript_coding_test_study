const local_input = `
4 6
101111
101010
101011
111011
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const inputs = input.trim().split("\n");
const [n, m] = inputs[0].split(" ").map((v) => Number(v));
const arr = inputs.slice(1, n + 1).map((v) => {
  return v.split("");
});

function bfs() {
  const que = [[0, 0]];
  const visited = Array.from({ length: n }, () => Array(m).fill(0));
  visited[0][0] = 1;

  while (que) {
    const pos = que.shift();

    if (pos[0] === n - 1 && pos[1] === m - 1) return visited;

    for (let dir of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
      if (
        nextPos[0] >= 0 &&
        nextPos[0] < n &&
        nextPos[1] >= 0 &&
        nextPos[1] < m &&
        !visited[nextPos[0]][nextPos[1]] &&
        arr[nextPos[0]][nextPos[1]] === "1"
      ) {
        que.push([nextPos[0], nextPos[1]]);
        visited[nextPos[0]][nextPos[1]] += visited[pos[0]][pos[1]] + 1;
      }
    }
  }
  return visited;
}

console.log(bfs()[n - 1][m - 1]);
