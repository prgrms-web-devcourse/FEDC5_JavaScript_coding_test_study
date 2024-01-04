class MinHeap {
  constructor() {
    this.heap = [];
    this.sum = 0;
    this.cnt = 0;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
    this.sum += value;
    this.cnt += 1;
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
    if (this.heap.length !== 0) this.heap[0] = ok;
    this.heapifyDown();
    this.sum -= min;
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

  peek() {
    return this.heap[0];
  }
}

function solution(scoville, K) {
  const minHeap = new MinHeap();
  let answer = 0;

  // 스코빌 지수를 힙에 넣는다.
  scoville.forEach((v) => minHeap.insert(v));

  // 힙의 최소값이 K보다 크거나 같으면 종료
  while (true) {
    if (answer >= scoville.length) return -1;
    if (minHeap.peek() >= K) return answer;

    // 힙의 최소값 2개를 뽑아서 계산한 후 다시 넣는다.
    const scovil1 = minHeap.extractMin();
    const scovil2 = minHeap.extractMin();
    minHeap.insert(scovil1 + scovil2 * 2);

    // 횟수를 증가시킨다.
    answer++;
  }

  // 최소힙의 최소값이 K보다 크거나 같으면 answer를 리턴
  return minHeap.heap[0] >= K ? answer : -1;
}
