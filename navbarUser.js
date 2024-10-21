$(document).ready(function () {
    // Funktion zum Abrufen des JWT-Tokens aus dem LocalStorage
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion zum Abrufen der Benutzerdaten und der Hausdaten vom Backend
    function loadUserProfileAndHouse() {
        // Hole den JWT-Token aus dem LocalStorage
        var token = getToken();

        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return;
        }

        // JWT-Token dekodieren, um die User-ID zu erhalten
        var decodedToken = jwt_decode(token);
        var userId = decodedToken.sub;  // Die userId sollte im "sub" Claim enthalten sein

        if (!userId) {
            alert('Benutzer-ID im Token nicht gefunden.');
            return;
        }

        // GET-Request, um die Benutzerdaten zu laden
        $.ajax({
            url: `http://localhost:8080/users/${userId}`,  // Dynamische User-ID in der URL
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (response) {
                // Fülle die HTML-Elemente mit den Benutzerdaten
                $('#nav-username').html(response.username);

                // Sobald der Benutzer geladen ist, mache einen weiteren Request, um die Hausdaten zu holen
                loadUserHouse(userId);
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Benutzerdaten:', error);
                alert('Ein Fehler ist aufgetreten: ' + status + ' - ' + xhr.responseText);
            }
        });
    }

    // Funktion, um das Haus des Benutzers zu laden
    function loadUserHouse(userId) {
        let token = getToken();  // JWT-Token holen

        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return;
        }

        // GET-Request, um die Hausdaten des Benutzers zu laden
        $.ajax({
            url: `http://localhost:8080/houses/user/${userId}`,  // Dynamische URL mit der Benutzer-ID
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (response) {
                // Dynamisch den Link für "My Accommodation" mit der Haus-ID anpassen
                $('#my-accommodation-link').attr('href', 'my-accommodation.html?houseId=' + response.houseId);
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Hausdaten:', error);
                alert('Ein Fehler ist aufgetreten beim Abrufen der Hausdaten.');
            }
        });
    }

    // Lade das Benutzerprofil und die Hausdaten beim Laden der Seite
    loadUserProfileAndHouse();
});



/*
$(document).ready(function () {
    // Funktion zum Abrufen der Benutzerdaten vom Backend
    function loadUserProfile() {
        // Hole den JWT-Token aus dem LocalStorage
        var token = localStorage.getItem('jwtToken');

        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return;
        }

        // JWT-Token dekodieren, um die User-ID zu erhalten
        var decodedToken = jwt_decode(token);
        var userId = decodedToken.userId;  // Die userId aus dem neuen Claim

        if (!userId) {
            alert('Benutzer-ID im Token nicht gefunden.');
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
                $('#nav-username').html(response.username);

            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Benutzerdaten:', error);
                console.error('Status:', status);
                console.error('Response:', xhr.responseText);  // Logge die genaue Fehlermeldung
                alert('Ein Fehler ist aufgetreten: ' + status + ' - ' + xhr.responseText);
            }

        });

    }

    // Lade das Benutzerprofil beim Laden der Seite
    loadUserProfile();
});*/
