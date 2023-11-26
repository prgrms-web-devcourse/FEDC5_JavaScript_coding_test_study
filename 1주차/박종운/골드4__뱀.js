const local_input = `
6
3
3 4
2 5
5 3
3
3 D
15 L
17 D
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const inputs = input.trim().split("\n");
const boardSize = Number(inputs[0]);
const applesCount = Number(inputs[1]);
const ordersCount = Number(inputs[1 + applesCount + 1]);
const apples = inputs
  .slice(2, 2 + applesCount)
  .map((str) => str.split(" ").map((el) => Number(el)));
const orders = inputs
  .slice(1 + applesCount + 1 + 1, 1 + applesCount + 1 + 1 + ordersCount)
  .map((str) => str.split(" ").map((el, i) => (i == 0 ? Number(el) : el)));

const orderArr = [];

orders.forEach((arr) => (orderArr[arr[0]] = arr[1]));

const board = Array.from({ length: boardSize }).map((_, i) =>
  Array.from({ length: boardSize })
);

// 시작 지점 표시
board[0][0] = "O";

// 사과 위치 표시
apples.forEach((arr) => {
  const [y, x] = arr;
  board[y - 1][x - 1] = "A";
});

let condi = true;
let time = 0;
let direction = "R";
const queue = [[0, 0]];

while (condi) {
  time++;

  let last = queue[queue.length - 1];

  // 다음칸에 위치 시키기
  if (direction === "R") {
    queue.push([last[0], last[1] + 1]);
  } else if (direction === "L") {
    queue.push([last[0], last[1] - 1]);
  } else if (direction === "U") {
    queue.push([last[0] - 1, last[1]]);
  } else if (direction === "D") {
    queue.push([last[0] + 1, last[1]]);
  }

  last = queue[queue.length - 1];

  // 벽과 부딛히면 게임 종료
  if (
    last[0] < 0 ||
    last[0] >= boardSize ||
    last[1] < 0 ||
    last[1] >= boardSize
  ) {
    console.log(time);
    return null;
  }

  // 내 몸에 닫으면 종료
  if (
    queue.slice(0, -1).find((arr) => arr[0] === last[0] && arr[1] === last[1])
  ) {
    console.log(time);
    return null;
  }

  // 이동한 칸에 사과가 없다면 꼬리 지우기
  if (board[last[0]][last[1]] !== "A") {
    const current = queue.shift();
    board[current[0]][current[1]] = null;
  }

  // X초가 끝난후 방향 전환
  if (typeof orderArr[time] === "string") {
    if (orderArr[time] === "L") {
      // 왼쪽
      if (direction === "R") direction = "U";
      else if (direction === "L") direction = "D";
      else if (direction === "U") direction = "L";
      else if (direction === "D") direction = "R";
    } else {
      // 오른쪽
      if (direction === "R") direction = "D";
      else if (direction === "L") direction = "U";
      else if (direction === "U") direction = "R";
      else if (direction === "D") direction = "L";
    }
  }
}

console.log(time);
