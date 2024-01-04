function solution(scoville, K) {
  let answer = 0;
  const minHeap = new MinHeap();

  scoville.forEach((e) => {
    minHeap.add(e);
  });

  while (true) {
    const firstMin = minHeap.poll();
    const secondtMin = minHeap.poll();

    if (!secondtMin) {
      if (firstMin < K) {
        answer = -1;
      }
      break;
    }

    const newScoville = firstMin + secondtMin * 2;

    if (firstMin >= K) {
      break;
    }

    minHeap.add(newScoville);

    answer += 1;
  }

  return answer;
}

class MinHeap {
  constructor() {
    this.items = [];
  }

  swap(index1, index2) {
    let temp = this.items[index1]; // items의 index1의 값을 temp(임시공간)에 담음
    this.items[index1] = this.items[index2]; // index1에 index2의 값을 저장
    this.items[index2] = temp; // index2에 아까 index1의 값을 temp에 넣어놓은 값을 저장
  }

  //부모 인덱스 구하는 메소드
  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  //왼쪽 자식 인덱스 구하는 메소드
  leftChildIndex(index) {
    return index * 2 + 1;
  }

  //오른쪽 자식 인덱스 구하는 메소드
  rightChildIndex(index) {
    return index * 2 + 2;
  }

  //부모 노드 구하는 메소드
  parent(index) {
    return this.items[this.parentIndex(index)];
  }

  //왼쪽 자식 노드 구하는 메소드
  leftChild(index) {
    return this.items[this.leftChildIndex(index)];
  }

  //오른쪽 자식 노드 구하는 메소드
  rightChild(index) {
    return this.items[this.rightChildIndex(index)];
  }

  //최대 힙의 경우 최댓값을 반환하고 최소 힙의 경우 최솟값을 반환하는 메소드
  peek() {
    return this.items[0];
  }

  //힙의 크기(항목 개수)를 반환하는 메소드
  size() {
    return this.items.length;
  }

  // MinHeap 클래스는 Heap 클래스를 상속받았으므로 Heap 클래스의 메소드를 모두 사용할 수 있다.
  bubbleUp() {
    let index = this.items.length - 1;

    while (
      this.parent(index) !== undefined &&
      this.parent(index) > this.items[index]
    ) {
      this.swap(index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }

  bubbleDown() {
    let index = 0;

    while (
      this.leftChild(index) !== undefined &&
      (this.leftChild(index) < this.items[index] ||
        this.rightChild(index) < this.items[index])
    ) {
      let smallerIndex = this.leftChildIndex(index);

      if (
        this.rightChild(index) !== undefined &&
        this.rightChild(index) < this.items[smallerIndex]
      ) {
        smallerIndex = this.rightChildIndex(index);
      }

      this.swap(index, smallerIndex);

      index = smallerIndex;
    }
  }

  add(item) {
    this.items[this.items.length] = item;
    this.bubbleUp();
  }

  poll() {
    let item = this.items[0]; // 첫번째 원소 keep
    this.items[0] = this.items[this.items.length - 1]; // 맨 마지막 원소를 첫번째 원소로 복사
    this.items.pop(); // 맨 마지막 원소 삭제
    this.bubbleDown();

    return item; // keep해둔 값 반환
  }
}
