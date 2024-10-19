$(document).ready(function () {
    // Event-Listener für das Absenden des Formulars
    $('#registerUser').on('click', function (event) {
        event.preventDefault(); // Verhindert das automatische Absenden des Formulars

        // Hole die Formulardaten
        let salutation = $('#select-salutation').val();
        let other = $('#other').val();
        let username = $('#username').val();
        let email = $('#mail').val();
        let password = $('#psw').val();
        let country = $('#select-country').val();
        let role = $('#select-role').val(); // Neues Feld Role

        // Überprüfe, ob das Salutationsfeld "Other" ausgewählt ist
        let finalSalutation = salutation === "Other" ? other : salutation;

        // Erstelle das Datenobjekt für den POST-Request
        let userData = {
            salutation: finalSalutation,  // Verwende "Other", falls ausgewählt
            username: username,
            email: email,
            password: password,
            country: country,
            role: role
        };

        // AJAX-POST-Request an den Backend-Endpunkt, um den User zu registrieren
        $.ajax({
            url: 'http://localhost:8080/users/register',  // Backend-Endpunkt für die Benutzerregistrierung
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),  // Daten in JSON-Format umwandeln
            success: function (response) {
                alert('Registration successful!');

                // Leite zur nächsten Seite weiter und übergebe die userId in der URL
                window.location.href = "registration accommodation.html?userId=" + response.id;
            },
            error: function (xhr, status, error) {
                console.error('Error: ' + error);
                // Zeige eine detaillierte Fehlermeldung
                alert('An error occurred during registration: ' + xhr.responseText);
            }
        });
    });

    // Optional: Zeige das "Other"-Textfeld nur, wenn "Other" ausgewählt wurde
    $('#select-salutation').on('change', function () {
        if ($(this).val() === 'Other') {
            $('#other-form').show();
        } else {
            $('#other-form').hide();
        }
    });

    // Verstecke das "Other"-Textfeld zu Beginn
    $('#other-form').hide();
});
