$(document).ready(function () {
    // Funktion zum Auslesen des URL-Parameters (Haus-ID)
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    // Hole die Haus-ID aus der URL
    let houseId = getUrlParameter('id');

    // Funktion zum Laden des Hauses basierend auf der Haus-ID
    function loadHouse() {
        if (!houseId) {
            alert('No house ID found in the URL');
            return;
        }

        $.ajax({
            url: 'http://localhost:8080/houses/' + houseId,  // Dynamische URL mit der Haus-ID
            type: 'GET',
            success: function (response) {
                // Fülle die HTML-Elemente mit den Daten des Hauses
                $('#houseType').html(response.typeOfHouse);
                $('#houseTitle').html(response.title);
                $('#houseSubtitle').html(response.subtitle);
                $('#houseShort').html(response.shortDescription);
                $('#houseLong').html(response.longDescription);

                // Zeige oder verstecke die Amenities je nach Wert vom Backend
                $('#checkin').toggle(response.hasSelfCheckin);
                $('#kitchen').toggle(response.hasKitchen);
                $('#wifi').toggle(response.hasWifi);
                $('#streaming').toggle(response.hasStreaming);
                $('#homeoffice').toggle(response.hasHomeOffice);

                // Für Supermarkets als Beispiel statisch gelassen, falls benötigt, anpassbar
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









