$(document).ready(function () {
    // Funktion, um den JWT-Token aus dem LocalStorage zu holen
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion, um die Liste der HouseSwaps und der Häuser vom Backend abzurufen
    function loadHouseSwapsAndHouses() {
        var token = getToken();
        if (!token) {
            alert('Kein Token gefunden. Bitte einloggen.');
            return;
        }

        $.when(
            // Erstes AJAX für HouseSwaps
            $.ajax({
                url: 'http://localhost:8080/houseswap',  // Endpunkt für den GET-Request, der die HouseSwaps zurückgibt
                type: 'GET',
                headers: {
                    "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
                }
            }),
            // Zweites AJAX für Häuser
            $.ajax({
                url: 'http://localhost:8080/houses',  // Endpunkt für den GET-Request, der die Häuser zurückgibt
                type: 'GET',
                headers: {
                    "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
                }
            })
        ).done(function (houseSwapsResponse, housesResponse) {
            // Leere zuerst die Liste
            $('#houses-list').empty();

            // Die House-Daten aus dem zweiten Request
            let housesData = housesResponse[0]; // housesResponse ist ein Array, daher [0] für den eigentlichen Response

            // Iteriere durch die erhaltenen HouseSwaps
            houseSwapsResponse[0].forEach(function (houseswap) {
                let house = housesData.find(h => h.id === houseswap.houseId);  // Finde das zugehörige Haus anhand der houseId
                let status = houseswap.status;  // Status von HouseSwap

                // Füge die Card für jedes HouseSwap hinzu, wenn das Haus existiert
                if (house) {
                    $('#houses-list').append(
                        '<div class="col">' +
                        // Dynamisch die houseId und houseSwapId in die URL einsetzen
                        '<a class="card h-80" href="request-pending.html?houseId=' + house.id + '&houseSwapId=' + houseswap.id + '" style="text-decoration: none;">' +
                        '<img src="https://picsum.photos/200/200" class="card-img-top" alt="House Image">' +
                        '<span class="position-absolute top-0 end-0 text-bg-light badge p-2 m-2" style="font-weight: 500; color: black">' +
                        status + '</span>' +
                        '<div class="card-body">' +
                        '<h5 class="card-title card-tag">' + house.typeOfHouse + '</h5>' +
                        '<p class="card-text" style="font-size: 14px">' + house.country + '</p>' +
                        '</div>' +
                        '</a>' +
                        '</div>'
                    );
                }
            });
        }).fail(function (xhr, status, error) {
            console.error('Error: ' + error);
            alert('An error occurred while fetching house swaps or houses.');
        });
    }

    // Lade die HouseSwaps und Houses beim Laden der Seite
    loadHouseSwapsAndHouses();
});


