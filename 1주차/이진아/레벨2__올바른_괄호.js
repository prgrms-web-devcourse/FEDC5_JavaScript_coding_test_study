function solution(s){
    var answer = true;
    let arr=[];
      
    for(let i=0;i<s.length;i++) {
      if(s[i]==='(') { 
        arr.push('(')
      }
      else { 
        if(arr[arr.length-1]==='(') {
            arr.pop();
        }
        else {
            arr.push(')');
        }
      }
    }
   
    if(arr.length!==0) {
        answer = false;
    }
    return answer;
  }