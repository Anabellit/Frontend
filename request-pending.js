$(document).ready(function () {
    // Funktion zum Abrufen der Parameter aus der URL
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    // Hole die Haus-ID und die HouseSwap-ID aus der URL
    let houseId = getUrlParameter('houseId');
    let houseSwapId = getUrlParameter('houseSwapId');

    // Lade die Haus- und HouseSwap-Daten
    function loadHouseAndSwapDetails() {
        // Zuerst: AJAX-Request für die Hausdetails (/houses/{id})
        $.ajax({
            url: 'http://localhost:8080/houses/' + houseId,  // Endpunkt für Hausdaten
            type: 'GET',
            success: function (houseResponse) {
                // Fülle die HTML-Elemente mit den Hausdaten
                $('#houseType').html(houseResponse.typeOfHouse);
                $('#houseTitle').html(houseResponse.title);
                $('#houseSubtitle').html(houseResponse.subtitle);
                $('#houseShort').html(houseResponse.shortDescription);
                $('#houseLong').html(houseResponse.longDescription);

                // Zeige oder verstecke die Amenities mithilfe von "toggle"
                $('#checkin').toggle(!!houseResponse.hasSelfCheckin);  // Falls true, wird es angezeigt
                $('#kitchen').toggle(!!houseResponse.hasKitchen);
                $('#wifi').toggle(!!houseResponse.hasWifi);
                $('#streaming').toggle(!!houseResponse.hasStreaming);
                $('#homeoffice').toggle(!!houseResponse.hasHomeOffice);
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Hausdaten:', error);
                alert('Ein Fehler ist aufgetreten.');
            }
        });

        // Zweitens: AJAX-Request für die HouseSwap-Daten (/houseswap/{id})
        $.ajax({
            url: 'http://localhost:8080/houseswap/' + houseSwapId,  // Endpunkt für HouseSwap-Daten
            type: 'GET',
            success: function (swapResponse) {
                // Fülle die HTML-Elemente mit den HouseSwap-Daten
                $('#swapMessage').html(swapResponse.message);  // Zeige die Nachricht des HouseSwaps
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der HouseSwap-Daten:', error);
                alert('Ein Fehler ist aufgetreten.');
            }
        });
    }

    // Lade die Haus- und HouseSwap-Daten beim Laden der Seite
    loadHouseAndSwapDetails();
});



/*$(document).ready(function () {
    // Funktion zum Abrufen der Haus-ID aus der URL
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    // Hole die Haus-ID aus der URL
    let houseId = getUrlParameter('id');

    // Lade die Haus- und HouseSwap-Daten
    function loadHouseAndSwapDetails() {
        // Zuerst: AJAX-Request für die Hausdetails (/houses/{id})
        $.ajax({
            url: 'http://localhost:8080/houses/' + houseId,  // Endpunkt für Hausdaten
            type: 'GET',
            success: function (houseResponse) {
                // Fülle die HTML-Elemente mit den Hausdaten
                $('#houseType').html(houseResponse.typeOfHouse);
                $('#houseTitle').html(houseResponse.title);
                $('#houseSubtitle').html(houseResponse.subtitle);
                $('#houseShort').html(houseResponse.shortDescription);
                $('#houseLong').html(houseResponse.longDescription);

                // Zeige oder verstecke die Amenities mithilfe von "toggle"
                $('#checkin').toggle(!!houseResponse.hasSelfCheckin);  // Falls true, wird es angezeigt
                $('#kitchen').toggle(!!houseResponse.hasKitchen);
                $('#wifi').toggle(!!houseResponse.hasWifi);
                $('#streaming').toggle(!!houseResponse.hasStreaming);
                $('#homeoffice').toggle(!!houseResponse.hasHomeOffice);
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Hausdaten:', error);
                alert('Ein Fehler ist aufgetreten.');
            }
        });

        // Zweitens: AJAX-Request für die HouseSwap-Daten (/houseswap/{id})
        $.ajax({
            url: 'http://localhost:8080/houseswap/' + houseId,  // Endpunkt für HouseSwap-Daten
            type: 'GET',
            success: function (swapResponse) {
                // Fülle die HTML-Elemente mit den HouseSwap-Daten
                $('#swapMessage').html(swapResponse.message);  // Zeige die Nachricht des HouseSwaps
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der HouseSwap-Daten:', error);
                alert('Ein Fehler ist aufgetreten.');
            }
        });
    }

    // Lade die Haus- und HouseSwap-Daten beim Laden der Seite
    loadHouseAndSwapDetails();
});*/
