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

const inputs = input.trim().split("\n");
const arr = inputs.map(Number);

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    let idx = this.heap.length - 1;

    while (idx > 0 && this.heap[idx] < this.heap[this.getParent(idx)]) {
      this.swap(idx, this.getParent(idx));
      idx = this.getParent(idx);
    }
  }

  getParent(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeft(index) {
    return index * 2 + 1;
  }

  getRight(index) {
    return index * 2 + 2;
  }

  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  pop() {
    if (!this.heap.length) {
      return null;
    }

    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length) {
      this.heap[0] = last;

      let idx = 0;

      while (this.getLeft(idx) < this.heap.length) {
        const left = this.getLeft(idx);
        const right = this.getRight(idx);
        
        let minChild = left;

        if (right < this.heap.length && this.heap[right] < this.heap[left]) {
          minChild = right;
        }

        if (this.heap[idx] < this.heap[minChild]) {
          break;
        }

        this.swap(idx, minChild);
        idx = minChild;
      }
    }

    return min;
  }
}

const minHeap = new MinHeap();
const result = [];

arr.slice(1).map(el => {
  if(el != 0) {
    minHeap.push(el);
  } else {
    const min = minHeap.pop();
    result.push(min ?? 0);
  }
})

console.log(result.join('\n'))
