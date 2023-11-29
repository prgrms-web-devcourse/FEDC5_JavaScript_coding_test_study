function solution(s){
    let answer = '';
    const stack = [];
    
    for(let i=0, length = s.length; i < length; i++) {
        const word = s[i];
        if(i === 0) {
            stack.push(word);
        } else {
            if(stack[stack.length-1] === '(' && word === ')') {
                stack.pop();
            } else {
                stack.push(word);
            }
        }
        
    }
    
    answer = stack.length === 0;
    return answer;
}