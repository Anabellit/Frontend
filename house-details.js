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
                        '<div class="col-4">' + '<a class="card" href="acc-details.html" style="text-decoration: none;">'
                        + '<img src="https://picsum.photos/id/441/200" class="card-img-top" alt="...">' +
                        '<div class="card-body" href="#">' +
                        '<p class="card-title card-tag">' + house.typeOfHouse + '</p>' +
                        '<p class="card-text" style="font-size: 14px">' + house.country + '</p>' +
                        '</div>' + '</a>' + '</div>'
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

<div class="row row-cols-1 row-cols-md-2">
    <!--left side-->
    <div class="col">
        <div>
            <h6 class="pt-3">Spacious 110м2 flat in the city center</h6>
            <p>Ideal for couples. Cosy apartment in a safe and hip district.</p>
        </div>
        <hr>
            <ul class="list-inline">
                <li class="list-inline-item"><i class="bi-person-circle icons-prim"></i></li>
                <li class="list-inline-item info">Host Mimi Sierra</li>
            </ul>
            <hr>
                <p>Experience Vienna's vibrant 9th district in our bright and super spacious apartment. With 110,4 square
                    meters, central but calm location, 2 separate bedrooms with grand king-size beds, kitchen and living
                    room, this completely renovated haven, bathed in natural light, accommodates up to 6 (+ small child)
                    guests. It’s located on the second floor and is effortlessly accessible by both stairs and elevator.
                    Pet-friendly! An unforgettable experience in Vienna awaits!</p>
                <p>This place is equipped with absolutely everything you need for a pleasant stay. Windows overlook the
                    inner courtyard and the street, which means that you can observe the street life from inside, but noises
                    from outside won’t keep you from enjoying the pleasant atmosphere in the apartment.</p>
    </div>




