function solution(arr) {
  const answer = [];

  arr.forEach((e) => {
    answer.push(e);
    if (answer.length > 1 && answer[answer.length - 2] === e) {
      answer.pop();
    }
  });

  return answer;
}
