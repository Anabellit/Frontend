var token = ""

$('#btn-login').on('click', function() {

    const apiUrl = "http://localhost:8080/auth/login"
    const data = {
        "email": $('#email').val(),
        "password": $('#password').val()
    }


    $.ajax( {
        type: "POST",
        url: apiUrl,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
    })
        .done(function(response, status, xhr) {

            (console.log(response,'response'));
            (console.log( 'status', status));
            (console.log( 'xhr', xhr));
            //token
            token = response['accessToken']

            console.log('token', token)

            if (!token && response.token)
            {
                token = response.token;
            }
            // mal zum überprüfen ob er erhalten wurde
            if (token) {
                console.log("Token erhalten:", token);
            } else {
                console.log("Kein Token erhalten.");
            }


            $('#result').val(JSON.stringify(response));

        })
        .fail(function(status, xhr, error) {
            console.log("Fehler beim Login:", status);
            console.log("Fehler beim Login:", xhr);
            console.log("Fehler beim Login:", error);
        });
});




/*//works:
$(document).ready(function () {
    $('#login-form').submit(function (e) {
        e.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();
        const url = $(this).attr('action');

        $.post(url, {email: email, password: password}).done(function (data) {
            console.log('Successfully Logged in!');
            console.log(data);
        });
    });
})*/




//url: http://localhost:8080/auth/login
/*var token = ""

$(document).ready(function () {
    $('#login-form').submit(function (e) {
        e.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();
        const url = $(this).attr('action');

        $.post(url, {email: email, password: password}).done(function (data) {
            console.log('Successfully Logged in!');
            console.log(data);
            token = xhr.getResponseHeader("Authorization")
            $('#result').val(JSON.stringify(response))
        });
    });
})*/

