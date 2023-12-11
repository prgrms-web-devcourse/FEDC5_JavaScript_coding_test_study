function solution(n, vertex) {
    const graph = {};
    const history = new Set([1]);
    const tree = [
        new Set([1])
    ];
    
    vertex.forEach(line => {
        if(!graph.hasOwnProperty(line[0])) {
            graph[line[0]] = new Set();
        }
        if(!graph.hasOwnProperty(line[1])) {
            graph[line[1]] = new Set();
        }
        graph[line[0]].add(line[1]);
        graph[line[1]].add(line[0]);
    })
    
    for(i=1; i<=n; i++) {
        const lastSet = tree[tree.length - 1];
        const newSet = new Set();
        
        lastSet.forEach(el => {
            graph[el].forEach(node => {
                if(!history.has(node)) {                
                    newSet.add(node);
                    history.add(node);
                }
            })
        });
        
        if(newSet.size === 0) {
            break;
        }
        
        tree.push(newSet);
    }
    
    return tree[tree.length - 1].size;
}