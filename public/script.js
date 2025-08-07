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
            element.innerHTML = newText;
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
                element.innerHTML = newText;
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

// High-performance parallax effect using requestAnimationFrame
let ticking = false;
let lastScrollY = 0;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const time = Date.now() * 0.001; // Current time for float animation
    
    if (!heroSection) return;
    
    const heroHeight = heroSection.offsetHeight;
    const heroTop = heroSection.offsetTop;
    
    // Background parallax (slower movement)
    const heroBackground = document.querySelector('.parallax-bg');
    if (heroBackground) {
        const bgY = scrolled * 0.3;
        heroBackground.style.transform = `translate3d(0, ${bgY}px, 0)`;
    }
    
    // Shapes parallax with float animation (always animate, not just when in view)
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const depth = parseFloat(shape.getAttribute('data-depth') || '0.5');
        const speed = 0.5 + (depth * 0.5); // Deeper shapes move faster
        const yPos = -(scrolled * speed);
        const xPos = scrolled * (depth * 0.1); // Subtle horizontal movement
        
        // Float animation parameters
        const floatSpeed = 0.5 + (index * 0.1);
        const floatAmplitude = 15 + (depth * 10);
        const floatY = Math.sin(time * floatSpeed) * floatAmplitude;
        const rotation = Math.sin(time * (0.3 + index * 0.1)) * 180;
        const scale = 1 + Math.sin(time * (0.2 + index * 0.05)) * 0.1;
        
        // Border-radius animation (from original CSS keyframes)
        const borderRadiusProgress = Math.sin(time * (0.2 + index * 0.05));
        const borderRadius = 45 + (borderRadiusProgress * 5); // Animate between 40% and 50%
        
        // Combine parallax and float animation
        shape.style.transform = `translate3d(${xPos}px, ${yPos + floatY}px, ${depth * 100}px) rotate(${rotation}deg) scale(${scale})`;
        shape.style.borderRadius = `50% ${borderRadius}%`;
    });
    
    // Content parallax (very subtle, keeps content readable)
    const heroContent = document.querySelector('.parallax-content');
    if (heroContent) {
        const contentY = scrolled * 0.1;
        heroContent.style.transform = `translate3d(0, ${contentY}px, 0)`;
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Throttled scroll listener for better performance
window.addEventListener('scroll', function() {
    requestTick();
}, { passive: true });

// Update parallax on window resize
window.addEventListener('resize', function() {
    requestTick();
}, { passive: true });

// Continuous animation loop for float effect
function animateFloat() {
    requestTick();
    requestAnimationFrame(animateFloat);
}

// Start the continuous animation loop
animateFloat();

// Active navigation link based on current URL path
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .mobile-nav-menu a[href^="#"]');
    
    // Get current URL hash or default to #inicio
    const currentPath = window.location.hash || '#inicio';
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current path link
    const activeLinks = document.querySelectorAll(`a[href="${currentPath}"]`);
    activeLinks.forEach(link => {
        link.classList.add('active');
    });
}

// Update active nav link on hash change
window.addEventListener('hashchange', function() {
    updateActiveNavLink();
});

// Update active nav link on page load
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
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