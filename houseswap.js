$(document).ready(function () {
    // Funktion zum Abrufen der Haus-ID aus der URL
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    // Hole die Haus-ID aus der URL
    let houseId = getUrlParameter('id');

    // Event-Listener für den Klick auf "Send request"
    $('#send-request').on('click', function () {
        let message = $('#message-text').val();

        // Überprüfen, ob eine Nachricht eingegeben wurde
        if (!message) {
            alert('Please enter a message.');
            return;
        }

        // Erstelle das Datenobjekt für den POST-Request
        let houseSwapData = {
            houseId: parseInt(houseId), // Stelle sicher, dass die ID als Zahl gesendet wird
            message: message,
            status: "PENDING" // Verwende 'status' wie im DTO definiert
        };

        // AJAX-POST-Request, um den HouseSwap zu erstellen
        $.ajax({
            url: 'http://localhost:8080/houseswap',  // Endpunkt für HouseSwap im Backend
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(houseSwapData),
            success: function (response) {
                // Erfolg: Modal schließen und ggf. Bestätigung anzeigen
                $('#swap-modal').modal('hide');
                //alert('House swap request successfully sent!');
            },
            error: function (xhr, status, error) {
                console.error('Status Code: ' + xhr.status);
                console.error('Response Text: ' + xhr.responseText);
                console.error('Error: ' + error);

                // Fehleranzeige für den Benutzer
                alert('An error occurred while sending the house swap request. Status: ' + xhr.status + '\n' +
                    'Error: ' + xhr.responseText);
            }
        });
    });
});
