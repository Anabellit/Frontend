var token = ""

$('#btn-pers-reg').on('click', async function () {
    const data = {
        title: $('#select-salut').val(),
        body: $('#other').val()
    }

    await $.ajax({
        type: "POST",
        async: false,
        url: "http://localhost:8080/questions",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .done(function (response) {
            console.log(response)

            addItemToQuestionList(response)
        })

})