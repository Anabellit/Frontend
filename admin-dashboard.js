$(document).ready(function () {
    // Funktion, um den JWT-Token aus dem LocalStorage zu holen
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion, um die Benutzerdaten basierend auf der UserId abzurufen
    function getUsernameByUserId(userId) {
        var token = getToken();  // Hole den JWT-Token

        return $.ajax({
            url: 'http://localhost:8080/users/' + userId,  // Der GET-Endpunkt, um den Benutzer anhand der ID abzurufen
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (userResponse) {
                return userResponse.username;  // Gib den Benutzernamen zurück
            },
            error: function (xhr, status, error) {
                console.error('Error fetching user for house with userId ' + userId + ': ' + error);
            }
        });
    }

    // Funktion, um die Liste der Häuser vom Backend abzurufen und in die Tabelle einzufügen
    function loadHouses() {
        var token = getToken();  // Hole den JWT-Token

        $.ajax({
            url: 'http://localhost:8080/houses',  // Der GET-Endpunkt in deinem Backend
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (houseResponse) {
                // Leere zuerst den Tabellen-Body, um alte Daten zu entfernen
                $('tbody').empty();

                // Iteriere durch die erhaltenen Häuser und füge sie in die Tabelle ein
                houseResponse.forEach(function (house) {
                    // Asynchron die Benutzerdaten für jedes Haus basierend auf der userId abrufen
                    getUsernameByUserId(house.userId).done(function (userResponse) {
                        let username = userResponse.username;  // Hol den Benutzernamen

                        // Füge die Hausdaten mit dem dynamischen Benutzernamen in die Tabelle ein
                        $('tbody').append(
                            '<tr>' +
                            '<th scope="row">' + house.id + '</th>' +    // Haus-ID
                            '<td>' + username + '</td>' +                // Dynamischer Benutzername
                            '<td>' + house.country + '</td>' +           // Haus-Land
                            '<td>' + house.shortDescription + '</td>' +  // Haus-Beschreibung
                            '<td>' +
                            '<div class="dropdown info">' +
                            '<a class="btn prim dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">' +
                            'Edit' +
                            '</a>' +
                            '<ul class="dropdown-menu">' +
                            // Übergebe die userId als URL-Parameter zur admin-edit-user-profile.html-Seite
                            '<li><a class="dropdown-item" href="admin-edit-user-profile.html?userId=' + house.userId + '">Edit User Profile</a></li>' +
                            '<li><a class="dropdown-item" href="admin-edit-accommodation.html?houseId=' + house.id + '">Edit Accommodation</a></li>' +
                            '</ul>' +
                            '</div>' +
                            '</td>' +
                            '</tr>'
                        );
                    });
                });
            },
            error: function (xhr, status, error) {
                console.error('Error: ' + error);
                alert('An error occurred while fetching houses.');
            }
        });
    }

    // Lade die Häuserliste beim Laden der Seite
    loadHouses();
});


/*
$(document).ready(function () {
    // Funktion, um den JWT-Token aus dem LocalStorage zu holen
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion, um die Benutzerdaten basierend auf der UserId abzurufen
    function getUsernameByUserId(userId) {
        var token = getToken();  // Hole den JWT-Token

        return $.ajax({
            url: 'http://localhost:8080/users/' + userId,  // Der GET-Endpunkt, um den Benutzer anhand der ID abzurufen
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (userResponse) {
                return userResponse.username;  // Gib den Benutzernamen zurück
            },
            error: function (xhr, status, error) {
                console.error('Error fetching user for house with userId ' + userId + ': ' + error);
            }
        });
    }

    // Funktion, um die Liste der Häuser vom Backend abzurufen und in die Tabelle einzufügen
    function loadHouses() {
        var token = getToken();  // Hole den JWT-Token

        $.ajax({
            url: 'http://localhost:8080/houses',  // Der GET-Endpunkt in deinem Backend
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (houseResponse) {
                // Leere zuerst den Tabellen-Body, um alte Daten zu entfernen
                $('tbody').empty();

                // Iteriere durch die erhaltenen Häuser und füge sie in die Tabelle ein
                houseResponse.forEach(function (house) {
                    // Asynchron die Benutzerdaten für jedes Haus basierend auf der userId abrufen
                    getUsernameByUserId(house.userId).done(function (userResponse) {
                        let username = userResponse.username;  // Hol den Benutzernamen

                        // Füge die Hausdaten mit dem dynamischen Benutzernamen in die Tabelle ein
                        $('tbody').append(
                            '<tr>' +
                            '<th scope="row">' + house.id + '</th>' +    // Haus-ID
                            '<td>' + username + '</td>' +                // Dynamischer Benutzername
                            '<td>' + house.country + '</td>' +           // Haus-Land
                            '<td>' + house.shortDescription + '</td>' +  // Haus-Beschreibung
                            '<td>' +
                            '<div class="dropdown info">' +
                            '<a class="btn prim dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">' +
                            'Edit' +
                            '</a>' +
                            '<ul class="dropdown-menu">' +
                            '<li><a class="dropdown-item" href="admin-edit-user-profile.html">Edit User Profile</a></li>' +
                            '<li><a class="dropdown-item" href="admin-overview-user.html">Edit Accommodation & Request</a></li>' +
                            '</ul>' +
                            '</div>' +
                            '</td>' +
                            '</tr>'
                        );
                    });
                });
            },
            error: function (xhr, status, error) {
                console.error('Error: ' + error);
                alert('An error occurred while fetching houses.');
            }
        });
    }

    // Lade die Häuserliste beim Laden der Seite
    loadHouses();
});
*/
