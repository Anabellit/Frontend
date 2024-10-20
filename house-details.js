$(document).ready(function () {
    // Funktion zum Abrufen des JWT-Tokens aus dem LocalStorage
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion zum Auslesen des URL-Parameters (Haus-ID)
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    // Hole die Haus-ID aus der URL
    let houseId = getUrlParameter('id');

    // Funktion zum Laden des Benutzers basierend auf der User-ID
    function loadUserForHouse(userId) {
        let token = getToken();
        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return;
        }

        $.ajax({
            url: `http://localhost:8080/users/${userId}`,  // GET-Endpunkt für Benutzer basierend auf der User-ID
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (response) {
                // Fülle das Element mit der ID 'host-user' mit dem Benutzernamen
                $('#host-user').html(response.username);
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen des Benutzers:', error);
                alert('Ein Fehler ist aufgetreten beim Abrufen des Benutzers.');
            }
        });
    }

    // Funktion zum Laden des Hauses basierend auf der Haus-ID
    function loadHouse() {
        let token = getToken();
        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return;
        }

        if (!houseId) {
            alert('No house ID found in the URL');
            return;
        }

        $.ajax({
            url: 'http://localhost:8080/houses/' + houseId,  // Dynamische URL mit der Haus-ID
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
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

                // Lade die Benutzerdaten basierend auf der User-ID des Hauses
                loadUserForHouse(response.userId);  // Verwende die User-ID aus der Antwort des Hauses
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Hausdetails:', error);
                alert('Ein Fehler ist aufgetreten beim Abrufen der Hausdetails.');
            }
        });
    }

    // Lade das Haus beim Laden der Seite
    loadHouse();
});
