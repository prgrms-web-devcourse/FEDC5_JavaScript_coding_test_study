const local_input = `
10
5
1 5
1 3
1 2
1 6
1 7
4
8 D
10 D
11 D
13 L
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const inputs = input.trim().trim().split("\n");
const boardSize = Number(inputs[0]);
const applesCount = Number(inputs[1]);
const ordersCount = Number(inputs[1 + applesCount + 1]);

let apples = inputs
  .slice(2, 2 + applesCount)
  .map((str) => str.split(" ").map((v) => Number(v)));

const orders = inputs
  .slice(2 + applesCount + 1, 2 + applesCount + 1 + ordersCount)
  .map((str) => str.split(" ").map((v, i) => (i === 0 ? Number(v) : v)));

// 뱀 머리
const que = [[1, -1]];
let cnt = 0;

let currentDirection = [1, 0];

while (true) {
  cnt++;

  const headIndex = que.length - 1;
  const headPosition = que[que.length - 1];

  const nextPosition = [
    headPosition[0] + currentDirection[0],
    headPosition[1] + currentDirection[1],
  ];

  // 벽에 부딛힌경우
  if (
    nextPosition[0] < 1 ||
    nextPosition[0] > boardSize ||
    -nextPosition[1] < 1 ||
    -nextPosition[1] > boardSize
  ) {
    break;
  }
  // 몸에 부딛힌 경우
  if (
    que.reduce(
      (a, v) => a || (v[0] === nextPosition[0] && v[1] === nextPosition[1]),
      false
    )
  ) {
    break;
  }
  // 머리가 다음 위치로 움직임
  que.push(nextPosition);

  // 사과를 먹지 않은 경우
  if (
    !apples.reduce(
      (a, v) => a || (v[1] === nextPosition[0] && -v[0] === nextPosition[1]),
      false
    )
  ) {
    // 꼬리를 움직인 만큼 제거
    que.shift();
  } else {
    apples = apples.filter(
      (v) => !(v[1] === nextPosition[0] && -v[0] === nextPosition[1])
    );
  }

  // 방향 회전 을 할 시간이라면
  if (orders.length > 0 && orders[0][0] === cnt) {
    const ordersDirection = orders[0][1];
    orders.shift();

    // 오른쪽으로 돌기
    if (ordersDirection === "D") {
      if (currentDirection[0] === 1 && currentDirection[1] === 0) {
        currentDirection = [0, -1];
      } else if (currentDirection[0] === 0 && currentDirection[1] === -1) {
        currentDirection = [-1, 0];
      } else if (currentDirection[0] === -1 && currentDirection[1] === 0) {
        currentDirection = [0, 1];
      } else {
        currentDirection = [1, 0];
      }
    } else if (ordersDirection === "L") {
      // 왼쪽으로 돌기
      if (currentDirection[0] === 1 && currentDirection[1] === 0) {
        currentDirection = [0, 1];
      } else if (currentDirection[0] === 0 && currentDirection[1] === 1) {
        currentDirection = [-1, 0];
      } else if (currentDirection[0] === -1 && currentDirection[1] === 0) {
        currentDirection = [0, -1];
      } else {
        currentDirection = [1, 0];
      }
    }
  }
}
console.log(cnt);
