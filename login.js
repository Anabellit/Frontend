var token = "";

// Event-Listener für das Absenden des Formulars
$('#btn-login').on('click', function (event) {
    event.preventDefault();  // Verhindert das automatische Absenden des Formulars

    const apiUrl = "http://localhost:8080/auth/login";  // Der API-Endpunkt für den Login
    const data = {
        "username": $('#username').val(),  // Hole den Wert des Benutzernamens
        "password": $('#password').val()   // Hole den Wert des Passworts
    };

    // Überprüfe, ob beide Felder ausgefüllt sind
    if (!data.username || !data.password) {
        alert("Bitte geben Sie sowohl den Benutzernamen als auch das Passwort ein.");
        return;
    }

    // AJAX-POST-Request an den Backend-Endpunkt, um sich einzuloggen
    $.ajax({
        type: "POST",
        url: apiUrl,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
    })
        .done(function (response, status, xhr) {
            console.log(response, 'response');
            console.log('status', status);
            console.log('xhr', xhr);

            // Token aus der Antwort holen
            token = response['token'];

            console.log('Token:', token);

            // Überprüfen, ob der Token existiert
            if (token) {
                console.log("Token erhalten:", token);
                // Speichere den Token im LocalStorage oder einer anderen sicheren Speicherlösung
                localStorage.setItem('jwtToken', token);

                // JWT-Token dekodieren, um die Rolle zu erhalten
                var decodedToken = jwt_decode(token);

                // Da die Rollen im JWT als Liste gespeichert sind, holst du die erste Rolle
                var roles = decodedToken.roles;  // Claim für Rollen (eine Liste)
                var role = roles && roles.length > 0 ? roles[0] : "Keine Rolle gefunden";  // Erste Rolle extrahieren

                // Zeige die Rolle im Ergebnisfeld an
                $('#result').val("Role: " + role);
            } else {
                console.log("Kein Token erhalten.");
            }

            // Weiterleitung zur nächsten Seite, wenn der Login erfolgreich war // hier abhängig von Rolle machen!
            window.location.href = "user-profile.html";

        })
        .fail(function (xhr, status, error) {
            console.log("Fehler beim Login:", status);
            console.log("Fehler beim Login:", xhr);
            console.log("Fehler beim Login:", error);

            // Fehlermeldung anzeigen, wenn der Login fehlschlägt
            alert("Fehler beim Login: " + xhr.responseText);
        });
});



/*
var token = "";

// Event-Listener für das Absenden des Formulars
$('#btn-login').on('click', function (event) {
    event.preventDefault();  // Verhindert das automatische Absenden des Formulars

    const apiUrl = "http://localhost:8080/auth/login";  // Der API-Endpunkt für den Login
    const data = {
        "username": $('#username').val(),  // Hole den Wert des Benutzernamens
        "password": $('#password').val()   // Hole den Wert des Passworts
    };

    // Überprüfe, ob beide Felder ausgefüllt sind
    if (!data.username || !data.password) {
        alert("Bitte geben Sie sowohl den Benutzernamen als auch das Passwort ein.");
        return;
    }

    // AJAX-POST-Request an den Backend-Endpunkt, um sich einzuloggen
    $.ajax({
        type: "POST",
        url: apiUrl,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
    })
        .done(function (response, status, xhr) {
            console.log(response, 'response');
            console.log('status', status);
            console.log('xhr', xhr);

            // Token aus der Antwort holen
            token = response['token'];

            console.log('Token:', token);

            // Überprüfen, ob der Token existiert
            if (token) {
                console.log("Token erhalten:", token);
                // Speichere den Token im LocalStorage oder einer anderen sicheren Speicherlösung
                localStorage.setItem('jwtToken', token);

                // JWT-Token dekodieren, um die User-ID zu erhalten
                var decodedToken = jwt_decode(token);
                var role = decodedToken.role;  // Die User-ID aus dem Claim 'userId'

                // Zeige nur die User-ID im Ergebnisfeld an
                $('#result').val("Role: " + role);
            } else {
                console.log("Kein Token erhalten.");
            }

            // Weiterleitung zur nächsten Seite, wenn der Login erfolgreich war
            window.location.href = "user-profile.html";

        })
        .fail(function (xhr, status, error) {
            console.log("Fehler beim Login:", status);
            console.log("Fehler beim Login:", xhr);
            console.log("Fehler beim Login:", error);

            // Fehlermeldung anzeigen, wenn der Login fehlschlägt
            alert("Fehler beim Login: " + xhr.responseText);
        });
});


/!*
var token = "";

// Event-Listener für das Absenden des Formulars
$('#btn-login').on('click', function (event) {
    event.preventDefault();  // Verhindert das automatische Absenden des Formulars

    const apiUrl = "http://localhost:8080/auth/login";  // Der API-Endpunkt für den Login
    const data = {
        "username": $('#username').val(),  // Hole den Wert des Benutzernamens
        "password": $('#password').val()   // Hole den Wert des Passworts
    };

    // Überprüfe, ob beide Felder ausgefüllt sind
    if (!data.username || !data.password) {
        alert("Bitte geben Sie sowohl den Benutzernamen als auch das Passwort ein.");
        return;
    }

    // AJAX-POST-Request an den Backend-Endpunkt, um sich einzuloggen
    $.ajax({
        type: "POST",
        url: apiUrl,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
    })
        .done(function (response, status, xhr) {
            console.log(response, 'response');
            console.log('status', status);
            console.log('xhr', xhr);

            // Token aus der Antwort holen
            token = response['token'];

            console.log('Token:', token);

            // Überprüfen, ob der Token existiert
            if (token) {
                console.log("Token erhalten:", token);
                // Speichere den Token im LocalStorage oder einer anderen sicheren Speicherlösung
                localStorage.setItem('jwtToken', token);
            } else {
                console.log("Kein Token erhalten.");
            }

            // Ausgabe der vollständigen Antwort im Ergebnisfeld
            $('#result').val(JSON.stringify(response));

            // Weiterleitung zur nächsten Seite, wenn der Login erfolgreich war
            window.location.href = "user-profile.html";

        })
        .fail(function (xhr, status, error) {
            console.log("Fehler beim Login:", status);
            console.log("Fehler beim Login:", xhr);
            console.log("Fehler beim Login:", error);

            // Fehlermeldung anzeigen, wenn der Login fehlschlägt
            alert("Fehler beim Login: " + xhr.responseText);
        });
});
*!/
*/
