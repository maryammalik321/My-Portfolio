// portfolio-website/js/script.js
// JavaScript for Portfolio Assignment - meets all project requirements

/* 
ASSIGNMENT REQUIREMENTS COVERED:
- Form validation (Contact Page)
- Dynamic content updates (FAQ Page)
- DOM manipulation (All Pages)
- Simple animations (Home Page)
- Responsive navbar (All Pages)
*/

// ====== MOBILE NAVIGATION TOGGLE ======
// (Requirement: Responsive navbar with smooth scrolling)
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Simple animation for hamburger icon
            hamburger.classList.toggle('open');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId.startsWith('#')) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ====== CONTACT FORM VALIDATION ======
    // (Requirement: Form validation with real-time feedback)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = [
            { element: 'name', type: 'text', required: true },
            { element: 'email', type: 'email', required: true },
            { element: 'message', type: 'textarea', required: true }
        ];

        // Validate on form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            inputs.forEach(input => {
                const field = document.getElementById(input.element);
                if (input.required && field.value.trim() === '') {
                    showError(field, 'This field is required');
                    isValid = false;
                } else if (input.type === 'email' && !isValidEmail(field.value)) {
                    showError(field, 'Please enter a valid email');
                    isValid = false;
                } else {
                    hideError(field);
                }
            });

            if (isValid) {
                // Simulate form submission
                document.getElementById('form-success').style.display = 'block';
                contactForm.reset();
                setTimeout(() => {
                    document.getElementById('form-success').style.display = 'none';
                }, 3000);
            }
        });

        // Real-time validation for email field
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('input', function() {
                if (this.value.trim() !== '' && !isValidEmail(this.value)) {
                    showError(this, 'Please enter a valid email');
                } else {
                    hideError(this);
                }
            });
        }
    }

    // ====== FAQ ACCORDION ======
    // (Requirement: Collapsible sections using JavaScript)
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isOpen = question.classList.contains('active');
                
                // Close all FAQs first
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.style.maxHeight = null;
                });
                faqQuestions.forEach(q => q.classList.remove('active'));
                
                // Open clicked one if it was closed
                if (!isOpen) {
                    question.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    // ====== PROJECT GALLERY FILTER ======
    // (Requirement: Dynamic content updates - for projects page)
    const filterButtons = document.querySelectorAll('.project-filter button');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const projects = document.querySelectorAll('.project-card');
                
                projects.forEach(project => {
                    if (filterValue === 'all' || project.classList.contains(filterValue)) {
                        project.style.display = 'block';
                        // Simple fade-in animation
                        project.style.animation = 'fadeIn 0.5s ease-in';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }

    // ====== HELPER FUNCTIONS ======
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        input.style.borderColor = '#ff4444';
    }

    function hideError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.style.display = 'none';
        input.style.borderColor = '#ddd';
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ====== SIMPLE ANIMATIONS ======
    // (Requirement: Simple animations)
    const animateElements = document.querySelectorAll('.animate');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('load', function() {
        setTimeout(() => {
            animateElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 150 * index);
            });
        }, 300);
    });
});
