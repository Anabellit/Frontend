class User {
    constructor(id, salutation, other, email, password, country, pictureUrl, token, isAdmin) {
        this.id = id;
        this.salutation = salutation;
        this.other = other;
        this.email = email;
        this.password = password;
        this.country = country;
        this.pictureUrl = pictureUrl;
        this.token = token;
        this.isAdmin = isAdmin;
    }
}

const user1 = new User('1', 'Mrs.', '', 'mimilia.hoi@gmail.com','pw123', 'France', 'https://picsum.photos/id/862/150', '123', true);
const user2 = new User('2', 'Mr.', '', 'nemo.hoi@gmail.com','pw312', 'Austria', 'https://picsum.photos/id/444/150', '312', false);

// User Profile Kachel
const INPUTsalutation = document.getElementById("salut")
INPUTsalutation.setAttribute("value", "testjetzt")


let DIVtest1 = document.getElementById("test1")
console.log(DIVtest1)
DIVtest1.innerText =  `${user2.salutation}`
console.log(user1.salutation)

let DIVtest2 = document.getElementById("test2")
DIVtest2.innerText =  `${user2.email}`


/*
// Ausprobieren
let DIVOutput1 = document.getElementById("output")
DIVOutput1.textContent =  `Hello, ${user1.email}`

const firstName = user2.email.split('.')

let DIVOutput2 = document.getElementById("output1")
DIVOutput2.textContent =  `${firstName[0]}`
*/









