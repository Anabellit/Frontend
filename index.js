$(document).ready(function() {
    // AJAX POST-Aufruf beim Absenden des Formulars
    $('#house-form').submit(function(event) {
        event.preventDefault();  // Verhindert den Standard-Submit des Formulars

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

        // AJAX-Aufruf an das Backend
        $.ajax({
            url: 'http://localhost:8080/houses',  // Der Endpunkt im Backend, der die House-Daten verarbeitet
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

$(document).ready(function() {
    // Funktion, um die Liste der Häuser vom Backend abzurufen
    function loadHouses() {
        $.ajax({
            url: 'http://localhost:8080/houses',  // Der GET-Endpunkt in deinem Backend
            type: 'GET',
            success: function(response) {
                // Leere zuerst die Liste
                $('#houses-list').empty();

                // Iteriere durch die erhaltenen Häuser und füge sie zur Liste hinzu
                response.forEach(function(house) {
                    $('#houses-list').append(
                        '<div class="col">' +
                        // Dynamisch die ID in die URL der Details-Seite einfügen
                        '<a class="card h-80" href="acc-details_loggedOUT.html?id=' + house.id + '" style="text-decoration: none;">' +
                        '<img src="https://picsum.photos/200/200" class="card-img-top" alt="House Image">' + // Beispielbild
                        '<div class="card-body">' +
                        '<h5 class="card-title card-tag">' + house.typeOfHouse + '</h5>' +
                        '<p class="card-text" style="font-size: 14px">' + house.country + '</p>' +
                        '</div>' +
                        '</a>' +
                        '</div>'
                    );
                });
            },
            error: function(xhr, status, error) {
                console.error('Error: ' + error);
                alert('An error occurred while fetching houses.');
            }
        });
    }

    // Lade die Häuserliste beim Laden der Seite
    loadHouses();
});


