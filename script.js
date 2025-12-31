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
            const gender = document.getElementById('formGender').value;
            const dob = document.getElementById('formDOB').value;
            const father = document.getElementById('formFather').value;
            const mother = document.getElementById('formMother').value || 'N/A';
            const occupation = document.getElementById('formOccupation').value || 'N/A';
            const income = document.getElementById('formIncome').value || 'N/A';
            const course = document.getElementById('formCourse').value;
            const edu = document.getElementById('formEdu').value || 'N/A';
            const lastStudied = document.getElementById('formLastStudied').value || 'N/A';
            const address = document.getElementById('formAddress').value;
            const studentPhone = document.getElementById('formPhone').value;
            const parentPhone = document.getElementById('formParentPhone').value || 'N/A';

            // Get Status & Referral
            const statusEl = document.querySelector('input[name="currentStatus"]:checked');
            const currentStatus = statusEl ? statusEl.value : 'New';

            const referralEl = document.querySelector('input[name="referral"]:checked');
            const referral = referralEl ? referralEl.value : 'Not specified';
            const refDetail = document.getElementById('refDetail').value || '';
            const personalMsg = document.getElementById('formMessage').value || 'N/A';

            // WhatsApp Number & Message Formatting
            const targetPhoneNumber = "917799302224"; // India prefix + number
            const whatsappMsg = `*Vinnar Institute - New Admission Application*%0A%0A` +
                `*--- Student Details ---*%0A` +
                `*Name:* ${name}%0A` +
                `*Gender:* ${gender}%0A` +
                `*DOB:* ${dob}%0A` +
                `*Filled at Vinnar:* ${currentStatus}%0A` +
                `*Interest:* ${course}%0A%0A` +
                `*--- Family & Background ---*%0A` +
                `*Father:* ${father}%0A` +
                `*Mother:* ${mother}%0A` +
                `*Occupation:* ${occupation}%0A` +
                `*Annual Income:* ${income}%0A%0A` +
                `*--- Academic Info ---*%0A` +
                `*Qualification:* ${edu}%0A` +
                `*Last Studied:* ${lastStudied}%0A%0A` +
                `*--- Contact Info ---*%0A` +
                `*Student Phone:* ${studentPhone}%0A` +
                `*Parent Phone:* ${parentPhone}%0A` +
                `*Address:* ${address}%0A%0A` +
                `*--- Referral & Note ---*%0A` +
                `*Source:* ${referral} ${refDetail ? '(' + refDetail + ')' : ''}%0A` +
                `*Note:* ${personalMsg}`;

            // Redirect to WhatsApp (using location.href for better popup blocker compatibility)
            window.location.href = `https://wa.me/${targetPhoneNumber}?text=${whatsappMsg}`;

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
