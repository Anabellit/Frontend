$(document).ready(function () {
    // Funktion, um die Liste der Häuser vom Backend abzurufen und in die Tabelle einzufügen
    function loadHouses() {
        $.ajax({
            url: 'http://localhost:8080/houses',  // Der GET-Endpunkt in deinem Backend
            type: 'GET',
            success: function (response) {
                // Leere zuerst den Tabellen-Body, um alte Daten zu entfernen
                $('tbody').empty();

                // Iteriere durch die erhaltenen Häuser und füge sie in die Tabelle ein
                response.forEach(function (house, index) {
                    $('tbody').append(
                        '<tr>' +
                        '<th scope="row">' + house.id + '</th>' +    // Haus-ID
                        '<td>Visible</td>' +                         // Beispiel für die Sichtbarkeit
                        '<td>User</td>' +                            // Beispiel für den Benutzer (aktuell statisch)
                        '<td>' + house.country + '</td>' +           // Haus-Land
                        '<td>' + house.shortDescription + '</td>' +  // Haus-Beschreibung
                        '<td>12.02.2024, 13:40</td>' +               // Beispiel für Erstellungsdatum (statisch)
                        '<td>12.02.2024, 12:42</td>' +               // Beispiel für Aktualisierungsdatum (statisch)
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
