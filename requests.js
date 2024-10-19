$(document).ready(function () {
    // Funktion, um die Liste der HouseSwaps und der Häuser vom Backend abzurufen
    function loadHouseSwapsAndHouses() {
        $.when(
            // Erstes AJAX für HouseSwaps
            $.ajax({
                url: 'http://localhost:8080/houseswap',  // Endpunkt für den GET-Request, der die HouseSwaps zurückgibt
                type: 'GET'
            }),
            // Zweites AJAX für Häuser
            $.ajax({
                url: 'http://localhost:8080/houses',  // Endpunkt für den GET-Request, der die Häuser zurückgibt
                type: 'GET'
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
                        '<a class="card h-80" href="request-pending.html?houseId=&houseSwapId=" style="text-decoration: none;">' +
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



/*$(document).ready(function () {
    // Funktion, um die Liste der HouseSwaps vom Backend abzurufen
    function loadHouseSwapsAndHouses() {
        // Erstes AJAX für HouseSwaps
        $.when(
            $.ajax({
                url: 'http://localhost:8080/houseswap',  // Endpunkt für den GET-Request, der die HouseSwaps zurückgibt
                type: 'GET'
            }),
            $.ajax({
                url: 'http://localhost:8080/houses',  // Endpunkt für den GET-Request, der die Häuser zurückgibt
                type: 'GET'
            })
        ).done(function (houseSwapsResponse, housesResponse) {
            // Leere zuerst die Liste
            $('#houses-list').empty();

            // Die House-Daten aus dem zweiten Request
            let housesData = housesResponse[0]; // housesResponse ist ein Array, daher [0] für den eigentlichen Response

            // Iteriere durch die erhaltenen HouseSwaps
            houseSwapsResponse[0].forEach(function (houseswap) {
                let house = housesData.find(h => h.id === houseswap.houseId);  // Finde das zugehörige Haus
                let status = houseswap.status;  // Status von HouseSwap

                // Füge die Card für jedes HouseSwap hinzu
                if (house) {  // Sicherstellen, dass das Haus existiert
                    $('#houses-list').append(
                        '<div class="col">' +
                        '<a class="card h-80" href="request-pending.html?id=' + house.id + '" style="text-decoration: none;">' +
                        '<img src="https://picsum.photos/200/200" class="card-img-top" alt="House Image">' + // Beispielbild
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
});*/



/*
$(document).ready(function () {
    // Funktion, um die Liste der HouseSwaps vom Backend abzurufen
    function loadHouseSwaps() {
        $.ajax({
            url: 'http://localhost:8080/houseswap',  // Endpunkt für den GET-Request, der die HouseSwaps zurückgibt
            type: 'GET',
            success: function (response) {
                // Leere zuerst die Liste
                $('#houses-list').empty();

                // Iteriere durch die erhaltenen HouseSwaps und füge sie als Cards zur Liste hinzu
                response.forEach(function (houseswap) {
                    let house = houseswap.house;  // House-Daten sind im HouseSwap-Objekt
                    let status = houseswap.status;  // Status von HouseSwap

                    // Füge die Card für jedes HouseSwap hinzu
                    $('#houses-list').append(
                        '<div class="col">' +
                        '<a class="card h-80" href="acc-details.html?id=' + house.id + '" style="text-decoration: none;">' +
                        '<img src="https://picsum.photos/200/200" class="card-img-top" alt="House Image">' + // Beispielbild
                        '<span class="position-absolute top-0 end-0 text-bg-light badge p-2 m-2" style="font-weight: 500; color: black">' +
                        status + '</span>' +
                        '<div class="card-body">' +
                        '<h5 class="card-title card-tag">' + house.typeOfHouse + '</h5>' +
                        '<p class="card-text" style="font-size: 14px">' + house.country + '</p>' +
                        '</div>' +
                        '</a>' +
                        '</div>'
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error('Error: ' + error);
                alert('An error occurred while fetching house swaps.');
            }
        });
    }

    // Lade die HouseSwaps beim Laden der Seite
    loadHouseSwaps();
});*/
