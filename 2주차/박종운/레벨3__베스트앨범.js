function solution(genres, plays) {
    const answer = [];
    const obj = {};
    
    plays.forEach((play, i) => {
        if(!obj.hasOwnProperty(genres[i])) {
            obj[genres[i]] = {
                total: 0,
                items: []
            }
        }
        obj[genres[i]].total += play;
        obj[genres[i]].items.push([i, play]);
    })
    
    const sortedGenres = Object.entries(obj).sort((a,b) => b[1].total - a[1].total);
    
    sortedGenres.forEach(el => {
        const sortedItems = el[1].items.sort((a,b) => b[1] - a[1])
        answer.push(...sortedItems.slice(0, 2).map(arr => arr[0]));
    })

    return answer;
}