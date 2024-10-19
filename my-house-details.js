$(document).ready(function () {
    // Funktion zum Dekodieren des JWT-Tokens und Extrahieren der User-ID
    function getUserIdFromToken() {
        // Hole den JWT-Token aus dem LocalStorage
        var token = localStorage.getItem('jwtToken');

        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return null;
        }

        // JWT-Token dekodieren, um die User-ID zu erhalten
        var decodedToken = jwt_decode(token);
        var userId = decodedToken.sub;  // Die User-ID sollte im "sub" Claim enthalten sein

        if (!userId) {
            alert('Benutzer-ID im Token nicht gefunden.');
            return null;
        }

        return userId;
    }

    // Funktion zum Laden des Hauses basierend auf der User-ID
    function loadHouseForUser() {
        var userId = getUserIdFromToken(); // Hole die User-ID aus dem Token

        if (!userId) {
            return; // Abbrechen, wenn keine User-ID vorhanden
        }

        // Führe eine Anfrage durch, um das Haus des Benutzers zu laden
        $.ajax({
            url: `http://localhost:8080/houses/user/${userId}`,  // Endpunkt, um das Haus für die User-ID zu laden
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwtToken')  // JWT-Token im Header mitsenden
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

    // Lade das Haus beim Laden der Seite
    loadHouseForUser();
});
