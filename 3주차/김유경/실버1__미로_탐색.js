const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : `${__dirname}/input.txt`;
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.trim());

const [n, m] = input
  .shift()
  .split(" ")
  .map((x) => +x);

const arr = input.map((x) => x.split(""));
const visited = Array.from(Array(n), () => Array(m).fill(false));
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
bfs(0, 0, 1);

function bfs(i, j, count) {
  const queue = [[i, j, count]];
  visited[i][j] = true;

  while (queue.length) {
    const [x, y, count] = queue.shift();

    dir.forEach(([a, b]) => {
      const [nx, ny] = [x + a, y + b];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < n &&
        ny < m &&
        !visited[nx][ny] &&
        arr[nx][ny] === "1"
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny, count + 1]);

        if (nx === n - 1 && ny === m - 1) {
          console.log(count + 1);
        }
      }
    });
  }
}
