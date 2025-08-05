// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    
    // Open mobile menu
    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', function() {
            if (mobileOverlay.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileOverlay.classList.remove('active');
                body.style.overflow = '';
                if (window.scrollY > 200) {
                    navbar.classList.add('scrolled');
                }
            } else {
                hamburger.classList.add('active');
                mobileOverlay.classList.add('active');
                body.style.overflow = 'hidden'; // Prevent background scrolling
                if (navbar.classList.contains('scrolled')) {
                    navbar.classList.remove('scrolled');
                }
            }                
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 200) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .mission, .vision, .location-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Button click handlers
document.addEventListener('DOMContentLoaded', function() {
    const primaryButtons = document.querySelectorAll('.btn-primary');
    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    
    // Primary button click handler
    primaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle different button actions
            const buttonText = this.textContent.toLowerCase();
            if (buttonText.includes('agendar') || buttonText.includes('consulta')) {
                // Open consultation form or redirect to contact
                console.log('Opening consultation form...');
                // You can add actual functionality here
            } else if (buttonText.includes('tratamientos')) {
                // Scroll to treatments section
                const treatmentsSection = document.querySelector('#tratamientos');
                if (treatmentsSection) {
                    treatmentsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Secondary button click handler
    secondaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle different button actions
            const buttonText = this.textContent.toLowerCase();
            if (buttonText.includes('conoce') || buttonText.includes('más')) {
                // Scroll to about section
                const aboutSection = document.querySelector('.about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (buttonText.includes('llamar')) {
                // Open phone call
                console.log('Opening phone call...');
                // You can add actual phone functionality here
            }
        });
    });
});

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLanguage = 'en'; // Default language is English
    
    // Set initial content to English
    const elementsToTranslate = document.querySelectorAll('[data-es][data-en]');
    elementsToTranslate.forEach(element => {
        const newText = element.getAttribute('data-en');
        if (newText) {
            element.textContent = newText;
        }
    });
    
    // Set initial navigation to English
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav-menu a');
    const navTexts = {
        es: ['Inicio', 'Tratamientos', 'Testimonios', 'FAQ', 'Contacto'],
        en: ['Home', 'Treatments', 'Testimonials', 'FAQ', 'Contact']
    };
    
    navLinks.forEach((link, index) => {
        if (navTexts.en[index]) {
            link.textContent = navTexts.en[index];
        }
    });
    
    // Function to update language
    function updateLanguage() {
        currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
        
        // Update all language buttons
        langBtns.forEach(btn => {
            btn.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
        });
        
        // Update all elements with language data attributes
        elementsToTranslate.forEach(element => {
            const targetLang = currentLanguage === 'en' ? 'en' : 'es';
            const newText = element.getAttribute(`data-${targetLang}`);
            if (newText) {
                element.textContent = newText;
            }
        });
        
        // Update navigation links (both desktop and mobile)
        navLinks.forEach((link, index) => {
            if (navTexts[currentLanguage][index]) {
                link.textContent = navTexts[currentLanguage][index];
            }
        });
        
        console.log(`Switched to ${currentLanguage === 'en' ? 'English' : 'Spanish'}`);
    }
    
    // Add event listeners to all language buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', updateLanguage);
    });
});

// Enhanced parallax effect for hero background shapes only
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    // Only apply parallax to background shapes, not the hero section itself
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.2); // More varied speeds
        const yPos = -(scrolled * speed);
        const rotation = scrolled * (0.05 + index * 0.02);
        const scale = 1 + (scrolled * 0.0001 * (index + 1));
        
        shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg) scale(${scale})`;
    });
    
    // Parallax for organic shapes container only
    const organicShapes = document.querySelector('.organic-shapes');
    if (organicShapes) {
        const organicParallax = scrolled * 0.6;
        organicShapes.style.transform = `translateY(${organicParallax}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add loading animation CSS
const style = document.createElement('style');
style.textContent = `
    .loaded .hero-content {
        animation: fadeInUp 1s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 