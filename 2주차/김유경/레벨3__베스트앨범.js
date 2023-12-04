function solution(genres, plays) {
  let answer = [];
  // 장르별 누적 재생수를 나타내는 Map객체
  const genresCountMap = new Map();
  // 장르별 {고유번호: 횟수} Map객체
  const genresMap = new Map();

  genres.forEach((e, i) => {
    if (genresCountMap.has(e)) {
      genresCountMap.set(e, genresCountMap.get(e) + plays[i]);
    } else {
      genresCountMap.set(e, plays[i]);
    }

    if (genresMap.has(e)) {
      genresMap.set(e, [...genresMap.get(e), { [i]: plays[i] }]);
    } else {
      genresMap.set(e, [{ [i]: plays[i] }]);
    }
  });

  // 재생 많이된 장르 순 정렬
  let sort = [...genresCountMap.entries()].sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < sort.length; i++) {
    // 고유번호와 횟수로 이루어진 객체 배열
    const countObjArr = genresMap.get(sort[i][0]);
    // countObjArr를 배열로 만듬
    let countArr = countObjArr.map((x) => [
      Object.keys(x)[0],
      Object.values(x)[0],
    ]);
    // countObjArr를 재생순으로 정렬. 재생순이 같다면 고유번호가 낮은 순으로 정렬 후 2개까지 slice
    const sorted = countArr
      .sort((a, b) => b[1] - a[1] || Number(a[0]) - Number(b[0]))
      .slice(0, 2);
    // 고유번호 배열
    const numbers = sorted.map((x) => +x[0]);

    // 정렬된 고유번호 answer에 추가
    answer = [...answer, ...numbers];
  }

  return answer;
}
