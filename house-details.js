$(document).ready(function () {
    function loadHouse() {
        $.ajax({
            url: 'http://localhost:8080/houses/2',  // Der GET-Endpunkt für das Haus mit ID 1
            type: 'GET',
            success: function (response) {
                // Fülle die HTML-Elemente mit den Daten des Hauses
                $('#houseType').html(response.typeOfHouse);
                $('#houseTitle').html(response.title);
                $('#houseSubtitle').html(response.subtitle);
                $('#houseShort').html(response.shortDescription);
                $('#houseLong').html(response.longDescription);

                // Zeige oder verstecke die Amenities je nach Wert vom Backend
                if (response.hasSelfCheckin) {
                    $('#checkin').show();
                } else {
                    $('#checkin').hide();
                }

                if (response.hasKitchen) {
                    $('#kitchen').show();
                } else {
                    $('#kitchen').hide();
                }

                if (response.hasWifi) {
                    $('#wifi').show();
                } else {
                    $('#wifi').hide();
                }

                if (response.hasStreaming) {
                    $('#streaming').show();
                } else {
                    $('#streaming').hide();
                }

                if (response.hasHomeOffice) {
                    $('#homeoffice').show();
                } else {
                    $('#homeoffice').hide();
                }

                // Für Supermarkets als Beispiel statisch gelassen
            },
            error: function (xhr, status, error) {
                console.error('Error: ' + error);
                alert('An error occurred while fetching the house details.');
            }
        });
    }

    // Lade das Haus beim Laden der Seite
    loadHouse();
});







