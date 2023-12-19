const local_input = `
4 6
101111
101010
101011
111011
`;

const input = process.execArgv.includes("--stack-size=65536")
  ? require("fs").readFileSync("dev/stdin").toString()
  : local_input;

const lines = input.trim().split('\n');

const [N, M] = lines[0].split(' ').map(Number);
const map = lines.slice(1).map(el => el.split(''));
const history = new Set(['0,0']);
const tree = [
  new Set(['0,0']),
]

for(let i=1; i<=N*M; i++) {
  const lastSet = tree[tree.length - 1];
  const newSet = new Set();
  lastSet.forEach(str => {
    const [y, x] = str.split(',').map(Number);

    if(y-1 >= 0 && y-1 < N && map[y-1][x] === '1') { // 위
      const str = `${y-1},${x}`;

      if(!history.has(str)) {
        newSet.add(str) 
        history.add(str) 
      }
    }
    if(y+1 >= 0 && y+1 < N && map[y+1][x] === '1') { // 아래
      const str = `${y+1},${x}`;

      if(!history.has(str)) {
        newSet.add(str) 
        history.add(str) 
      }
    }
    if(x-1 >= 0 && x-1 < M && map[y][x-1] === '1') { // 왼쪽
      const str = `${y},${x-1}`;

      if(!history.has(str)) {
        newSet.add(str) 
        history.add(str) 
      }
    }
    if(x+1 >= 0 && x+1 < M && map[y][x+1] === '1') { // 오른쪽
      const str = `${y},${x+1}`;

      if(!history.has(str)) {
        newSet.add(str) 
        history.add(str) 
      }
    }

  })

  if(newSet.has(`${N-1},${M-1}`)) {  
    console.log(tree.length + 1)
    return null
  }

  tree.push(newSet);
}