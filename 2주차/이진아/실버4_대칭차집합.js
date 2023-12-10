const input = require("fs").readFileSync("dev/stdin").toString().split("\n");

let A = new Set(input[1].split(" ").map(a => +a));
const B = input[2].split(" ").map(a => +a);

//B 배열의 각 요소에 대해 반복문 실행
// B 배열의 각 요소를 검사하여 해당 요소가 Set A에 이미 존재한다면 삭제하고, 없다면 추가
B.forEach(el => {
    if (A.has(el) === false) { A.add(el); } else { A.delete(el); }

});

console.log(A.size);