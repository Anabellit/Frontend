class Userprofile {
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

$(document).ready(function () {
// ajax GET Methoden mit each oder map
    $.ajax({
        method: 'GET',
        url: 'https://localhost:8080/users/1',
        dataType: 'json'
    }).done(function (data) {
        console.log(data);
        /* $.each(data, function (index, value) {
             $('#salut').append(value.street)
             $('#email').append(value.suite)
             $('#country').append(value.city)
     })*/
        $.map(data, function (value, key) {
            $('#salut').append(value.salutation);
            $('#email').append(value.email);
            $('#country').append(value.country);
        })
    })
})


/*
$('button#hole-button').click(function(){
    $.ajax({
        url: 'https://api.jsonbin.io/v3/qs/66daeefbe41b4d34e42b1960',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            console.log('complete with success and data:', result);
        },
        error: function (result) {
            console.log('complete with error');
        },
        complete: function (result) {
            console.log('complete');
        }
    }).done(function(data){
        console.log(data);
        $.map(data, function(userdata, i){
            $('#test2').val(userdata.salutation);
            console.log(userdata.salutation);
        })
    })
})
*/

/*$('#hole-button').click(function() {
    $.ajax({
        method:'GET',
        url: 'http://localhost:8080/users/2',
        dataType: 'application/json'
    }).done(function(data){
        console.log(data);
        alert('Daten bekommen');
        $.map(data, function(post, i){
            $('#salut').append('<p>'+post.body+'</p>')
            $('#email').append('<p>'+post.id+'</p>')
            $('#country').append('<p>'+post.title+'</p>')
        })
    })
})*/


// const user1 = new Userprofile('1', 'Mrs.', '', 'mimilia.hoi@gmail.com','pw123', 'France', 'https://picsum.photos/id/862/150', '123', true);
// const user2 = new Userprofile('2', 'Mr.', '', 'nemo.hoi@gmail.com','pw312', 'Austria', 'https://picsum.photos/id/444/150', '312', false);

/*
// Userprofile Profile Kachel
const INPUTsalutation = document.getElementById("salut")
INPUTsalutation.setAttribute("value", "testjetzt")


let DIVtest1 = document.getElementById("test1")
console.log(DIVtest1)
DIVtest1.innerText =  `${user2.salutation}`
console.log(user1.salutation)

//let DIVtest2 = document.getElementById("test2")
//DIVtest2.innerText =  `${user2.email}`
*/

/*
// Ausprobieren
let DIVOutput1 = document.getElementById("output")
DIVOutput1.textContent =  `Hello, ${user1.email}`

const firstName = user2.email.split('.')

let DIVOutput2 = document.getElementById("output1")
DIVOutput2.textContent =  `${firstName[0]}`
*/


// GET für user profile

// url für json: https://api.jsonbin.io/v3/qs/66daeefbe41b4d34e42b1960









