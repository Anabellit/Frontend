$(document).ready(function () {
    $('#editProfile').submit(function (e) {
        e.preventDefault();

        const salut = $('#salut').val();
        const email = $('#email').val();
        const country = $('#country').val();
        const url = $(this).attr('action');

        $.post(url, {salut:salut, email: email, country:country}).done(function (data) {
            console.log('Post Saved Successfully');
            console.log(data);
        });
    });
})