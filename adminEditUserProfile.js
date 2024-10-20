$(document).ready(function () {
    // Funktion, um den JWT-Token aus dem LocalStorage zu holen
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion, um die Rolle aus dem Token zu extrahieren
    function getUserRoleFromToken(token) {
        var decodedToken = jwt_decode(token);
        return decodedToken.role;  // Annahme: Die Rolle des Benutzers befindet sich im "role" Claim
    }

    // Funktion, um die User-ID aus der URL zu holen (z.B. von der admin-dashboard-Seite übergeben)
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.get(name);  // Holt z.B. die userId aus der URL
    }

    // Hole die userId aus der URL (nicht aus dem Token)
    let userId = getUrlParameter('userId');  // Übergeben von der admin-dashboard-Seite

    // Funktion, um die vorhandenen Benutzerdaten zu laden
    function loadUserProfile() {
        var token = getToken();

        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return;
        }

        // Rolle des Nutzers aus dem Token dekodieren (kann verwendet werden, um die Anzeige anzupassen)
        var userRole = getUserRoleFromToken(token);

        if (!userId) {
            alert('Benutzer-ID wurde nicht gefunden.');
            return;
        }

        // GET-Request, um die Benutzerdaten zu laden
        $.ajax({
            url: `http://localhost:8080/users/${userId}`,  // Verwende die userId aus der URL
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (response) {
                // Fülle das Formular mit den Benutzerdaten
                $('#country').val(response.country);   // Country in das Dropdown setzen
                $('#username').val(response.username);    // Benutzername in das Eingabefeld setzen
                $('#email').val(response.email);         // E-Mail in das Eingabefeld setzen

                // Passwort wird nicht zurückgegeben, daher bleibt das Feld leer
                $('#password').val("");  // Leer lassen, wenn der Benutzer es nicht ändern möchte
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Benutzerdaten:', error);
                alert('Ein Fehler ist aufgetreten.');
            }
        });
    }

    // Lade das Benutzerprofil beim Laden der Seite
    loadUserProfile();

    // Funktion, um die Benutzerdaten zu aktualisieren (PUT-Request)
    $('#edit-user-form').submit(function (event) {
        event.preventDefault();  // Verhindert den Standard-Submit des Formulars

        var token = getToken();

        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return;
        }

        if (!userId) {
            alert('Benutzer-ID wurde nicht gefunden.');
            return;
        }

        // Hole die aktualisierten Daten aus dem Formular (ohne Passwort)
        let updatedUserProfileData = {
            country: $('#country').val(),
            username: $('#username').val(),
            email: $('#email').val()
        };

        // PUT-Request, um die Benutzerdaten zu aktualisieren
        $.ajax({
            url: `http://localhost:8080/users/${userId}/profile`,  // Verwende die userId aus der URL
            type: 'PUT',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            contentType: 'application/json',
            data: JSON.stringify(updatedUserProfileData),  // Sende die Daten im JSON-Format
            success: function (response) {
                alert('Profil erfolgreich aktualisiert!');
                window.location.href = "user-profile.html";  // Leite zurück zum Profil
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Aktualisieren der Benutzerdaten:', error);

                // Logge mehr Details über den Fehler
                console.error('Status:', status);
                console.error('Fehler:', error);
                console.error('Response:', xhr.responseText);
                console.error('Response JSON:', xhr.responseJSON);

                // Zeige eine detailliertere Fehlermeldung
                alert('Ein Fehler ist aufgetreten: ' + (xhr.responseText || "Keine Details verfügbar."));
            }
        });
    });

    // Funktion, um den Benutzer anhand der ID zu löschen (DELETE-Request)
    $('#delete-user').on('click', function () {
        var token = getToken();

        if (!token) {
            alert('Kein Token gefunden, bitte einloggen.');
            return;
        }

        if (!userId) {
            alert('Benutzer-ID wurde nicht gefunden.');
            return;
        }

        // Bestätige, ob der Benutzer wirklich gelöscht werden möchte
        if (!confirm('Bist du sicher, dass du diesen Benutzer löschen möchtest?')) {
            return;
        }

        // DELETE-Request zum Löschen des Benutzers
        $.ajax({
            url: `http://localhost:8080/users/delete/${userId}`,  // Verwende die userId aus der URL
            type: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (response) {
                alert('Benutzer erfolgreich gelöscht.');
                window.location.href = "admin-dashboard.html";  // Leite nach dem Löschen zum Dashboard zurück
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Löschen des Benutzers:', error);
                alert('Ein Fehler ist aufgetreten: ' + xhr.responseText);
            }
        });
    });
});
