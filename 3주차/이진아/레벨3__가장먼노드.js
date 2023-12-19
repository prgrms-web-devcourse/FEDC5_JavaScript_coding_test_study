function solution (n, edge) {
    //1. 연결리스트 생성
    const connects = new Array(n).fill().map(_ => []);

    //2. 양방향으로 연결리스트를 채워줌
    //edge 배열의 각 요소에 대해 반복
    for(const e of edge) {
      connects[e[0]-1].push(e[1]-1);
      connects[e[1]-1].push(e[0]-1);
    }
    
    const visited = [1];
    const queue = [0];
    while(queue.length) {
      const cur = queue.shift();
      
      for(const next of connects[cur]) {
        if(!visited[next]) {
          visited[next] = visited[cur] + 1;
          queue.push(next);
        }
      }
    }
    //visited 배열에서 최대 거리를 구한다
    const max = Math.max(...visited);
    //최대 거리와 같은 값을 가지는 요소들의 개수를 세어 반환
    return visited.filter(el => el === max).length;
  }