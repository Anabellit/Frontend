$(document).ready(function () {
    // Funktion zum Abrufen des JWT-Tokens aus dem LocalStorage
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion zum Abrufen der houseId aus der URL
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    // Hole die houseId aus der URL
    let houseId = getUrlParameter('houseId');

    // Funktion zum Abrufen der HouseSwaps für eine bestimmte houseId
    function loadHouseSwapsForHouse() {
        var token = getToken();
        if (!token) {
            alert('Kein Token gefunden. Bitte einloggen.');
            return;
        }

        // Zuerst: AJAX-Request für die House-Daten (/houses/{id})
        $.ajax({
            url: 'http://localhost:8080/houses/' + houseId,  // Endpunkt für Hausdaten
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function (houseResponse) {
                // Hole den Titel und den Benutzer (Host)
                let title = houseResponse.title;
                let userId = houseResponse.userId;

                // Zweitens: AJAX-Request für den Benutzernamen (/users/{id})
                $.ajax({
                    url: `http://localhost:8080/users/${userId}`,  // Endpunkt für Benutzerdaten
                    type: 'GET',
                    headers: {
                        "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
                    },
                    success: function (userResponse) {
                        let username = userResponse.username;  // Host-Benutzername

                        // Drittes: AJAX-Request für alle HouseSwaps
                        $.ajax({
                            url: 'http://localhost:8080/houseswap',  // Endpunkt für den GET-Request, der alle HouseSwaps zurückgibt
                            type: 'GET',
                            headers: {
                                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
                            },
                            success: function (houseSwapsResponse) {
                                // Leere zuerst die Tabelle
                                $('tbody').empty();

                                // Iteriere durch die erhaltenen HouseSwaps und filtere sie basierend auf houseId
                                houseSwapsResponse.forEach(function (houseswap) {
                                    if (houseswap.houseId == houseId) {  // Filtere nach houseId
                                        // Füge die Daten für jedes passende HouseSwap in die Tabelle ein
                                        $('tbody').append(
                                            '<tr>' +
                                            '<th scope="row">' + houseswap.houseId + '</th>' +  // Haus-ID
                                            '<td>' + title + '</td>' +  // Titel des Hauses
                                            '<td>' + username + '</td>' +  // Username des Hausbesitzers
                                            '<td>' + houseswap.status + '</td>' +  // Status des HouseSwaps
                                            '<td>' +
                                            '<div class="dropdown info">' +
                                            '<a class="btn prim dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">' +
                                            'Change Request Status' +
                                            '</a>' +
                                            '<ul class="dropdown-menu">' +
                                            '<li><a class="dropdown-item swap-status" data-id="' + houseswap.id + '" data-status="Declined" href="#">Decline</a></li>' +
                                            '<li><a class="dropdown-item swap-status" data-id="' + houseswap.id + '" data-status="Accepted" href="#">Accept</a></li>' +
                                            '<li><a class="dropdown-item swap-status" data-id="' + houseswap.id + '" data-status="Pending" href="#">Pending</a></li>' +
                                            '</ul>' +
                                            '</div>' +
                                            '</td>' +
                                            '</tr>'
                                        );
                                    }
                                });

                                // Event-Handler für die Status-Schaltflächen
                                $('.swap-status').on('click', function (event) {
                                    event.preventDefault();
                                    let houseSwapId = $(this).data('id');
                                    let status = $(this).data('status');
                                    updateHouseSwapStatus(houseSwapId, status);
                                });
                            },
                            error: function (xhr, status, error) {
                                console.error('Fehler beim Abrufen der HouseSwaps: Status ' + xhr.status + ', ' + xhr.statusText);
                                alert('Fehler beim Abrufen der HouseSwaps: ' + xhr.status + ' - ' + xhr.statusText);
                            }
                        });
                    },
                    error: function (xhr, status, error) {
                        console.error('Fehler beim Abrufen der Benutzerdaten: Status ' + xhr.status + ', ' + xhr.statusText);
                        alert('Fehler beim Abrufen der Benutzerdaten: ' + xhr.status + ' - ' + xhr.statusText);
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Abrufen der Hausdaten: Status ' + xhr.status + ', ' + xhr.statusText);
                alert('Fehler beim Abrufen der Hausdaten: ' + xhr.status + ' - ' + xhr.statusText);
            }
        });
    }

    // Funktion zum Senden eines PUT-Requests für den HouseSwap-Status
    function updateHouseSwapStatus(houseSwapId, status) {
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
                message: 'Status updated to ' + status,  // Beispielnachricht
                status: status  // Entweder 'Accepted', 'Declined' oder 'Pending'
            }),
            success: function (response) {
                alert('Status erfolgreich auf ' + status + ' gesetzt.');
                window.location.href = "admin-edit-user-requests.html?houseId=" + houseId;  // Zurück zur Requests-Seite
            },
            error: function (xhr, status, error) {
                console.error('Fehler beim Aktualisieren des HouseSwap-Status: Status ' + xhr.status + ', ' + xhr.statusText);
                alert('Fehler beim Aktualisieren des HouseSwap-Status: ' + xhr.status + ' - ' + xhr.statusText);
            }
        });
    }

    // Lade die HouseSwaps für das Haus, wenn die Seite geladen wird
    loadHouseSwapsForHouse();
});
