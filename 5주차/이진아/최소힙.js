let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();
input = input.split("\n").map(Number);
const N = input.shift();

//변수 초기화
let minheap = [],
  answer = "";

//최소힙 삽입 함수
function insert(heap, num) {
  // 새로운 원소를 배열에 추가
  heap.push(num);
  let ind = heap.length;

  // 부모 노드와 비교하여 오름차순 정렬 수행
  while (ind > 1) {
    if (heap[Math.floor(ind / 2) - 1] > heap[ind - 1]) {
      const temp = heap[ind - 1];
      heap[ind - 1] = heap[Math.floor(ind / 2) - 1];
      heap[Math.floor(ind / 2) - 1] = temp;
      ind = Math.floor(ind / 2);
    } else {
      break;
    }
  }
  // 정렬된 힙 반환
  return heap;
}

//최소힙 삭제 함수
function del(heap) {
  // 루트 노드에 마지막 원소를 대입하고 삭제
  heap[0] = heap[heap.length - 1];
  heap.pop();
  const len = heap.length;
  let ind = 1;

  // 자식 노드와 비교하여 오름차순 정렬 수행
  while (ind * 2 <= len) {
    if (
      heap[ind - 1] > heap[ind * 2 - 1] &&
      (heap[2 * ind] === undefined || heap[ind * 2 - 1] < heap[ind * 2])
    ) {
      const temp = heap[ind * 2 - 1];
      heap[ind * 2 - 1] = heap[ind - 1];
      heap[ind - 1] = temp;
      ind = ind * 2;
    } else if (heap[ind - 1] > heap[ind * 2]) {
      const temp = heap[ind * 2];
      heap[ind * 2] = heap[ind - 1];
      heap[ind - 1] = temp;
      ind = ind * 2 + 1;
    } else {
      break;
    }
  }
  // 정렬된 힙 반환
  return heap;
}

//값 입력 및 연산
input.forEach((value) => {
  //value가 0인 경우에는 최소 힙에서 삭제
  if (value === 0) {
    if (minheap.length > 0) {
      answer += `${minheap[0]}\n`;
      minheap = del(minheap);
    } else {
      answer += "0\n";
    }
  }
  //value가 0이 아닌 경우에는 최소 힙에 삽입
  else minheap = insert(minheap, value);
});
console.log(answer.trim());
