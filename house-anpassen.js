$(document).ready(function () {
    // Funktion, um den JWT-Token aus dem LocalStorage zu holen
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion, um die User-ID aus dem JWT-Token zu extrahieren
    function getUserIdFromToken(token) {
        var decodedToken = jwt_decode(token);
        return decodedToken.sub;  // Annahme: Die User-ID ist im "sub"-Claim
    }

    // GET-Request, um die bestehenden Daten vom Backend zu laden und das Formular zu befüllen
    function loadHouseData() {
        var token = getToken();
        if (!token) {
            alert('Kein Token gefunden. Bitte einloggen.');
            return;
        }

        var userId = getUserIdFromToken(token);
        if (!userId) {
            alert('Benutzer-ID im Token nicht gefunden.');
            return;
        }

        $.ajax({
            url: `http://localhost:8080/houses/user/${userId}`,  // Dynamische User-ID in der URL
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
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
                console.error('Fehler beim Laden der Hausdaten: ' + error);
                alert('Ein Fehler ist beim Laden der Hausdaten aufgetreten.');
            }
        });
    }

    // Lade die Hausdaten beim Laden der Seite
    loadHouseData();

    // PUT-Request zum Speichern der aktualisierten Daten
    $('#house-form').submit(function (event) {
        event.preventDefault();  // Verhindert den normalen Submit des Formulars

        var token = getToken();
        if (!token) {
            alert('Kein Token gefunden. Bitte einloggen.');
            return;
        }

        var userId = getUserIdFromToken(token);
        if (!userId) {
            alert('Benutzer-ID im Token nicht gefunden.');
            return;
        }

        // Sammle die aktuellen Daten aus den Formularfeldern und füge die userId hinzu
        let houseData = {
            userId: userId,  // Füge die userId hinzu
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
            url: `http://localhost:8080/houses/user/${userId}`,  // Dynamische User-ID in der URL
            type: 'PUT',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            contentType: 'application/json',
            data: JSON.stringify(houseData),  // Sende die Daten im JSON-Format
            success: function (response) {
                alert('Haus erfolgreich aktualisiert!');
                window.location.href = "my-accommodation.html";
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Aktualisieren des Hauses: ' + error);

                // Zusätzliche Debugging-Informationen
                console.error('Status: ' + status);
                console.error('Response Status: ' + xhr.status);
                console.error('Response Text: ' + xhr.responseText);
                console.error('Response JSON: ', xhr.responseJSON);
                console.error('XHR Object: ', xhr);

                // Zeige die Fehlermeldung an
                alert('Ein Fehler ist beim Aktualisieren des Hauses aufgetreten. Status: ' + xhr.status + ', Details: ' + xhr.responseText);
            }
        });
    });
});
