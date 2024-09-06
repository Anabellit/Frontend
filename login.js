var token = ""

$('#btn-login').on('click', function() {

    const apiUrl = "http://localhost:8080/auth/login"
    const data = {
        "username": $('#emaillogin').val(),
        "password": $('#pw').val()
    }

    $.ajax( {
        type: "POST",
        url: apiUrl,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
    })
        .done(function(response, status, xhr) {
            //token
            token = xhr.getResponseHeader("Authorization")
            $('#result').val(JSON.stringify(response))
            $('#login-form').fadeOut()
        })
});