class House {
    constructor(id, type, caption, description, address, userId, pictureUrl, amenities) {
        this.id = id;
        this.type = type;
        this.caption = caption;
        this.description = description;
        this.address = address;
        this.userId = userId;
        this.pictureUrl = pictureUrl;
        this.amenities = amenities;
    }
}

/*
const house1 = new House('1', 'Luftschloss', 'this is the description text', 'Wien, Austria', '1', 'https://picsum.photos/id/111/150', true);
const house2 = new House('2', 'House', 'this is the second description text', 'Kiel, Deutschland', '2', 'https://picsum.photos/id/112/150', false);

let Phouse1type = document.getElementById("house1type")
Phouse1type.textContent = `${house1.type}`

let Phouse1location = document.getElementById("house1location")
Phouse1location.textContent = `${house1.description}`
 */

/*
// ziel: poste von registration accommodation ein house ins backend in die datenbank
var token = ""

$('#register').on('click', async function () {
    const data = {
        type: $('#select-type').val(),
        address: $('#select-country-house').val(),
        description: $('#title').val(),
        caption: $('#subtitle').val(),
        shortdescription: $('#short').val(),
        longdescription: $('#long').val(),
    }

    await $.ajax({
        type: "POST",
        async: false,
        url: "http://localhost:8080/houses",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .done(function (response) {
            console.log(response)
        })

})
*/