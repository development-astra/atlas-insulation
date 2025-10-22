$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        $.ajax({
            url: 'https://api.astraresults.com/send_email/v1/atlas_insulation',
            // url: 'https://0pbj0xnp-4848.asse.devtunnels.ms/send_email/v1/thunder_restoration',
            type: 'POST',
            data: $(this).serialize(),
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
                window.location.href = 'form-error.html';
            }
        });
    });
});