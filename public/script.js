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

// Sliding Treatments Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    const treatmentsSection = document.querySelector('.treatments-section');
    const treatmentPanels = document.querySelectorAll('.treatment-panel');
    const panels = Array.from(treatmentPanels);
    
    console.log('Treatments section found:', treatmentsSection);
    console.log('Treatment panels found:', panels.length);
    
    if (!treatmentsSection || panels.length === 0) {
        console.log('Treatments section or panels not found, exiting');
        return;
    }
    
    let currentPanelIndex = 0;
    let isAnimating = false;
    let sectionStart = 0;
    let sectionEnd = 0;
    let panelHeight = 0;
    
    // Initialize section measurements
    function initializeSection() {
        const rect = treatmentsSection.getBoundingClientRect();
        sectionStart = window.pageYOffset + rect.top;
        sectionEnd = sectionStart + treatmentsSection.offsetHeight;
        panelHeight = window.innerHeight;
        
        console.log('Section initialized:', {
            sectionStart,
            sectionEnd,
            panelHeight,
            sectionHeight: treatmentsSection.offsetHeight
        });
    }
    
    // Initialize on load
    initializeSection();
    
    // Recalculate on resize
    window.addEventListener('resize', initializeSection);
    
    // Function to activate a specific panel
    function activatePanel(index) {
        if (isAnimating || index < 0 || index >= panels.length) return;
        
        isAnimating = true;
        
        // Reset all panels
        panels.forEach((panel, i) => {
            panel.classList.remove('active', 'sliding-in', 'sliding-out');
        });
        
        // Set active panels (stacking effect)
        for (let i = 0; i <= index; i++) {
            panels[i].classList.add('active');
        }
        
        // Set the current panel as sliding-in
        if (index > 0) {
            panels[index].classList.add('sliding-in');
        }
        
        setTimeout(() => {
            panels.forEach(panel => {
                panel.classList.remove('sliding-in', 'sliding-out');
            });
            isAnimating = false;
        }, 600);
        
        currentPanelIndex = index;
    }
    
    // Scroll-based panel activation
    function handleScroll() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Check if we're in the treatments section
        if (scrollY < sectionStart || scrollY > sectionEnd) {
            return;
        }
        
                // Calculate which panel should be active based on scroll position
                // Use absolute viewport heights: 0-50vh, 50-150vh, 150-250vh, 250-350vh, 350-450vh
                const scrollDistance = scrollY - sectionStart;
                const viewportHeight = window.innerHeight;
                const totalPanels = panels.length;
                
                let targetPanelIndex;
                if (scrollDistance < 50 * viewportHeight / 100) {
                    // 0-50vh: Overview panel
                    targetPanelIndex = 0;
                } else if (scrollDistance < 150 * viewportHeight / 100) {
                    // 50-150vh: Stem Cells
                    targetPanelIndex = 1;
                } else if (scrollDistance < 250 * viewportHeight / 100) {
                    // 150-250vh: Exosomes
                    targetPanelIndex = 2;
                } else if (scrollDistance < 350 * viewportHeight / 100) {
                    // 250-350vh: IV Therapy
                    targetPanelIndex = 3;
                } else {
                    // 350-450vh: Orthopedics
                    targetPanelIndex = 4;
                }
        
        // Ensure we don't go beyond the last panel
        const clampedIndex = Math.min(Math.max(targetPanelIndex, 0), totalPanels - 1);
        
        console.log('Scroll detected:', {
            scrollY,
            sectionStart,
            scrollDistance: scrollY - sectionStart,
            viewportHeight: window.innerHeight,
            targetPanelIndex,
            clampedIndex,
            currentPanelIndex
        });
        
        // Add some hysteresis to prevent rapid switching
        if (clampedIndex !== currentPanelIndex && !isAnimating) {
            console.log('Activating panel:', clampedIndex);
            activatePanel(clampedIndex);
        }
    }
    
    // Throttled scroll handler for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            handleScroll();
            scrollTimeout = null;
        }, 16); // ~60fps
    }, { passive: true });
    
    // Initialize the first panel as active
    console.log('Initializing first panel as active');
    activatePanel(0);
    
    // Test: Log all panels to make sure they're found
    panels.forEach((panel, index) => {
        console.log(`Panel ${index}:`, panel.className, panel.dataset.panel);
    });
    

    
    // Add visual indicators for current panel
    function updatePanelIndicators() {
        // Get or create indicators
        let indicators = document.querySelector('.panel-indicators');
        if (!indicators) {
            indicators = document.createElement('div');
            indicators.className = 'panel-indicators';
            
            panels.forEach((panel, index) => {
                const indicator = document.createElement('div');
                indicator.className = 'panel-indicator';
                
                indicator.addEventListener('click', () => {
                    const targetScroll = sectionStart + (index / panels.length) * (sectionEnd - sectionStart);
                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                });
                
                indicators.appendChild(indicator);
            });
            
            // Append to document body but manage visibility
            document.body.appendChild(indicators);
        }
        
        // Check if we're in the treatments section
        const scrollY = window.pageYOffset;
        const isInSection = scrollY >= sectionStart && scrollY <= sectionEnd;
        
        if (isInSection) {
            indicators.classList.add('visible');
            // Update active state
            const indicatorElements = indicators.querySelectorAll('.panel-indicator');
            indicatorElements.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentPanelIndex);
            });
        } else {
            indicators.classList.remove('visible');
        }
    }
    
    // Update indicators when panel changes
    const originalActivatePanel = activatePanel;
    function activatePanelWithIndicators(index) {
        originalActivatePanel(index);
        // Update indicators after a short delay to ensure panel state is set
        setTimeout(updatePanelIndicators, 100);
    }
    
    // Replace the original activatePanel function
    activatePanel = activatePanelWithIndicators;
    
    // Initialize indicators
    updatePanelIndicators();
    
    // Add scroll listener to update indicator visibility
    window.addEventListener('scroll', () => {
        updatePanelIndicators();
    }, { passive: true });
    

    
    // Test: Add a simple click handler to test panel switching
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('panel-indicator')) {
            console.log('Panel indicator clicked');
        }
    });
    
    console.log('Treatments section initialization complete');
}); 