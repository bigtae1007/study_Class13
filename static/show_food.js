
function showing() {
            $.ajax({
                type: 'GET',
                url: '/list_food',
                data: {},
                success: function (response) {
                    for (let i = 0; i < response.length ; i++){
                        let name = response[i].name;
                        let address = response[i].address;
                        let option = response[i].option;
                        let star = '👍'.repeat(response[i].star);
                        let comment = response[i].comment;
                        function color_class (option) {
                            let optionColor ;
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
                        let temp_html = `<div class="card" style="width: 18rem;">
                                            <img src="https://cdn.pixabay.com/photo/2018/06/13/18/20/waves-3473335__480.jpg" class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${name} <span class="${color_class(option)}">${option}</span></h5>
                                                <p class="card-text">${comment}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">${address}</li>
                                                <li class="list-group-item">${star}</li>
                                            </ul>
                                            <div class="card-body">
                                                <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${name}" class="card-link">검색 보러가기</a>
                                                <a href="#" class="card-link">정보 보러가기</a>
                                            </div>
                                        </div>`
                        $('#content').append(temp_html);
                    // }
                    // let countSpan = $('.card-title > span')
                    // console.log(countSpan)
                    // for (let i = 0; i< countSpan.length; i++){
                    //     switch (countSpan[i].text()) {
                    //         case '한식':
                    //             console.log(countSpan[i])
                    //             break;
                    //         // case '양식':
                    //         // case '중식':
                    //         // case '일식':
                    //         // case '디저트':
                    //         // case '카페':
                    //         // case '패스트푸드':
                    //         // case '동남아':
                    //         // case '기타':
                    //

                        }
                    }

            });
        }
showing();