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

    // 4. Enrollment Form WhatsApp Redirection & Google Sheet Storage
    const enrollmentForm = document.getElementById('enrollmentForm');

    // PASTE YOUR GOOGLE SCRIPT URL HERE
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwTx8VzLPjfyJWOiTwL_-MKoiL9bf6Q6cPXq7cskOie6dLCzeraetWK53BKEcSbReKW/exec";

    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = enrollmentForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = 'Saving Data... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Get form values
            const name = document.getElementById('formName').value;
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

            // Prepare Data for Google Sheet (Keys match the headers you provided)
            // Prepare Data for Google Sheet (Keys match the headers you provided)
            const formData = {
                Timestamp: new Date().toLocaleString(),
                Name: name,
                Contact: studentPhone,
                Course: course,
                Status: currentStatus,
                Location: address,
                Date_of_Birth: dob,
                Father_Name: father,
                Mother_Name: mother,
                Occupation: occupation,
                Income: income,
                Education: edu,
                Last_Inst: lastStudied,
                Parent_Phone: parentPhone,
                Referral: referral,
                Ref_Detail: refDetail,
                Message: personalMsg
            };

            // WhatsApp Logic
            const targetPhoneNumber = "917799302224";
            const whatsappMsg = `*Vinnar Institute - New Admission Application*\n\n` +
                `*--- Student Details ---*\n` +
                `*Name:* ${name}\n` +
                `*DOB:* ${dob}\n` +
                `*Filled at Vinnar:* ${currentStatus}\n` +
                `*Interest:* ${course}\n\n` +
                `*--- Family & Background ---*\n` +
                `*Father:* ${father}\n` +
                `*Mother:* ${mother}\n` +
                `*Occupation:* ${occupation}\n` +
                `*Income:* ${income}\n\n` +
                `*--- Education ---*\n` +
                `*Qualification:* ${edu}\n` +
                `*Last Studied:* ${lastStudied}\n\n` +
                `*--- Contact ---*\n` +
                `*Address:* ${address}\n` +
                `*Student Mobile:* ${studentPhone}\n` +
                `*Parent Mobile:* ${parentPhone}\n\n` +
                `*--- Referral ---*\n` +
                `*Source:* ${referral} ${refDetail ? `(${refDetail})` : ''}\n` +
                `*Message:* ${personalMsg}`;

            const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodeURIComponent(whatsappMsg)}`;

            // Send to Google Sheet
            if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_SCRIPT_URL_HERE") {
                fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Important for Google Apps Script
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }).then(() => {
                    // Success or Opaque response
                    console.log("Data sent to sheet");
                    window.open(whatsappUrl, '_blank');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    enrollmentForm.reset();
                }).catch(err => {
                    console.error("Error sending to sheet", err);
                    // Open WhatsApp anyway even if storage fails
                    window.open(whatsappUrl, '_blank');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
            } else {
                // If no URL configured yet, just open WhatsApp
                console.warn("Google Script URL not set. Data not saved to sheet.");
                window.open(whatsappUrl, '_blank');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
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
