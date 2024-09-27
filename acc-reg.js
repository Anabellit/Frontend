$(document).ready(function () {
    $('#acc-reg-form').submit(function (e) {
        e.preventDefault();

        const type = $('#select-type').val();
        const countryHouse = $('#select-country-house').val();
        const title = $('#title').val();
        const subtitle = $('#subtitle').val();
        const short = $('#short').val();
        const long = $('#long').val();
        const checkin = $('#checkin').val();
        const kitchen = $('#kitchen').val();
        const wifi = $('#wifi').val();
        const streaming = $('#streaming').val();
        const home = $('#home').val();
        const supermarkets = $('#supermarkets').val();
        const file = $('#formFile').val();
        const url = $(this).attr('action');

        $.post(url, {
            type: type,
            countryHouse: countryHouse,
            title: title,
            subtitle: subtitle,
            short: short,
            long: long,
            checkin: checkin,
            kitchen: kitchen,
            wifi: wifi,
            streaming: streaming,
            home: home,
            supermarkets:supermarkets,
            file: file
        }).done(function (data) {
            console.log('New House Saved Successfully');
            console.log(data);
        });
    });
});