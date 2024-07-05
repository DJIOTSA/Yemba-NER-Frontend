

// EmailJS initialization
(function () {
    // Ensure the EmailJS library is loaded
    if (typeof emailjs !== 'undefined') {
        // https://dashboard.emailjs.com/admin/account
        emailjs.init({
            publicKey: "wZ3-aYparLQ7L_WUn",
        });
    } else {
        console.error("EmailJS library not loaded.");
    }
})();


// Form submission handling
window.onload = function () {
    const form = document.querySelector('form#contact');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (form.classList.contains('okSent')) {
            // these IDs from the previous steps
            emailjs.sendForm('service_s7dq7bp', 'template_1satqv4', this)
                .then(() => {
                    showAlert('Feedback send!');
                }, (error) => {
                    showAlert('FAILED...try again later', true);
                });

                this.classList.remove('okSent')
        }

    });
}

// Function to show alert
function showAlert(message, isError = false) {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.style.backgroundColor = isError ? '#f44336' : '#4CAF50'; // Red for error, green for success
    alert.innerText = message;

    alertContainer.appendChild(alert);

    // Fade out and remove the alert after 3 seconds
    setTimeout(() => {
        alert.style.opacity = '0.5';
        setTimeout(() => {
            alert.remove();
        }, 600); // Match the transition duration
    }, 3000);
}