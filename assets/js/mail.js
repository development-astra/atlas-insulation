$(document).ready(function() {
    // Use class selector to handle both forms on the page
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Find the reCAPTCHA widget within this specific form
        var $form = $(this);
        var $recaptcha = $form.find('.g-recaptcha');
        
        // Get the reCAPTCHA response token
        // Note: If multiple reCAPTCHAs exist, we need to get the right one
        // Since both use the same container class, we'll check all widgets
        var recaptchaResponse = '';
        var allWidgets = $('.g-recaptcha');
        
        // Find the widget ID for this form's reCAPTCHA
        allWidgets.each(function(index) {
            if ($.contains($form[0], this)) {
                // This reCAPTCHA belongs to the form being submitted
                recaptchaResponse = grecaptcha.getResponse(index);
                return false; // Break the loop
            }
        });
        
        // Check if reCAPTCHA is completed
        if (recaptchaResponse.length === 0) {
            alert('Please complete the reCAPTCHA verification before submitting the form.');
            return false;
        }
        
        // Get form data
        var formData = $(this).serialize();
        
        // Append reCAPTCHA response to form data
        formData += '&g-recaptcha-response=' + encodeURIComponent(recaptchaResponse);
        
        $.ajax({
            url: 'https://api.astraresults.com/send_email/v1/atlas_insulation',
            // url: 'https://0pbj0xnp-4848.asse.devtunnels.ms/send_email/v1/thunder_restoration',
            type: 'POST',
            data: formData,
            dataType: 'json',  // ← This tells jQuery to parse the response as JSON
            success: function(result) {
                console.log('=== AJAX SUCCESS ===');
                console.log('Full result:', result);
                console.log('Type of result:', typeof result);
                console.log('result.success:', result.success);
                
                if (result.success) {
                    console.log('Redirecting to thank-you.html');
                    window.location.href = 'thank-you.html';
                } else {
                    console.log('Redirecting to form-error.html (result.success is falsy)');
                    window.location.href = 'form-error.html';
                }
            },
            error: function(xhr) {
                console.log('=== AJAX ERROR ===');
                console.log('Status:', xhr.status);
                console.log('Response:', xhr.responseText);
                
                // Reset the reCAPTCHA for this form so user can try again
                var $recaptcha = $form.find('.g-recaptcha');
                var allWidgets = $('.g-recaptcha');
                
                allWidgets.each(function(index) {
                    if ($.contains($form[0], this)) {
                        grecaptcha.reset(index);
                        return false; // Break the loop
                    }
                });
                
                window.location.href = 'form-error.html';
            }
        });
    });
});

// $(document).ready(function() {
//     $('#contactForm').on('submit', function(e) {
//         e.preventDefault();
        
//         $.ajax({
//             url: 'https://api.astraresults.com/send_email/v1/atlas_insulation',
//             // url: 'https://0pbj0xnp-4848.asse.devtunnels.ms/send_email/v1/thunder_restoration',
//             type: 'POST',
//             data: $(this).serialize(),
//             dataType: 'json',  // ← This tells jQuery to parse the response as JSON
//             success: function(result) {
//                 console.log('=== AJAX SUCCESS ===');
//                 console.log('Full result:', result);
//                 console.log('Type of result:', typeof result);
//                 console.log('result.success:', result.success);
                
//                 if (result.success) {
//                     console.log('Redirecting to thank-you.html');
//                     window.location.href = 'thank-you.html';
//                 } else {
//                     console.log('Redirecting to form-error.html (result.success is falsy)');
//                     window.location.href = 'form-error.html';
//                 }
//             },
//             error: function(xhr) {
//                 console.log('=== AJAX ERROR ===');
//                 console.log('Status:', xhr.status);
//                 console.log('Response:', xhr.responseText);
//                 window.location.href = 'form-error.html';
//             }
//         });
//     });
// });