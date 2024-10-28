$(document).ready(function() {
    // Funktion, um die Liste der Häuser vom Backend abzurufen
    function loadHouses() {
        $.ajax({
            url: 'http://localhost:8080/houses',  // Der GET-Endpunkt in deinem Backend
            type: 'GET',
            success: function(response) {
                // Leere zuerst die Liste
                $('#houses-list').empty();

                // Iteriere durch die erhaltenen Häuser und füge sie zur Liste hinzu
                response.forEach(function(house) {
                    $('#houses-list').append(
                        '<div class="col">' +
                        // Dynamisch die ID in die URL der Details-Seite einfügen
                        '<a class="card h-80" href="acc-details_loggedOUT.html?id=' + house.id + '" style="text-decoration: none;">' +
                        '<img src="https://picsum.photos/200/200" class="card-img-top" alt="House Image">' + // Beispielbild
                        '<div class="card-body">' +
                        '<h5 class="card-title card-tag">' + house.typeOfHouse + '</h5>' +
                        '<p class="card-text" style="font-size: 14px">' + house.country + '</p>' +
                        '</div>' +
                        '</a>' +
                        '</div>'
                    );
                });
            },
            error: function(xhr, status, error) {
                console.error('Error: ' + error);
                alert('An error occurred while fetching houses.');
            }
        });
    }

    // Lade die Häuserliste beim Laden der Seite
    loadHouses();
});


