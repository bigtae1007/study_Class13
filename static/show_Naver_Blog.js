function showingBlog(name) {
    let searchName = name;
    $("#blog_show").show();
    $('#content').hide();
    $.ajax({
        type: 'POST',
        url: '/search_blog',
        data: {name_give: searchName},
        success: function (response) {
            console.log(response)
            const sub_response = response.desc
            const content = sub_response.items
            const name = response.name
            console.log(content)
            let text_html = `
                                <div>
                                    <h3>${name} 관련 블로그</h3>
                                    <p>총 블로그 수 : ${sub_response.total} </p>
                                    <p>상위 10개 블로그 목록</p>
                                </div>
                                <table id="display">
                                </table>
                                <button type="button" class="btn btn-outline-primary" onclick="close_blog()">닫기</button>
                           `
            $('#blog_show').append(text_html);

            const table_html = `<tr>
                                    <th>날짜</th>
                                    <th>제목</th>
                                    <th>링크</th>
                                </tr>`
            $("#display").append(table_html);

            for (let i = 0; i < content.length; i++) {
                const title = content[i].title;
                const date = content[i].postdate;
                const link = content[i].link;
                const content_html = `<tr>
                                        <td>${date}</td>
                                        <td>${title}</td>
                                        <td>
                                            <a href="${link}"><button>바로가기</button></a>
                                        </td>
                                    </tr>`
                $("#display").append(content_html)
            }
        }
    })
}

function close_blog() {
    $('#content').show();
    $("#blog_show").empty()
    $("#blog_show").hide();
}
