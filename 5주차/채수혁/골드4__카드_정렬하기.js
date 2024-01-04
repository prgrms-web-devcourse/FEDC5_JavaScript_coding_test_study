const local_input = `
4
2
2
3
3
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const inputs = input
  .trim()
  .split("\n")
  .map((v) => Number(v));

const n = inputs[0];
const arr = inputs.slice(1);

// 최소힙 구현
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[parentIndex] <= this.heap[index]) {
        break;
      }

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  extractMin() {
    const min = this.heap[0];
    const ok = this.heap.pop();
    if (this.size() !== 0) this.heap[0] = ok;
    this.heapifyDown();
    return min;
  }

  heapifyDown(index = 0) {
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;
    let smallest = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[smallest]
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[smallest]
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      [this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ];
      this.heapifyDown(smallest);
    }
  }
  size() {
    return this.heap.length;
  }
  peek() {
    return this.heap[0];
  }
}

const main = () => {
  // n이 1이면 0을 출력하고 종료
  if (n === 1) {
    console.log(0);
    return;
  }
  const minHeap = new MinHeap();

  const result = [];

  // 최소힙에 모든 원소를 삽입
  arr.forEach((v) => minHeap.insert(v));

  let prev = minHeap.extractMin() + minHeap.extractMin();
  result.push(prev);

  // 힙의 크기가 1이 될 때까지 반복
  while (minHeap.size() > 0) {
    // 힙에서 가장 작은 두 개의 원소를 꺼내서 더한 후 다시 삽입
    minHeap.insert(prev);
    prev = minHeap.extractMin() + minHeap.extractMin();

    // 더한 값을 결과 배열에 삽입
    result.push(prev);
  }

  // 모든 원소를 더한 값을 출력
  console.log(result.reduce((acc, v) => acc + v, 0));
};

main();
