// script.js
document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const passElements = document.querySelectorAll('.pass');
    const copyDots = document.querySelectorAll('.copy-dots');

    // Character sets for password generation
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = lower + upper + numbers + symbols;

    // Generate random password of given length
    function generatePassword(length) {
        let password = '';
        
        // Ensure at least one of each type for stronger passwords
        password += lower[Math.floor(Math.random() * lower.length)];
        password += upper[Math.floor(Math.random() * upper.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];
        
        // Fill the rest randomly
        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        // Shuffle so required chars aren't always at start
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }

    // Generate and display 5 different passwords
    function generateAllPasswords() {
        let length = parseInt(input.value);
        
        // Validate input
        if (!length || length < 4) {
            input.style.borderColor = '#ff4d4d';
            input.placeholder = 'Min length is 4';
            setTimeout(() => {
                input.style.borderColor = '#d600ff';
                input.placeholder = 'Enter Password Length';
            }, 2000);
            return;
        }
        
        if (length > 32) {
            input.style.borderColor = '#ff4d4d';
            input.placeholder = 'Max length is 32';
            setTimeout(() => {
                input.style.borderColor = '#d600ff';
                input.placeholder = 'Enter Password Length';
            }, 2000);
            return;
        }

        // Generate unique password for each card
        passElements.forEach(el => {
            el.textContent = generatePassword(length);
            el.style.fontStyle = 'normal'; // remove italic once generated
        });
    }

    // Copy password to clipboard when dots clicked
    function copyPassword(e) {
        const article = e.target.closest('article');
        const password = article.querySelector('.pass').textContent;
        
        if (!password) return;
        
        navigator.clipboard.writeText(password).then(() => {
            // Visual feedback
            e.target.textContent = '✓';
            e.target.style.color = '#7fffd4';
            setTimeout(() => {
                e.target.textContent = '•••';
                e.target.style.color = '#12121a';
            }, 1000);
        });
    }

    // Event listeners
    button.addEventListener('click', generateAllPasswords);
    
    // Also generate on Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') generateAllPasswords();
    });
    
    // Add click listeners to all dot buttons
    copyDots.forEach(dot => {
        dot.addEventListener('click', copyPassword);
    });
});