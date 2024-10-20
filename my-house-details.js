$(document).ready(function () {
    // Funktion zum Abrufen des JWT-Tokens aus dem LocalStorage
    function getToken() {
        var token = localStorage.getItem('jwtToken');
        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return null;
        }
        return token;
    }

    // Funktion zum Dekodieren des JWT-Tokens und Extrahieren der User-ID
    function getUserIdFromToken() {
        var token = getToken();  // Hole den Token

        if (!token) {
            return null;
        }

        // JWT-Token dekodieren, um die User-ID zu erhalten
        var decodedToken = jwt_decode(token);
        var userId = decodedToken.sub;  // Annahme: Die User-ID befindet sich im "sub" Claim

        if (!userId) {
            alert('Benutzer-ID im Token nicht gefunden.');
            return null;
        }

        return userId;
    }

    // Funktion zum Abrufen der Benutzerdaten vom Backend
    function loadUserProfile() {
        var token = getToken();
        var userId = getUserIdFromToken(); // Hole die User-ID aus dem Token

        if (!token || !userId) {
            return;
        }

        $.ajax({
            url: `http://localhost:8080/users/${userId}`,  // Dynamische User-ID in der URL
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (response) {
                // Fülle die HTML-Elemente mit den Benutzerdaten
                $('#host-user').html(response.username);
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Benutzerdaten:', error);
                console.error('Status:', status);
                console.error('Response:', xhr.responseText);  // Logge die genaue Fehlermeldung
                alert('Ein Fehler ist aufgetreten: ' + status + ' - ' + xhr.responseText);
            }
        });
    }

    // Funktion zum Laden des Hauses basierend auf der User-ID
    function loadHouseForUser() {
        var token = getToken();
        var userId = getUserIdFromToken(); // Hole die User-ID aus dem Token

        if (!token || !userId) {
            return; // Abbrechen, wenn kein Token oder keine User-ID vorhanden ist
        }

        $.ajax({
            url: `http://localhost:8080/houses/user/${userId}`,  // Endpunkt, um das Haus für die User-ID zu laden
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Header mitsenden
            },
            success: function (response) {
                // Fülle die HTML-Elemente mit den Daten des Hauses
                $('#houseType').html(response.typeOfHouse);
                $('#houseTitle').html(response.title);
                $('#houseSubtitle').html(response.subtitle);
                $('#houseShort').html(response.shortDescription);
                $('#houseLong').html(response.longDescription);

                // Zeige oder verstecke die Amenities je nach Wert vom Backend
                $('#checkin').toggle(response.hasSelfCheckin);
                $('#kitchen').toggle(response.hasKitchen);
                $('#wifi').toggle(response.hasWifi);
                $('#streaming').toggle(response.hasStreaming);
                $('#homeoffice').toggle(response.hasHomeOffice);
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Hausdetails:', error);
                alert('Fehler beim Abrufen der Hausdetails.');
            }
        });
    }

    // Lade das Benutzerprofil und das Haus beim Laden der Seite
    loadUserProfile();
    loadHouseForUser();
});
