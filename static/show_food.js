
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
                        let star = 'π'.repeat(response[i].star);
                        let comment = response[i].comment;
                        let img = response[i].img_url;
                        console.log(response[i])
                        function color_class (option) {
                            let optionColor ;
                            switch (option) {
                                case 'νμ':
                                    optionColor = 'ko';
                                    break;
                                case 'μμ':
                                    optionColor = 'us';
                                    break;
                                case 'μ€μ':
                                    optionColor = 'ch';
                                    break;
                                case 'μΌμ':
                                    optionColor = 'ja';
                                    break;
                                case 'λμ νΈ':
                                    optionColor = 'de';
                                    break;
                                case 'μΉ΄ν':
                                    optionColor = 'ca';
                                    break;
                                case 'ν¨μ€νΈνΈλ':
                                    optionColor = 'fast';
                                    break;
                                case 'λλ¨μ':
                                    optionColor = 'ta';
                                    break;
                                case 'κΈ°ν':
                                    optionColor = 'else';
                                    break;
                            }
                            return optionColor;
                        }
                        let temp_html = `<div class="card" style="width: 18rem;">
                                            <img src="${img}" class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${name} <span class="${color_class(option)}">${option}</span></h5>
                                                <p class="card-text">${comment}</p>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">${address}</li>
                                                <li class="list-group-item">${star}</li>
                                            </ul>
                                            <div class="card-body">
                                                <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${name}" class="card-link">κ²μ λ³΄λ¬κ°κΈ°</a>
                                                <a href="#" class="card-link" onclick="showingBlog('${name}')">μ λ³΄ λ³΄λ¬κ°κΈ°</a>
                                            </div>
                                        </div>`
                        $('#content').append(temp_html);
                    // }
                    // let countSpan = $('.card-title > span')
                    // console.log(countSpan)
                    // for (let i = 0; i< countSpan.length; i++){
                    //     switch (countSpan[i].text()) {
                    //         case 'νμ':
                    //             console.log(countSpan[i])
                    //             break;
                    //         // case 'μμ':
                    //         // case 'μ€μ':
                    //         // case 'μΌμ':
                    //         // case 'λμ νΈ':
                    //         // case 'μΉ΄ν':
                    //         // case 'ν¨μ€νΈνΈλ':
                    //         // case 'λλ¨μ':
                    //         // case 'κΈ°ν':
                    //

                        }
                    }

            });
        }
showing();