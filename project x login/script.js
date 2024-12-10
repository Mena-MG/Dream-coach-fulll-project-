document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon (you'll need to update the image source accordingly)
        const eyeIcon = this.querySelector('.eye-icon');
        eyeIcon.src = type === 'password' ? 'eye.svg' : 'eye-slash.svg';
    });

    // Form submission
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        
        // Add your login logic here
        console.log('Login attempt:', { email, password });
    });

    // Google login
    const googleLogin = document.querySelector('.google-login');
    googleLogin.addEventListener('click', function() {
        // Add your Google login logic here
        console.log('Google login clicked');
    });
});
