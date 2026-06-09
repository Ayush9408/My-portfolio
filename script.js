// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to header with smooth transition
window.addEventListener('scroll', function () {
    const header = document.querySelector('.page-header');
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = 'var(--card-shadow)';
    }
});

// Intersection Observer for fade-in animation with better timing
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards with initial state
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    observer.observe(card);
});

// Resume download handler
document.querySelector('.btn-primary').addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#contact') {
        e.preventDefault();
        alert('Resume download will be available soon! Please check back later.');
        // In the future, you can replace this with actual resume download logic
    }
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const formStatus = document.getElementById('formStatus');

        // Validation
        if (!name || !email || !subject || !message) {
            formStatus.textContent = '❌ Please fill in all required fields (marked with *)';
            formStatus.className = 'form-status error';
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.textContent = '❌ Please enter a valid email address';
            formStatus.className = 'form-status error';
            return;
        }

        // Phone validation (if provided)
        if (phone && phone.length < 10) {
            formStatus.textContent = '❌ Please enter a valid phone number (at least 10 digits)';
            formStatus.className = 'form-status error';
            return;
        }

        // Message length check
        if (message.length < 10) {
            formStatus.textContent = '❌ Please write a message with at least 10 characters';
            formStatus.className = 'form-status error';
            return;
        }

        // If validation passes
        formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you within 24 hours.';
        formStatus.className = 'form-status success';

        // Log form data
        console.log('Form submitted:', { name, email, phone, subject, message });

        // Reset form
        contactForm.reset();

        // Clear success message after 6 seconds
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 6000);
    });
}

// Add active state to navigation links with better detection
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'white';
        link.style.opacity = '0.8';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent-color)';
            link.style.opacity = '1';
        }
    });
});

console.log('Portfolio script loaded successfully!');
