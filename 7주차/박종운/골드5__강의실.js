const local_input = `
8
6 15 21
7 20 25
1 3 8
3 2 14
8 6 27
2 7 13
4 12 18
5 6 20
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const lines = input.trim().split("\n");
const sorted = lines
  .slice(1)
  .map(el => el.split(' ').map(Number))
  .sort((a, b) => a[1] - b[1]);

// console.log(sorted);

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

let result = 0;

sorted.forEach(el => {
  minHeap.push(el[2]);

  if(minHeap.heap[0] <= el[1]) {
    minHeap.pop();
  } else {
    result++;
  }
})

console.log(result)