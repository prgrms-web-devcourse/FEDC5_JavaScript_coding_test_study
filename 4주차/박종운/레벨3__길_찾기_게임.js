function solution(nodeinfo) {
    const nodes = nodeinfo.map((el, i) => [i+1, ...el]);
    
    const sorted = nodes.sort((a, b) => b[2] === a[2] ? a[1] - b[1] : b[2] - a[2]);

    const preorder = [];
    const postorder = [];

    function traverse(arr) {
        if(!arr.length) return;
        
        const current = arr[0];
        
        preorder.push(current[0]);
        
        const newLeft = arr.filter(el => el[2] < current[2] && el[1] < current[1]);
        const newRight = arr.filter(el => el[2] < current[2] && el[1] > current[1] );
        
        traverse(newLeft);
        traverse(newRight);
        
        postorder.push(current[0]);
    }

    traverse(sorted);
    
    return [preorder, postorder];
}