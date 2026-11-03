
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const texts = ["Cybersecurity Enthusiast", "Competitive Coder", "Software Engineer"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
let isDeleting = false;
let typingElement = document.querySelector('.typing-text');

if (typingElement) {
    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }
        typingElement.textContent = letter;

        let typeSpeed = 100;
        if (isDeleting) {
            typeSpeed /= 2;
        }
        if (!isDeleting && letter.length === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }());
}

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }
});
