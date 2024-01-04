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

function solution(scoville, K) {
  let answer = 0;

  const minHeap = new MinHeap();

  scoville.forEach((el) => minHeap.push(el));

  while (minHeap.heap.length > 1 && minHeap.heap[0] < K) {
    const min1 = minHeap.pop();
    const min2 = minHeap.pop();
    const newVal = min1 + min2 * 2;
    minHeap.push(newVal);
    answer++;
  }

  return (minHeap.heap[0] >= K) ? answer : -1;
}
