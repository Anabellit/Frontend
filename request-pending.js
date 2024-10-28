$(document).ready(function () {
    // Funktion zum Abrufen des Tokens aus dem LocalStorage
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion zum Abrufen der Parameter aus der URL
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    // Hole die Haus-ID und die HouseSwap-ID aus der URL
    let houseId = getUrlParameter('houseId');
    let houseSwapId = getUrlParameter('houseSwapId');

    // Funktion zum Extrahieren der User-ID aus dem JWT-Token
    function getUserIdFromToken(token) {
        let decodedToken = jwt_decode(token);
        return decodedToken.userId;  // Annahme: userId ist ein Claim im Token
    }

    // Lade die Haus- und HouseSwap-Daten
    function loadHouseAndSwapDetails() {
        var token = getToken();
        if (!token) {
            alert('Kein Token gefunden. Bitte einloggen.');
            return;
        }

        // Extrahiere die userId des eingeloggten Benutzers aus dem Token
        let loggedInUserId = getUserIdFromToken(token);

        // Zuerst: AJAX-Request für die Hausdetails (/houses/{id})
        $.ajax({
            url: 'http://localhost:8080/houses/' + houseId,  // Endpunkt für Hausdaten
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (houseResponse) {
                console.log("Token im Header gesendet: ", token);  // Ausgabe des gesendeten Tokens

                // Fülle die HTML-Elemente mit den Hausdaten
                $('#houseType').html(houseResponse.typeOfHouse);
                $('#houseTitle').html(houseResponse.title);
                $('#houseSubtitle').html(houseResponse.subtitle);
                $('#houseShort').html(houseResponse.shortDescription);
                $('#houseLong').html(houseResponse.longDescription);

                // Zeige oder verstecke die Amenities mithilfe von "toggle"
                $('#checkin').toggle(!!houseResponse.hasSelfCheckin);
                $('#kitchen').toggle(!!houseResponse.hasKitchen);
                $('#wifi').toggle(!!houseResponse.hasWifi);
                $('#streaming').toggle(!!houseResponse.hasStreaming);
                $('#homeoffice').toggle(!!houseResponse.hasHomeOffice);

                // Lade die Benutzerdaten basierend auf der userId aus den Hausdaten
                loadHostUser(houseResponse.userId);

                // Überprüfe, ob die `userId` des eingeloggten Benutzers mit der `userId` aus der Hausanfrage übereinstimmt
                if (houseResponse.userId === loggedInUserId) {
                    // Zeige die Schaltflächen "Accept" und "Decline" an
                    $('#swap-accept').show();
                    $('#swap-decline').show();
                } else {
                    // Verstecke die Schaltflächen, wenn die User-ID nicht übereinstimmt
                    $('#swap-accept').hide();
                    $('#swap-decline').hide();
                }
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Hausdaten: Status ' + xhr.status + ', ' + xhr.statusText);
                console.error('Response: ' + xhr.responseText);
                alert('Fehler beim Abrufen der Hausdaten: ' + xhr.status + ' - ' + xhr.statusText);
            }
        });

        // Zweitens: AJAX-Request für die HouseSwap-Daten (/houseswap/{id})
        $.ajax({
            url: 'http://localhost:8080/houseswap/' + houseSwapId,  // Endpunkt für HouseSwap-Daten
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (swapResponse) {
                // Fülle die HTML-Elemente mit den HouseSwap-Daten
                $('#swapMessage').html(swapResponse.message);  // Zeige die Nachricht des HouseSwaps
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der HouseSwap-Daten: Status ' + xhr.status + ', ' + xhr.statusText);
                console.error('Response: ' + xhr.responseText);
                alert('Fehler beim Abrufen der HouseSwap-Daten: ' + xhr.status + ' - ' + xhr.statusText);
            }
        });
    }

    // Funktion zum Laden der Benutzerdaten für den Host
    function loadHostUser(userId) {
        var token = getToken();
        $.ajax({
            url: `http://localhost:8080/users/${userId}`,  // Endpunkt für Benutzerdaten
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (userResponse) {
                $('#host-user').text(userResponse.username);  // Host-User anzeigen
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Benutzerdaten: Status ' + xhr.status + ', ' + xhr.statusText);
                alert('Fehler beim Abrufen der Benutzerdaten: ' + xhr.status + ' - ' + xhr.statusText);
            }
        });
    }

    // Funktion zum Senden eines PUT-Requests für den HouseSwap-Status
    function updateHouseSwapStatus(status) {
        var token = getToken();
        $.ajax({
            url: 'http://localhost:8080/houseswap/' + houseSwapId,  // Endpunkt für den PUT-Request
            type: 'PUT',
            headers: {
                "Authorization": "Bearer " + token,  // JWT-Token im Authorization-Header mitsenden
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                id: houseSwapId,
                houseId: houseId,
                message: $('#swapMessage').text(),  // Nutzt die aktuelle Nachricht
                status: status  // Entweder 'Accepted' oder 'Declined'
            }),
            success: function (response) {
                alert('Status erfolgreich auf ' + status + ' gesetzt.');
                window.location.href = "requests.html";  // Zurück zur Requests-Seite
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Aktualisieren des HouseSwap-Status: Status ' + xhr.status + ', ' + xhr.statusText);
                alert('Fehler beim Aktualisieren des HouseSwap-Status: ' + xhr.status + ' - ' + xhr.statusText);
            }
        });
    }

    // Event-Handler für die "Accept"-Schaltfläche
    $('#swap-accept').click(function (event) {
        event.preventDefault();
        updateHouseSwapStatus('Accepted');
    });

    // Event-Handler für die "Decline"-Schaltfläche
    $('#swap-decline').click(function (event) {
        event.preventDefault();
        updateHouseSwapStatus('Declined');
    });

    // Lade die Haus- und HouseSwap-Daten beim Laden der Seite
    loadHouseAndSwapDetails();
});
