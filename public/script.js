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
                body.style.overflow = 'hidden';
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
                const offsetTop = targetSection.offsetTop - 80;
                
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
    const animatedElements = document.querySelectorAll('.service-card, .team-member');
    
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
            if (buttonText.includes('agendar') || buttonText.includes('consulta') || buttonText.includes('schedule')) {
                console.log('Opening consultation form...');
            } else if (buttonText.includes('tratamientos') || buttonText.includes('treatments')) {
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
            if (buttonText.includes('conoce') || buttonText.includes('más') || buttonText.includes('learn') || buttonText.includes('more')) {
                const aboutSection = document.querySelector('.about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (buttonText.includes('llamar') || buttonText.includes('call')) {
                console.log('Opening phone call...');
            }
        });
    });
});

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLanguage = 'en';
    
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
    const time = Date.now() * 0.001;
    
    if (!heroSection) return;
    
    // Background parallax (slower movement)
    const heroBackground = document.querySelector('.parallax-bg');
    if (heroBackground) {
        const bgY = scrolled * 0.3;
        heroBackground.style.transform = `translate3d(0, ${bgY}px, 0)`;
    }
    
    // Shapes parallax with float animation
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const depth = parseFloat(shape.getAttribute('data-depth') || '0.5');
        const speed = 0.5 + (depth * 0.5);
        const yPos = -(scrolled * speed);
        const xPos = scrolled * (depth * 0.1);
        
        // Float animation parameters
        const floatSpeed = 0.5 + (index * 0.1);
        const floatAmplitude = 15 + (depth * 10);
        const floatY = Math.sin(time * floatSpeed) * floatAmplitude;
        const rotation = Math.sin(time * (0.3 + index * 0.1)) * 180;
        const scale = 1 + Math.sin(time * (0.2 + index * 0.05)) * 0.1;
        
        // Border-radius animation
        const borderRadiusProgress = Math.sin(time * (0.2 + index * 0.05));
        const borderRadius = 45 + (borderRadiusProgress * 5);
        
        // Combine parallax and float animation
        shape.style.transform = `translate3d(${xPos}px, ${yPos + floatY}px, ${depth * 100}px) rotate(${rotation}deg) scale(${scale})`;
        shape.style.borderRadius = `50% ${borderRadius}%`;
    });
    
    // Content parallax (very subtle)
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

// Start the continuous animation loop
function animateFloat() {
    requestTick();
    requestAnimationFrame(animateFloat);
}

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

// Smooth Scroll-Based Treatments Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    const treatmentsSection = document.querySelector('.treatments-section');
    const treatmentPanels = document.querySelectorAll('.treatment-panel:not(.treatment-overview)');
    
    if (!treatmentsSection || treatmentPanels.length === 0) {
        return;
    }
    
    // Check if we're on mobile - disable overlapping panels functionality
    let isMobile = window.innerWidth <= 768;
    
    // Function to enable mobile mode (all panels visible, no transforms)
    function enableMobileMode() {
        treatmentPanels.forEach(panel => {
            panel.style.position = 'relative';
            panel.style.transform = 'none';
            panel.style.height = 'auto';
            panel.style.minHeight = '100vh';
            panel.style.display = 'block';
            panel.style.overflow = 'visible';
            panel.style.zIndex = '';
        });
    }
    
    // Function to enable desktop mode (overlapping panels with transforms)
    function enableDesktopMode() {
        treatmentPanels.forEach(panel => {
            panel.style.position = '';
            panel.style.transform = '';
            panel.style.height = '';
            panel.style.minHeight = '';
            panel.style.display = '';
            panel.style.overflow = '';
            panel.style.zIndex = '';
            panel.style.transform = 'translateY(100vh)';
        });
    }
    
    // Initial setup based on current device type
    if (isMobile) {
        enableMobileMode();
        return;
    } else {
        enableDesktopMode();
    }
    
    let sectionStart = 0;
    let sectionEnd = 0;
    
    // Initialize section measurements
    function initializeSection() {
        const rect = treatmentsSection.getBoundingClientRect();
        sectionStart = window.pageYOffset + rect.top;
        sectionEnd = sectionStart + (treatmentPanels.length * window.innerHeight);
    }
    
    // Initialize on load (only for desktop)
    if (!isMobile) {
        initializeSection();
    }
    
    // Recalculate on resize
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 768;
        
        // Only handle if switching between modes
        if (newIsMobile !== isMobile) {
            if (newIsMobile) {
                enableMobileMode();
            } else {
                enableDesktopMode();
                initializeSection();
            }
            
            isMobile = newIsMobile;
        }
    });
    
    // Smooth scroll-based panel movement
    function handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Check if we're in the treatments section
        if (scrollY < sectionStart || scrollY > sectionEnd) {
            return;
        }
        
        const scrollDistance = scrollY - sectionStart;
        const viewportHeight = window.innerHeight;
        
        // Calculate each panel's position based on scroll
        treatmentPanels.forEach((panel, index) => {
            const panelStart = index * viewportHeight;
            const panelEnd = (index + 1) * viewportHeight;
            
            if (scrollDistance >= panelStart && scrollDistance < panelEnd) {
                // Panel is in its active scroll range
                const panelScrollProgress = scrollDistance - panelStart;
                const transformY = Math.max(0, viewportHeight - panelScrollProgress);
                
                // Apply smooth transform
                panel.style.transform = `translateY(${transformY}px)`;
                panel.classList.add('active');
            } else if (scrollDistance >= panelEnd) {
                // Panel has completed its scroll range - keep it fixed at top
                panel.style.transform = 'translateY(0)';
                panel.classList.add('active');
            } else {
                // Panel hasn't started its scroll range yet
                panel.style.transform = 'translateY(100vh)';
                panel.classList.remove('active');
            }
        });
    }
    
    // Optimized scroll handler for smooth performance
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        // Only handle scroll events on desktop (non-mobile)
        if (isMobile) {
            return;
        }
        
        // Clear existing timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Use requestAnimationFrame for smooth scrolling
        scrollTimeout = requestAnimationFrame(() => {
            handleScroll();
        });
    }, { passive: true });
    
    // Initialize panels on load (only on desktop)
    if (!isMobile) {
        handleScroll();
    }
}); 