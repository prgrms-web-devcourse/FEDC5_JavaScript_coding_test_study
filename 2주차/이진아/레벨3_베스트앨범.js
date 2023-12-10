function solution(genres, plays) {
    let answer = [];
    // 각 노래에 대한 정보를 포함하는 객체들의 배열을 생성
    let songs = genres.map((genre, index) => {
        return {
            no: index,   // 노래의 인덱스
            genre: genre, // 노래의 장르
            play: plays[index] // 노래의 재생 횟수
        }
    });

    // 각 장르별 총 재생 횟수를 나타내는 배열을 생성
    let genrePlayCnt = [];
    songs.forEach(song => {
        let thisGenre = genrePlayCnt.find(genrePlay => genrePlay.genre === song.genre);
        if(!thisGenre){
            // 해당 장르가 처음 등장하는 경우, 배열에 추가
            genrePlayCnt.push({
                genre: song.genre,
                play: song.play
            });
        } else {
            // 해당 장르가 이미 등장한 경우, 기존 재생 횟수에 더함
            thisGenre.play += song.play;
        }
    });

    // 장르별로 총 재생 횟수를 기준으로 내림차순 정렬
    genrePlayCnt.sort((a, b) => b.play - a.play);

    // 각 장르별로 두 개의 노래를 선택하여 결과 배열에 추가
    genrePlayCnt.forEach(genrePlay => {
        // 현재 장르에 속하는 노래들을 찾음
        let thisGenreSongs = songs.filter(song => song.genre === genrePlay.genre);
        // 해당 노래들을 재생 횟수를 기준으로 내림차순 정렬
        thisGenreSongs.sort((a, b) => b.play - a.play);
        // 가장 재생 횟수가 많은 노래의 인덱스를 결과 배열에 추가
        answer.push(thisGenreSongs[0].no);
        // 해당 장르에 두 개 이상의 노래가 있는 경우, 두 번째로 재생 횟수가 많은 노래의 인덱스도 추가
        if(thisGenreSongs.length > 1){
            answer.push(thisGenreSongs[1].no);
        }
    });

    // 최종 결과를 반환
    return answer;
}