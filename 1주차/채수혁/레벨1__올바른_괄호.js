class Stack {
  constructor() {
    this.arr = [];
    this.index = -1;
  }

  push(item) {
    this.arr[++this.index] = item;
  }

  pop() {
    const temp = this.arr[this.index--];
    return temp;
  }

  top() {
    return this.arr[this.index];
  }
}

function solution(s) {
  var answer = true;

  const stack = new Stack();

  for (const char of s.split("")) {
    if (stack.top() === "(" && char === ")") {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.index === -1;
}
