$(document).ready(function () {
    $('#pers-reg-form').submit(function (e) {
        e.preventDefault();

        const salut = $('#select-salut').val();
        const other = $('#other').val();
        const email = $('#email').val();
        const pw = $('#pw').val();
        const pw2 = $('#pw2').val();
        const country = $('#select-country').val();
        const file = $('#formFile').val();
        const url = $(this).attr('action');

        $.post(url, {salut:salut, other:other, email:email, pw:pw, pw2:pw2, country: country, file:file}).done(function(data) {
            console.log('New User Saved Successfully');
            console.log(data);
        });
    });
});


/*
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

})*/
