function posting() {
            let storeName = $('#url').val();
            let url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${storeName}`
            $.ajax({
                type: 'POST',
                url: '/food',
                data: {url_give: url},
                success: function (response) {
                    $('#table').empty();
                    let basic_html = ` <tr>
                    <th>상호명</th>
                    <th>주소</th>
                    <th>  </th>
                </tr>`
                    $('#table').append(basic_html)

                    for (let i = 0; i< response.nameList.length; i++){
                        let temp_html = `<tr>
                                            <td class="name_db">${response.nameList[i]}</td>
                                            <td class="address_db">${response.addressList[i]}</td>
                                            <td><button onclick="sendAddress(${i})">선택</button></td>
                                        </tr>`
                        $('#table').append(temp_html)
                    }
                }
            });
        }

function sendAddress(num){
    let option = $('#inputGroupSelect01').val();
    let star = $('#inputGroupSelect02').val();
    let comment = $('#comment').val();
    let address = $('.address_db')[num];
    let name = $('.name_db')[num];
    $.ajax({
                type: 'POST',
                url: '/food_save',
                data: {option_give: option, star_give:star , comment_give:comment , address_give:address.innerText, name_give: name.innerText},
                success: function (response) {
                    alert(response);
                    location.reload()
                }
            });

}
