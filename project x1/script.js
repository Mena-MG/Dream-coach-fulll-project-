document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error states
        resetErrors();
        
        // Validate form
        if (validateForm()) {
            // Here you would typically send the data to your server
            console.log('Form submitted successfully');
            form.reset();
        }
    });

    // Real-time password match validation
    confirmPassword.addEventListener('input', function() {
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
        } else {
            removeError(confirmPassword);
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Validate required fields
        const requiredFields = form.querySelectorAll('input[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            }
        });

        // Validate email format
        const email = document.getElementById('email');
        if (email.value && !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (password.value && password.value.length < 8) {
            showError(password, 'Password must be at least 8 characters long');
            isValid = false;
        }

        // Validate password match
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }

        // Validate phone number
        const phone = document.getElementById('phoneNumber');
        if (phone.value && !isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^\+?[\d\s-]{10,}$/.test(phone);
    }

    function showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '-10px';
        errorDiv.style.marginBottom = '10px';
        errorDiv.textContent = message;
        
        element.style.borderColor = 'red';
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
    }

    function removeError(element) {
        element.style.borderColor = '';
        const errorDiv = element.nextSibling;
        if (errorDiv && errorDiv.className === 'error-message') {
            errorDiv.remove();
        }
    }

    function resetErrors() {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.style.borderColor = '');
    }

    // Google Sign Up button handler
    const googleBtn = document.querySelector('.google-btn');
    googleBtn.addEventListener('click', function() {
        // Implement Google Sign Up logic here
        console.log('Google Sign Up clicked');
    });
});
