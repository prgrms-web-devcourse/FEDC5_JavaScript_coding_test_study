const local_input = `
9
0
12345678
1
2
0
0
0
0
32
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

const minHeap = new MinHeap();
let result = "";

arr.forEach((v) => {
  // 0이면 최소힙에서 최솟값을 빼서 출력
  if (v === 0) {
    if (minHeap.size() === 0) result += 0 + "\n";
    else result += minHeap.extractMin() + "\n";
  } else {
    // 0이 아니면 최소힙에 삽입
    minHeap.insert(v);
  }
});

// 정답 출력
console.log(result);
