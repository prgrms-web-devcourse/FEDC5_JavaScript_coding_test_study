function solution(genres, plays) {
  const genreMap = {};

  /**
   * {
   *  classic: [
   *    { 0: 500 },
   *    { 2: 150 },
   *    { 3: 800 },
   * ],
   * pop: [
   *   { 1: 600 },
   *   { 4: 2500 },
   * ]
   * }
   */
  genres.forEach((genre, index) => {
    const genrePlays = genreMap[genre];
    if (!genrePlays)
      genreMap[genre] = [
        {
          [index]: plays[index],
        },
      ];
    else {
      genrePlays.push({ [index]: plays[index] });
    }
  });
  const ok = Object.keys(genreMap)
    .map((key) => {
      const value = genreMap[key];
      const sum = value.reduce((a, v) => a + Object.values(v)[0], 0);
      value.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
      const slicedValue = value.slice(0, 2);
      return { [sum]: slicedValue };
    })
    .sort((a, b) => parseInt(Object.keys(b), 10) - parseInt(Object.keys(a), 10))
    .flatMap((v) => {
      const object = Object.values(v)[0].map((v2) =>
        Number(Object.keys(v2)[0])
      );
      return object;
    });
  return ok;
}
