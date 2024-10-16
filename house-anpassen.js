$(document).ready(function () {
    const houseId = 1;  // Beispiel: Die ID des Hauses, dessen Daten du laden möchtest

    // GET-Request, um die bestehenden Daten vom Backend zu laden und das Formular zu befüllen
    function loadHouseData() {
        $.ajax({
            url: 'http://localhost:8080/houses/' + houseId,  // Der GET-Endpunkt, um die Hausdaten abzurufen
            type: 'GET',
            success: function (response) {
                // Fülle die Formularfelder mit den erhaltenen Daten
                $('#select-type').val(response.typeOfHouse);
                $('#select-country-house').val(response.country);
                $('#title').val(response.title);
                $('#subtitle').val(response.subtitle);
                $('#short').val(response.shortDescription);
                $('#long').val(response.longDescription);
                $('#wifi').prop('checked', response.hasWifi);
                $('#kitchen').prop('checked', response.hasKitchen);
                $('#streaming').prop('checked', response.hasStreaming);
                $('#homeoffice').prop('checked', response.hasHomeOffice);
                $('#supermarkets').prop('checked', response.nearSupermarkets);
                $('#checkin').prop('checked', response.hasSelfCheckin);
            },
            error: function (xhr, status, error) {
                console.error('Error loading house data: ' + error);
                alert('An error occurred while loading the house data.');
            }
        });
    }

    // Lade die Hausdaten beim Laden der Seite
    loadHouseData();

    // PUT-Request zum Speichern der aktualisierten Daten
    $('#house-form').submit(function (event) {
        event.preventDefault();  // Verhindert den normalen Submit des Formulars

        // Sammle die aktuellen Daten aus den Formularfeldern
        let houseData = {
            typeOfHouse: $('#select-type').val(),
            country: $('#select-country-house').val(),
            title: $('#title').val(),
            subtitle: $('#subtitle').val(),
            shortDescription: $('#short').val(),
            longDescription: $('#long').val(),
            hasWifi: $('#wifi').is(':checked'),
            hasKitchen: $('#kitchen').is(':checked'),
            hasStreaming: $('#streaming').is(':checked'),
            hasHomeOffice: $('#homeoffice').is(':checked'),
            nearSupermarkets: $('#supermarkets').is(':checked'),
            hasSelfCheckin: $('#checkin').is(':checked')
        };

        // AJAX PUT-Request zum Aktualisieren des Hauses
        $.ajax({
            url: 'http://localhost:8080/houses/' + houseId,  // Der PUT-Endpunkt zum Speichern des aktualisierten Hauses
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(houseData),
            success: function (response) {
                alert('House updated successfully!');
                window.location.href = "my-accommodation.html";
            },
            error: function (xhr, status, error) {
                console.error('Error updating house: ' + error);
                alert('An error occurred while updating the house.');
            }
        });
    });
});

