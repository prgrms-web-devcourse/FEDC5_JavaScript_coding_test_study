function solution(arr) {
    const stack = [];

    arr.forEach(number => {
        if(stack.length && stack[stack.length-1] === number) {
            stack.pop();
        }
        stack.push(number);
    })
    return stack;
}