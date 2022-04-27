function choosing() {
    $.ajax({
        type: 'GET',
        url: '/choose_food',
        data: {},
        success: function (response) {
            const result = choose_if(response);
            if (result.length == 0) {
                alert('해당 조건이 없습니다.')
            } else {
                console.log(result)
                alert('추천 완료')

            }
        }
    });
}

function choose_if(db_list) {
    const si = $('#si').val()
    const ku = $('#ku').val();
    const dong = $('#dong').val();
    const option = $('#inputGroupSelect02').val();
    const star = $('#inputGroupSelect01').val();
    let result_list = [];
    console.log(si, ku, dong, option, star);
    if (si == '' && ku == '' && dong == '' && option == '전체' && star == '전체') {
        for (let i = 0; i < db_list.length; i++) {
            result_list.push(db_list[i]);
        }
        return result_list;
    } else if (option == '전체' && star == '전체') {
        for (let i = 0; i < db_list.length; i++) {
            const address_db = db_list[i].address;
            if (address_db.includes(si) && address_db.includes(ku) && address_db.includes(dong)) {
                result_list.push(db_list[i])
            } else {
                continue;
            }
        }
        return result_list;
    } else if (si == '' && ku == '' && dong == '') {
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
        } else {
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
    } else {
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