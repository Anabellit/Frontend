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
                $('#salut').html(response.salutation);
                $('#username').html(response.username);
                $('#country').html(response.country);
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Benutzerdaten:', xhr.responseText, status, error);
                alert(`Ein Fehler ist aufgetreten: ${xhr.status} - ${xhr.statusText}`);
            }
        });

    }

    // Lade das Benutzerprofil beim Laden der Seite
    loadUserProfile();
});