$(document).ready(function () {

    // Funktion zum Abrufen des Tokens aus dem LocalStorage
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion, um die Benutzer-ID aus der URL zu erhalten
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    // Event-Listener für den Klick auf "Delete User"
    $('#delete-user').on('click', function (event) {
        event.preventDefault(); // Verhindert das Standardverhalten des Links

        // Hole den JWT-Token aus dem LocalStorage
        let token = getToken();

        if (!token) {
            alert('Kein Token gefunden. Bitte einloggen.');
            return;
        }

        // Hier sollte die Benutzer-ID eingefügt werden (z.B. durch Übergabe als URL-Parameter)
        let userId = getUrlParameter('userId'); // Annahme: Die Benutzer-ID kommt aus der URL

        if (!userId) {
            alert('Benutzer-ID nicht gefunden.');
            return;
        }

        // AJAX-Request zum Löschen des Benutzers
        $.ajax({
            url: `http://localhost:8080/users/delete/${userId}`,  // Endpunkt für den Benutzerlöschungs-Request
            type: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (response) {
                // Erfolgreiche Löschung des Benutzers
                alert('Benutzer erfolgreich gelöscht.');
                window.location.href = "admin-dashboard.html"; // Umleitung nach erfolgreicher Löschung
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Löschen des Benutzers: Status ' + xhr.status + ', ' + xhr.statusText);
                console.error('Response: ' + xhr.responseText);
                alert('Fehler beim Löschen des Benutzers: ' + xhr.status + ' - ' + xhr.statusText);
            }
        });
    });
});
