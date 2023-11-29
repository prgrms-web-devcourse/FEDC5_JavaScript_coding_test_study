const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : `${__dirname}/input.txt`;
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input.shift());
const k = Number(input.shift());
const arr = input.map((x) => x.trim());

const applePosition = arr
  .slice(0, k)
  .map((x) => x.split(" ").map((x) => +x - 1));

const l = Number(arr[k]);

const countArr = arr.slice(k + 1).map((x) => x.split(" "));
const countObj = Object.fromEntries(countArr);

// 시작시에 맨위 맨좌측에 위치
const queue = [[0, 0]];

let body = Array.from(Array(n), () => Array(n).fill(true));

for (let i = 0; i < k; i++) {
  const [x, y] = applePosition[i];
  body[x][y] = "a";
}

let dir = [0, 1];
let second = 0;
let currentPosition = [0, 0];

while (true) {
  second += 1;

  // 다음칸으로 전진 이동
  currentPosition[0] += dir[0];
  currentPosition[1] += dir[1];

  // 범위를 벗어난다면 종료
  if (
    currentPosition[0] < 0 ||
    currentPosition[1] < 0 ||
    currentPosition[0] >= n ||
    currentPosition[1] >= n
  ) {
    break;
  }

  // 몸통에 부딪힌다면 종료
  if (isHit(queue, currentPosition)) {
    break;
  }

  queue.push([currentPosition[0], currentPosition[1]]);

  const isApple = body[currentPosition[0]][currentPosition[1]] === "a";
  if (isApple) {
    // 사과가 있다면 그 칸의 사과 없어짐
    body[currentPosition[0]][currentPosition[1]] = true;
  } else {
    //사과가 없다면 꼬리가 위치한 칸을 비운다 -> queue의 첫번째 것을 빼준다.
    queue.shift();
  }

  const changeDirInfo = countObj[String(second)];

  // 방향 이동이 있다면 방향 변경
  if (changeDirInfo) {
    dir = changeDir(dir, changeDirInfo);
  }
}

console.log(second);

function isHit(queue, current) {
  for (let i = 0; i < queue.length; i++) {
    const [x, y] = queue[i];
    if (x === current[0] && y === current[1]) {
      return true;
    }
  }

  return false;
}

function changeDir(currnetDir, changeDirInfo) {
  let result = [];
  const [x, y] = currnetDir;

  if (x === 0) {
    if (changeDirInfo === "D") {
      result = [y, 0];
    } else {
      result = [-y, 0];
    }
  } else if (y === 0) {
    if (changeDirInfo === "D") {
      result = [0, -x];
    } else {
      result = [0, x];
    }
  }

  return result;
}
