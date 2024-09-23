// Handling von Other
// Zuerst das Other Inputfeld nicht anzeigen
$('#other-form').hide();

// wenn der select-wert "Other" ist, dann mach show das Other-Inputfeld
$(document).ready(function () {
    $('#select-salutation').change(function () {
        if ($('#select-salutation').val() === 'Other') {
            $('#other-form').show();
        } else {
            $('#other-form').hide();
        }
    });


////////////////////////////////////////////////////////////////////////////////
    /*
       $('#psw, #psw2').on('keyup', function () {
           if ($('#psw').val() === $('#psw2').val()) {
               psw2.classList.remove("invalid");
               psw2.classList.add("valid");
           } else
               psw2.classList.remove("valid");
           psw2.classList.add("invalid");
       });

       $('#pswRe').change(function () {
           if ($('#psw').classList.('invalid') {
               $('#psw2').show();
           } else {
               $('#psw2').hide();
           }
       });*/
/*
    $('.selectcountry').selectpicker();
    $('.countrypicker').countrypicker();*/
});

//confirm same password
/*function checkSamePw (){
    const pswRe = document.getElementById("pswRe")
}
    const psw1 = document.getElementById("psw")
    const psw2 = document.getElementById("psw2")

    if(psw1.value === psw2.value){
        psw2.classList.remove("invalid");
        psw2.classList.add("valid");
    } else {
        psw2.classList.remove("valid");
        psw2.classList.add("invalid");
}*/

// für password validation message
/*
const myInput = document.getElementById("psw");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const special = document.getElementById("special");
const length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
    document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function () {
    document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
    // Validate numbers
    const numbers = /\d/g;
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate lowercase letters
    const lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    const upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate special characters
    const special = /\W/g;
    if (myInput.value.match(special)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 12) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}
*/



// Example starter JavaScript for disabling form submissions if there are invalid fields // von bootstrap
/*  (function () {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
          .forEach(function (form) {
              form.addEventListener('submit', function (event) {
                  if (!form.checkValidity()) {
                      event.preventDefault()
                      event.stopPropagation()
                  }

                  form.classList.add('was-validated')
              }, false)
          })
  })()*/


//Versuch onblur (geht nicht mit was-validated --> siehe "server-side validation" von bootstrap
/*  // On blur validation listener for form elements
  $('.needs-validation').find('input,select').on('focusout', function () {
      // check element validity and change class
      $(this).removeClass('is-valid is-invalid')
          .addClass(this.checkValidity() ? 'is-valid' : 'is-invalid');
  });*/