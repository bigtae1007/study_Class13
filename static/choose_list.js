function choosing() {
    $.ajax({
        type: 'GET',
        url: '/choose_food',
        data: {},
        success: function (response) {
            // db리스트 중 해당되는 값만 배열로 받는 함수
            const result = choose_if(response);
            if (result.length == 0) { // 빈배열 > 찾은 값이 없을 때
                alert('해당 조건이 없습니다.')
            } else {
                // 랜덤 숫자 생성
                let num = result.length;
                let randomNum = Math.random();
                let showNum = parseInt(randomNum * 100) % num;
                //보여줄 배열
                let address = result[showNum].address;
                let name = result[showNum].name;
                let option = result[showNum].option;
                let star = '👍'.repeat(result[showNum].star);
                let comment = result[showNum].comment;
                let temp_html = `<h1>추천 결과</h1>
                                <p>해당 조건 총 : ${num}개</p>
                                <div id="mainCard" class="card" style="width: 18rem;">
                                    <img src="https://cdn.pixabay.com/photo/2018/06/13/18/20/waves-3473335__480.jpg" class="card-img-top"
                                         alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${name} <span class="${color_class(option)}">${option}</span></h5>
                                        <p class="card-text">${comment}</p>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">${address}</li>
                                        <li class="list-group-item">${star}</li>
                                    </ul>
                                    <div class="card-body">
                                        <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${name}"
                                           class="card-link">검색 보러가기</a>
                                        <a href="#" class="card-link">정보 보러가기</a>
                                    </div>
                                </div>`
                $('#showCard').empty();
                $('#showCard').append(temp_html);


            }
        }
    });
}

//입력값에 따른 조건식
function choose_if(db_list) {
    const si = $('#si').val() //시 입력값
    const ku = $('#ku').val();// 구 입력값
    const dong = $('#dong').val(); // 동입력값
    const option = $('#inputGroupSelect02').val(); // 분류 입력값
    const star = $('#inputGroupSelect01').val(); // 평점 입력값
    let result_list = []; // 반환 값을 추가하기 위한 빈 배열
    //모든 값이 입력 되지 않았을 때 > 전체 검색
    if (si == '' && ku == '' && dong == '' && option == '전체' && star == '전체') {
        for (let i = 0; i < db_list.length; i++) {
            result_list.push(db_list[i]);
        }
        return result_list;
    } else if (option == '전체' && star == '전체') { // 주소만 입력 됐을 때
        for (let i = 0; i < db_list.length; i++) {
            const address_db = db_list[i].address;
            if (address_db.includes(si) && address_db.includes(ku) && address_db.includes(dong)) {
                result_list.push(db_list[i])
            } else {
                continue;
            }
        }
        return result_list;
    } else if (si == '' && ku == '' && dong == '') { // 평점이나 분류만 입력 했을 때
        if (option == '전체' && star != '전체') {
            for (let i = 0; i < db_list.length; i++) {
                const star_db = db_list[i].star;
                if (star_db.includes(star)) {
                    result_list.push(db_list[i]);
                } else {
                    continue;
                }
            }
            return result_list
        } else if (option != '전체' && star == '전체') {
            for (let i = 0; i < db_list.length; i++) {
                const option_db = db_list[i].option;
                if (option_db.includes(option)) {
                    result_list.push(db_list[i]);
                } else {
                    continue;
                }
            }
            return result_list
        } else { // 둘다 입력했을 때
            for (let i = 0; i < db_list.length; i++) {
                const star_db = db_list[i].star;
                const option_db = db_list[i].option;
                if (option_db.includes(option) && star_db.includes(star)) {
                    result_list.push(db_list[i]);
                } else {
                    continue;
                }
            }
            return result_list
        }
    } else { // 주소와 분류나 평점이 입력 됐을 때
        if (option == '전체' && star != '전체') {
            for (let i = 0; i < db_list.length; i++) {
                const star_db = db_list[i].star;
                const address_db = db_list[i].address;
                if (star_db.includes(star) && address_db.includes(si) && address_db.includes(ku) && address_db.includes(dong)) {
                    result_list.push(db_list[i]);
                } else {
                    continue;
                }
            }
            return result_list
        } else if (option != '전체' && star == '전체') {
            for (let i = 0; i < db_list.length; i++) {
                const option_db = db_list[i].option;
                const address_db = db_list[i].address;
                if (option_db.includes(option) && address_db.includes(si) && address_db.includes(ku) && address_db.includes(dong)) {
                    result_list.push(db_list[i]);
                } else {
                    continue;
                }
            }
            return result_list
        } else {
            for (let i = 0; i < db_list.length; i++) {
                const star_db = db_list[i].star;
                const option_db = db_list[i].option;
                const address_db = db_list[i].address;
                if (option_db.includes(option) && star_db.includes(star) && address_db.includes(si) && address_db.includes(ku) && address_db.includes(dong)) {
                    result_list.push(db_list[i]);
                } else {
                    continue;
                }
            }
            return result_list
        }
    }

}

// 카드 분류 class 선택자 조건 함수
function color_class(option) {
    let optionColor;
    switch (option) {
        case '한식':
            optionColor = 'ko';
            break;
        case '양식':
            optionColor = 'us';
            break;
        case '중식':
            optionColor = 'ch';
            break;
        case '일식':
            optionColor = 'ja';
            break;
        case '디저트':
            optionColor = 'de';
            break;
        case '카페':
            optionColor = 'ca';
            break;
        case '패스트푸드':
            optionColor = 'fast';
            break;
        case '동남아':
            optionColor = 'ta';
            break;
        case '기타':
            optionColor = 'else';
            break;
    }
    return optionColor;
}