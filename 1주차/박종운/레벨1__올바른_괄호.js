function solution(s) {
  const chars = s.split("");
  const stack = [chars.pop()];

  while (chars.length > 0) {
    if (chars[chars.length - 1] === "(" && stack[stack.length - 1] === ")") {
      chars.pop();
      stack.pop();
    } else {
      stack.push(chars.pop());
    }
  }

  return !stack.length;
}
