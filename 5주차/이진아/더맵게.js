class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  // 값을 힙에 추가
  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    //추가한 값과 부모 노드의 값을 비교하여 오름차순 정렬 수행
    while (
      currentIndex > 0 &&
      this.heap[currentIndex] < this.heap[Math.floor((currentIndex - 1) / 2)]
    ) {
      const temp = this.heap[currentIndex];
      this.heap[currentIndex] = this.heap[Math.floor((currentIndex - 1) / 2)];
      this.heap[Math.floor((currentIndex - 1) / 2)] = temp;
      currentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  // 최솟값을 힙에서 제거하고 반환
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    let currentIndex = 0;

    while (currentIndex * 2 + 1 < this.heap.length) {
      // 현재 노드의 자식 중에서 더 작은 값을 가진 자식을 찾음
      let minChildIndex =
        currentIndex * 2 + 2 < this.heap.length &&
        this.heap[currentIndex * 2 + 2] < this.heap[currentIndex * 2 + 1]
          ? currentIndex * 2 + 2
          : currentIndex * 2 + 1;

      // 현재 노드의 값이 자식 노드보다 작으면 정렬이 끝난 것이므로 반복 중단
      if (this.heap[currentIndex] < this.heap[minChildIndex]) {
        break;
      }

      // 현재 노드와 더 작은 자식 노드의 값을 교환
      const temp = this.heap[currentIndex];
      this.heap[currentIndex] = this.heap[minChildIndex];
      this.heap[minChildIndex] = temp;

      // 다음 순회를 위해 현재 인덱스를 작은 자식의 인덱스로 업데이트
      currentIndex = minChildIndex;
    }

    return minValue;
  }
  //힙의 최솟값을 반환
  peek() {
    return this.heap[0];
  }
}

function solution(scoville, K) {
  // 주어진 배열을 최소힙에 넣음
  const minHeap = new MinHeap();
  for (const sco of scoville) {
    minHeap.push(sco);
  }

  let mixedCount = 0;
  // 힙의 크기가 2 이상이고, 최솟값이 K 미만인 동안 반복
  while (minHeap.size() >= 2 && minHeap.peek() < K) {
    //가장 작은 두 값을 꺼내서 섞은 후 다시 힙에 넣음
    const first = minHeap.pop();
    const second = minHeap.pop();
    const mixedScov = first + second * 2;
    minHeap.push(mixedScov);
    mixedCount++;
  }
  //남아있는 최솟값이 K 이상이면 섞은 횟수 반환
  return minHeap.peek() >= K ? mixedCount : -1;
}
