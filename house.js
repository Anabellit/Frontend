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

const house1 = new House('1', 'Luftschloss', 'this is the description text', 'Wien, Austria', '1', 'https://picsum.photos/id/111/150', true);
const house2 = new House('2', 'House', 'this is the second description text', 'Kiel, Deutschland', '2', 'https://picsum.photos/id/112/150', false);

let Phouse1type = document.getElementById("house1type")
Phouse1type.textContent = `${house1.type}`

let Phouse1location = document.getElementById("house1location")
Phouse1location.textContent = `${house1.description}`
