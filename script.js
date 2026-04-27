const navLinks = document.querySelectorAll('.nav-links a');
const footerText = document.querySelector('.page-footer p');
const wave = document.querySelector('.wave');

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

if (footerText) {
    footerText.textContent = `© ${new Date().getFullYear()} Ayush Kumar. All rights reserved.`;
}

if (wave) {
    let waving = true;
    setInterval(() => {
        wave.textContent = waving ? '👋' : '😊';
        waving = !waving;
    }, 1400);
}

const updateActiveLink = () => {
    const fromTop = window.scrollY + 120;
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (fromTop >= sectionTop && fromTop < sectionBottom) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);
