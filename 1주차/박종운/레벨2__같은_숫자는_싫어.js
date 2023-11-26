function solution(arr) {
  const result = [];

  arr.forEach((num) => {
    if (result.length === 0 || result[result.length - 1] !== num) {
      result.push(num);
    }
  });

  return result;
}
