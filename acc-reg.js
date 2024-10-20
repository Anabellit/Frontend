$(document).ready(function() {
    // Funktion zum Abrufen der userId aus der URL
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    // Hole die userId aus der URL
    let userId = getUrlParameter('userId');

    // AJAX POST-Aufruf beim Absenden des Formulars
    $('#house-form').submit(function(event) {
        event.preventDefault();  // Verhindert den Standard-Submit des Formulars

        // Daten für das House sammeln
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
            hasSelfCheckin: $('#checkin').is(':checked'),
            userId: userId  // Füge die userId hier hinzu, um sie im Request zu übermitteln
        };

        // AJAX-Aufruf an das Backend
        $.ajax({
            url: 'http://localhost:8080/houses/register',  // Der Endpunkt im Backend, der die House-Daten verarbeitet
            type: 'POST',     // HTTP-Methode POST
            contentType: 'application/json',  // Datenformat, das gesendet wird (JSON)
            data: JSON.stringify(houseData),  // Daten in JSON-Format umwandeln und senden
            success: function(response) {
                // Erfolgsmeldung und ggf. Weiterleitung
                window.location.href = "registration confirmation.html";  // Beispiel einer Umleitung
            },
            error: function(xhr, status, error) {
                // Fehlermeldung anzeigen
                console.error('Error: ' + error);
                alert('An error occurred while registering the house.');
            }
        });
    });
});