$(document).ready(function() {
    // Funktion, um den JWT-Token aus dem LocalStorage zu holen
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    // Funktion, um die Liste der Häuser vom Backend abzurufen und im Frontend zu filtern
    function loadHouses() {
        const token = getToken();
        if (!token) {
            alert('Kein Token gefunden. Bitte einloggen.');
            return;
        }

        // GET-Request zum Abrufen aller Häuser
        $.ajax({
            url: 'http://localhost:8080/houses',  // Endpunkt für alle Häuser
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + token  // JWT-Token im Authorization-Header mitsenden
            },
            success: function(response) {
                // Speichere die abgerufenen Daten für die lokale Filterung
                window.allHouses = response;
                displayHouses(response);  // Zeige die initiale Liste der Häuser an
            },
            error: function(xhr, status, error) {
                console.error('Error: ' + error);
                alert('An error occurred while fetching houses.');
            }
        });
    }

    // Funktion zur Anzeige der gefilterten Häuserliste
    function displayHouses(houses) {
        $('#houses-list').empty();  // Liste zurücksetzen

        // Iteriere durch die Häuser und füge sie zur Liste hinzu
        houses.forEach(function(house) {
            $('#houses-list').append(
                `<div class="col">
                    <a class="card h-80" href="acc-details.html?id=${house.id}" style="text-decoration: none;">
                        <img src="https://picsum.photos/200/200" class="card-img-top" alt="House Image">
                        <div class="card-body">
                            <h5 class="card-title card-tag">${house.typeOfHouse}</h5>
                            <p class="card-text" style="font-size: 14px">${house.country}</p>
                        </div>
                    </a>
                </div>`
            );
        });
    }

    // Funktion zum Anwenden aller Filter (Suche, Land, Typ)
    function applyFilters() {
        const searchQuery = $('#suche').val().toLowerCase();
        const selectedCountry = $('#suche-country').val();
        const selectedType = $('#suche-type').val();

        // Filter die Daten basierend auf Suche, Land und Typ
        const filteredHouses = window.allHouses.filter(house => {
            const matchesSearch = house.typeOfHouse.toLowerCase().includes(searchQuery) ||
                house.country.toLowerCase().includes(searchQuery);
            const matchesCountry = selectedCountry === "Filter by: Country" || house.country === selectedCountry;
            const matchesType = selectedType === "Filter by: Type of Housing" || house.typeOfHouse === selectedType;

            return matchesSearch && matchesCountry && matchesType;
        });

        displayHouses(filteredHouses);  // Zeige die gefilterte Liste an
    }

    // Event-Listener für die Sucheingabe zur lokalen Filterung
    $('#suche').on('input', applyFilters);

    // Event-Listener für die Dropdowns zur lokalen Filterung
    $('#suche-country').on('change', applyFilters);
    $('#suche-type').on('change', applyFilters);

    // Lade die Häuserliste beim Laden der Seite
    loadHouses();
});
