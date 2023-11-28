function solution(s) {
  const arr = [];

  for (let i in s) {
    if (s[i] === "(") {
      arr.push(s[i]);
    } else {
      if (arr[arr.length - 1] === "(") {
        arr.pop();
      } else {
        return false;
      }
    }
  }

  return arr.length === 0 ? true : false;
}
