// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('portfolioTheme') || 'blue';

// Apply saved theme on load
function applyTheme(theme) {
    const body = document.body;
    if (theme === 'green') {
        body.classList.add('theme-green');
    } else {
        body.classList.remove('theme-green');
    }
    currentTheme = theme;
    localStorage.setItem('portfolioTheme', theme);
}

applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'blue' ? 'green' : 'blue';
    applyTheme(currentTheme);
});

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
});

// Close menu when a link is clicked
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
    });
});

// ==================== NAVBAR SCROLL ====================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// ==================== SMOOTH SCROLLING ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        // Update active link
        updateActiveNavLink();
    }
}

// Add smooth scroll to all nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target !== '#' && document.querySelector(target)) {
            scrollToSection(target.substring(1));
        }
    });
});

// ==================== ACTIVE NAV LINK ====================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==================== FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Log form data (in a real app, you'd send this to a server)
    console.log('Form submitted:', { name, email, message });

    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent! ✓';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    // Reset form
    contactForm.reset();

    // Restore button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
    }, 3000);
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, project cards, etc.
document.querySelectorAll('.glass-card, .skill-card, .project-card, .cert-card, .achievement-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== LAZY LOAD IMAGES ====================
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.loading = 'lazy';
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
    }
});

// ==================== SMOOTH SCROLL BEHAVIOR ====================
document.documentElement.style.scrollBehavior = 'smooth';

// ==================== ACCESSIBILITY ====================
// Add focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ==================== PERFORMANCE ====================
// Defer non-critical styles
window.addEventListener('load', () => {
    document.querySelectorAll('[data-src]').forEach(img => {
        const src = img.getAttribute('data-src');
        const srcset = img.getAttribute('data-srcset');
        if (src) img.src = src;
        if (srcset) img.srcset = srcset;
    });
});

// ==================== UTILITY FUNCTIONS ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== INITIALIZE ====================
console.log('Portfolio loaded successfully!');
