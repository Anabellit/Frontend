$(document).ready(function () {
    // Funktion zum Abrufen des JWT-Tokens aus dem LocalStorage
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion zum Abrufen eines URL-Parameters (houseId in diesem Fall)
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    // Hole die houseId aus der URL
    let houseId = getUrlParameter('houseId');
    let userId = null;  // Wird nach dem Laden des Hauses festgelegt

    // Funktion zum Laden der Unterkunftsdaten basierend auf der houseId
    function loadHouseData() {
        if (!houseId) {
            alert('No house ID found in the URL');
            return;
        }

        let token = getToken();  // Hole den JWT-Token

        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return;
        }

        // GET-Request zum Laden der Unterkunftsdaten
        $.ajax({
            url: 'http://localhost:8080/houses/' + houseId,  // Dynamische URL mit der houseId
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (response) {
                // Fülle das Formular mit den erhaltenen Unterkunftsdaten
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

                // Setze die userId
                userId = response.userId;

                // Lade die Benutzerdaten basierend auf der userId
                loadUserForHouse(userId);
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Hausdetails:', error);
                alert('Ein Fehler ist aufgetreten beim Abrufen der Hausdetails.');
            }
        });
    }

    // Funktion zum Laden der Benutzerdaten (Host) basierend auf der userId
    function loadUserForHouse(userId) {
        let token = getToken();  // Hole den JWT-Token

        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return;
        }

        // GET-Request zum Laden der Benutzerdaten
        $.ajax({
            url: `http://localhost:8080/users/${userId}`,  // Dynamische URL mit der userId
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (response) {
                // Fülle das Feld "host-user" mit dem Benutzernamen
                $('#host-user').text(response.username);
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen des Benutzers:', error);
                alert('Ein Fehler ist aufgetreten beim Abrufen des Benutzers.');
            }
        });
    }

    // PUT-Request zum Speichern der Änderungen im Formular
    $('#house-form').submit(function (event) {
        event.preventDefault();  // Verhindert den Standard-Submit des Formulars

        let token = getToken();  // Hole den JWT-Token

        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return;
        }

        if (!userId) {
            alert('Benutzer-ID nicht gefunden.');
            return;
        }

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

        // PUT-Request zum Aktualisieren der Unterkunft
        $.ajax({
            url: `http://localhost:8080/houses/user/${userId}`,  // Dynamische URL mit der userId
            type: 'PUT',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            contentType: 'application/json',
            data: JSON.stringify(houseData),  // Sende die Daten im JSON-Format
            success: function (response) {
                alert('Änderungen erfolgreich gespeichert!');
                window.location.href = "admin-dashboard.html";  // Zurück zum Dashboard
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Speichern der Änderungen:', error);
                alert('Ein Fehler ist aufgetreten beim Speichern der Änderungen.');
            }
        });
    });

    // Lade die Hausdaten und Benutzerdaten beim Laden der Seite
    loadHouseData();
});
