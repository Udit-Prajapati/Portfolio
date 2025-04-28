// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add scroll-based header styling
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.style.backgroundColor = '#181f27';
});

// Add animation to project cards
const projectCards = document.querySelectorAll('.project-card');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Profile image upload and preview with Apply button and persistence
const profilePicInput = document.getElementById('profilePicInput');
const profileImage = document.getElementById('profileImage');
const applyProfilePicBtn = document.getElementById('applyProfilePicBtn');

let tempProfileImageData = null;

// Load saved image from localStorage on page load
if (profileImage) {
    const savedImage = localStorage.getItem('profileImageData');
    if (savedImage) {
        profileImage.src = savedImage;
    }
}

if (profilePicInput && profileImage && applyProfilePicBtn) {
    profilePicInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                tempProfileImageData = e.target.result;
                profileImage.src = tempProfileImageData;
                applyProfilePicBtn.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    applyProfilePicBtn.addEventListener('click', function() {
        if (tempProfileImageData) {
            localStorage.setItem('profileImageData', tempProfileImageData);
            applyProfilePicBtn.style.display = 'none';
        }
    });
}

// EmailJS contact form integration
const emailForm = document.getElementById('contactForm');
if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        emailjs.sendForm('service_rnqvrut', 'template_uoai4zb', this, 'XH59mWIicXxokzia5')
            .then(function() {
                alert('Message sent successfully!');
                emailForm.reset();
            }, function(error) {
                alert('Failed to send message. Please try again later.');
                console.error('EmailJS error:', error);
            });
    });
}

