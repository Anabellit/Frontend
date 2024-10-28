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
})

