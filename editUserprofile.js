$(document).ready(function () {
    // Funktion, um die vorhandenen Benutzerdaten zu laden
    function loadUserProfile() {
        // Hole den JWT-Token aus dem LocalStorage
        var token = localStorage.getItem('jwtToken');

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
                // Fülle das Formular mit den Benutzerdaten
                $('#nav-username').html(response.username);
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

        // Hole den JWT-Token aus dem LocalStorage
        var token = localStorage.getItem('jwtToken');

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

        // Hole die aktualisierten Daten aus dem Formular (ohne Passwort)
        let updatedUserProfileData = {
            country: $('#country').val(),
            username: $('#username').val(),
            email: $('#email').val()
        };

        // PUT-Request, um die Benutzerdaten zu aktualisieren
        $.ajax({
            url: `http://localhost:8080/users/${userId}/profile`,  // Neuer Endpunkt für Profil-Update
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
});



/*
$(document).ready(function () {
    var currentPassword = "";  // Variable, um das bestehende Passwort zu speichern

    // Funktion, um die vorhandenen Benutzerdaten zu laden
    function loadUserProfile() {
        // Hole den JWT-Token aus dem LocalStorage
        var token = localStorage.getItem('jwtToken');

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
                // Fülle das Formular mit den Benutzerdaten
                $('#salut').val(response.salutation);  // Salutation in das Dropdown setzen
                $('#country').val(response.country);   // Country in das Dropdown setzen
                $('#username').val(response.username);    // Benutzername in das Eingabefeld setzen
                $('#role').val(response.role);           // Rolle in das Eingabefeld setzen
                $('#email').val(response.email);         // E-Mail in das Eingabefeld setzen
                $('#password').val(response.password);   // Passwort in das Eingabefeld setzen (readonly)

                // Speichere das aktuelle Passwort in der Variable
                currentPassword = response.password;
                alert('Das ist das Password: ' + currentPassword);
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

        // Hole den JWT-Token aus dem LocalStorage
        var token = localStorage.getItem('jwtToken');

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

        // Hole die aktualisierten Daten aus dem Formular
        let updatedUserData = {
            salutation: $('#salut').val(),
            country: $('#country').val(),
            username: $('#username').val(),
            role: $('#role').val(),
            email: $('#email').val(),
            password: currentPassword,
        };

        // PUT-Request, um die Benutzerdaten zu aktualisieren
        $.ajax({
            url: `http://localhost:8080/users/${userId}`,  // Dynamische User-ID in der URL
            type: 'PUT',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            contentType: 'application/json',
            data: JSON.stringify(updatedUserData),  // Sende die Daten im JSON-Format
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
});
*/
