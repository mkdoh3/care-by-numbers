$(document).ready(function () {
    let patientName = $("#name");
    let patientEmail = $("#email");
    let patientZip = $("#zip-code");


    //Need to add validation.
    $(document).on("submit", "#patient-form", submitPatientData);


    function submitPatientData(event) {
        event.preventDefault();
        insertPatientData({
            name: patientName.val().trim(),
            email: patientEmail.val().trim(),
            zipCode: patientZip.val().trim(),
            healthScore: $('input[name="inlineRadioOptions"]:checked').val()
        });
    }

    function emptyForm() {
        patientName.val("");
        patientEmail.val("");
        patientZip.val("");
        $('input[name="inlineRadioOptions"]').prop('checked', false);
    }

    function insertPatientData(patientData) {
        $.post("/api/patient", patientData)
            .then(function () {
                console.log("You have success!");
                emptyForm();
                window.location.href = '/';
            });
    }
});
