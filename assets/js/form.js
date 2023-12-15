$(document).ready(function () {
    $(document).on("click", '.send-form', function () {
        let name = $('#name').val();
        let email = $('#email').val();
        let subject = $('#subject').val();
        let message = $('#message').val();

        // Walidacja pól formularza
        if (name === '' || email === '' || subject === '' || message === '') {
            Swal.fire({
                text: "Wypełnij wszystkie pola formularza",
                icon: "warning",
                buttonsStyling: false,
                confirmButtonText: "Ok, rozumiem!",
                customClass: {
                    confirmButton: "btn btn-primary"
                }
            });
            return; // Przerwij wysyłanie formularza, jeśli jakieś pole jest puste
        }

        // Walidacja emaila
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                text: "Podany email jest nieprawidłowy",
                icon: "warning",
                buttonsStyling: false,
                confirmButtonText: "Ok, rozumiem!",
                customClass: {
                    confirmButton: "btn btn-primary"
                }
            });
            return; // Przerwij wysyłanie formularza, jeśli email jest nieprawidłowy
        }

        $.ajax({
            url: 'forms/contact.php',
            method: 'POST',
            data: {
                name: name,
                email: email,
                subject: subject,
                message: message
            },
            success: function (response) {
                Swal.fire({
                    text: (response.message) ? response.message : "Pomyślnie wysłano wiadomość z prośbą o kontakt",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, rozumiem!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    },
                    willClose: function () {
                        // Po pomyślnym wysłaniu wyczyść formularz
                        $('#name').val('');
                        $('#email').val('');
                        $('#subject').val('');
                        $('#message').val('');
                    }
                });
            },
            error: function (xhr, status, error) {
                // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                Swal.fire({
                    text: (xhr.responseJSON.message) ? xhr.responseJSON.message : "Wystąpił nieznany błąd",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, rozumiem!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }
        });
    });
});
