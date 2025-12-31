/**
 * Vinnar Institute of Fashion Designing
 * Custom JavaScript for Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('mainNav');

    // 1. Navbar Scroll Effect
    // Changes navbar background from transparent to solid on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }

                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Simple Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initializing elements to watch
    document.querySelectorAll('.course-card, .section-title, .about-img-stack').forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });

    // 4. Enrollment Form WhatsApp Redirection
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('formName').value;
            const phone = document.getElementById('formPhone').value;
            const course = document.getElementById('formCourse').value;
            const message = document.getElementById('formMessage').value;

            // WhatsApp Number & Message Formatting
            const targetPhoneNumber = "917799302224"; // India prefix + number
            const whatsappMsg = `*New Admission Inquiry - Vinnar Institute*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Phone:* ${phone}%0A` +
                `*Interest:* ${course}%0A` +
                `*Message:* ${message}`;

            // Redirect to WhatsApp
            window.open(`https://wa.me/${targetPhoneNumber}?text=${whatsappMsg}`, '_blank');

            // Optional: Reset form
            enrollmentForm.reset();
        });
    }
});

// Add these helpers for simple animations without external libraries
const style = document.createElement('style');
style.textContent = `
    .reveal-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .reveal-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
