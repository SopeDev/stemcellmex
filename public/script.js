// Error handling utility
function handleError(error, context = 'Unknown') {
    console.error(`Error in ${context}:`, error);
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': `${context}: ${error.message}`,
            'fatal': false
        });
    }
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    try {
        const hamburger = document.querySelector('.hamburger');
        const mobileOverlay = document.querySelector('.mobile-nav-overlay');
        const navbar = document.querySelector('.navbar');
        const body = document.body;
    
        // Open mobile menu
        if (hamburger && mobileOverlay) {
            hamburger.addEventListener('click', function() {
                try {
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
                } catch (error) {
                    handleError(error, 'Mobile Menu Toggle');
                }
            });
        }
    } catch (error) {
        handleError(error, 'Mobile Navigation Setup');
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
    
    // Scroll to treatments functionality
    const scrollToTreatmentsBtn = document.querySelector('.scroll-to-treatments');
    if (scrollToTreatmentsBtn) {
        scrollToTreatmentsBtn.addEventListener('click', function() {
            const treatmentsSection = document.querySelector('.treatments-section');
            if (treatmentsSection) {
                // Scroll to the second treatment panel (stem cells)
                const stemCellsPanel = document.querySelector('#stem-cells-details');
                if (stemCellsPanel) {
                    const offsetTop = stemCellsPanel.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback to treatments section
                    const offsetTop = treatmentsSection.offsetTop + 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
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
    
    // Handle content-wrapper opacity animation (throttled for performance)
    throttledContentWrapperOpacity();
});

// Create throttled version of the opacity function
const throttledContentWrapperOpacity = throttle(handleContentWrapperOpacity, 16); // ~60fps

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

// Scroll-based opacity animation for content-wrapper elements
function handleContentWrapperOpacity() {
    const contentWrappers = document.querySelectorAll('.content-wrapper');
    
    contentWrappers.forEach(wrapper => {
        const rect = wrapper.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate the center position of the element relative to viewport
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        
        // Calculate distance from viewport center
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        const maxDistance = windowHeight / 2;
        
        // Calculate opacity based on distance from center
        // When element is at center: opacity = 1
        // When element is at edges: opacity = 0
        let opacity = 1 - (distanceFromCenter / maxDistance);
        opacity = Math.max(0, Math.min(1, opacity)); // Clamp between 0 and 1
        
        wrapper.style.opacity = opacity;
    });
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .team-member');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize content-wrapper opacity animation
    handleContentWrapperOpacity();
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
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Handle different button actions
            const buttonText = this.textContent.toLowerCase();
            if (buttonText.includes('agendar') || buttonText.includes('consulta') || buttonText.includes('schedule')) {
                // Scroll to CTA section for consultation buttons
                const ctaSection = document.querySelector('.cta-section');
                if (ctaSection) {
                    ctaSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (buttonText.includes('tratamientos') || buttonText.includes('treatments')) {
                const treatmentsSection = document.querySelector('#tratamientos');
                if (treatmentsSection) {
                    treatmentsSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (this.textContent.includes('Meet Our Team') || this.textContent.includes('Conoce Nuestro Equipo')) {
                // Handle About Us page specific buttons
                const teamSection = document.querySelector('.about-team');
                if (teamSection) {
                    teamSection.scrollIntoView({ behavior: 'smooth' });
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
                this.style.transform = 'scale(1)';
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
            } else if (this.textContent.includes('Our Mission') || this.textContent.includes('Nuestra Misión')) {
                // Handle About Us page specific buttons
                const missionSection = document.querySelector('.about-mission');
                if (missionSection) {
                    missionSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Random shape selector for compact hero sections
function setupRandomShapes() {
    const organicShapes = document.querySelector('.organic-shapes');
    if (!organicShapes) return;
    
    // Check if this is a compact hero (not homepage)
    const heroSection = document.querySelector('.hero');
    if (heroSection && heroSection.classList.contains('hero-compact')) {
        // This is a compact hero section, set up random shapes
        const allShapes = Array.from({length: 20}, (_, i) => i + 1);
        
        // Randomly select 5 unique shapes
        const selectedShapes = [];
        while (selectedShapes.length < 5) {
            const randomIndex = Math.floor(Math.random() * allShapes.length);
            const randomShape = allShapes[randomIndex];
            if (!selectedShapes.includes(randomShape)) {
                selectedShapes.push(randomShape);
            }
        }
        
        // Clear existing shapes and add only the selected ones
        organicShapes.innerHTML = '';
        
        selectedShapes.forEach((shapeNum, index) => {
            const depth = 0.2 + (index * 0.3); // Distribute depths evenly
            const shapeDiv = document.createElement('div');
            shapeDiv.className = `shape shape-${shapeNum}`;
            shapeDiv.setAttribute('data-depth', depth.toFixed(1));
            shapeDiv.innerHTML = '<div class="shape-inner"></div>';
            organicShapes.appendChild(shapeDiv);
        });
        
        console.log(`Randomly selected shapes: ${selectedShapes.join(', ')}`);
    }
}

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLanguage = 'en';
    
    // Set up random shapes for compact hero sections
    setupRandomShapes();
    
    // Function to get language from URL parameter
    function getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam === 'es') {
            return 'es';
        }
        return 'en'; // Default to English
    }
    
    // Function to update URL with language parameter
    function updateURLWithLanguage(lang) {
        const url = new URL(window.location.href);
        
        if (lang === 'es') {
            // Add ?lang=es for Spanish
            url.searchParams.set('lang', 'es');
        } else {
            // Remove lang parameter for English (default)
            url.searchParams.delete('lang');
        }
        
        // Update URL without page reload (using history API)
        window.history.replaceState({}, '', url.toString());
    }
    
    // Function to update HTML lang attribute
    function updateHTMLLangAttribute(lang) {
        document.documentElement.lang = lang;
    }
    
    // Function to update canonical URL
    function updateCanonicalURL(lang) {
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            document.head.appendChild(canonicalLink);
        }
        
        const baseURL = 'https://www.stemcell.mx';
        const currentPath = window.location.pathname;
        const canonicalURL = lang === 'es' 
            ? `${baseURL}${currentPath}?lang=es`
            : `${baseURL}${currentPath}`;
        
        canonicalLink.href = canonicalURL;
    }
    
    // Function to apply language to all elements
    function applyLanguage(lang) {
        const elementsToTranslate = document.querySelectorAll('[data-es][data-en]');
        elementsToTranslate.forEach(element => {
            const newText = element.getAttribute(`data-${lang}`);
            if (newText) {
                element.innerHTML = newText;
            }
        });
        
        // Update all language buttons
        langBtns.forEach(btn => {
            btn.textContent = lang === 'en' ? 'ES' : 'EN';
        });
        
        // Update HTML lang attribute
        updateHTMLLangAttribute(lang);
        
        // Update canonical URL
        updateCanonicalURL(lang);
        
        // Update navigation links to preserve language parameter
        // Pass the language directly to avoid timing issues
        preserveLanguageOnNavigation(lang);
        
        // Re-apply active states after language change
        updateActiveNavLink();
    }
    
    // Function to update language
    function updateLanguage() {
        currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
        
        // Save to localStorage
        localStorage.setItem('stemcell-language', currentLanguage);
        
        // Update URL with language parameter
        updateURLWithLanguage(currentLanguage);
        
        // Close mobile navigation menu if it's open
        const hamburger = document.querySelector('.hamburger');
        const mobileOverlay = document.querySelector('.mobile-nav-overlay');
        const body = document.body;
        
        if (mobileOverlay && mobileOverlay.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileOverlay.classList.remove('active');
            body.style.overflow = '';
            // Restore navbar scrolled state if needed
            if (window.scrollY > 200) {
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    navbar.classList.add('scrolled');
                }
            }
        }
        
        // Apply the new language
        applyLanguage(currentLanguage);
        
        console.log(`Switched to ${currentLanguage === 'en' ? 'English' : 'Spanish'}`);
    }
    
    // Initialize language: Check URL parameter first, then localStorage, then default to English
    const urlLanguage = getLanguageFromURL();
    const savedLanguage = localStorage.getItem('stemcell-language');
    
    if (urlLanguage === 'es') {
        // URL parameter says Spanish
        currentLanguage = 'es';
        localStorage.setItem('stemcell-language', 'es');
    } else if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
        // Use saved preference, but sync URL if needed
        currentLanguage = savedLanguage;
        if (savedLanguage === 'es' && urlLanguage !== 'es') {
            // Saved preference is Spanish but URL doesn't reflect it
            updateURLWithLanguage('es');
        } else if (savedLanguage === 'en' && urlLanguage === 'es') {
            // Saved preference is English but URL says Spanish - trust URL
            currentLanguage = 'es';
            localStorage.setItem('stemcell-language', 'es');
        }
    } else {
        // Default to English
        currentLanguage = 'en';
        localStorage.setItem('stemcell-language', 'en');
        // Ensure URL doesn't have lang parameter for English
        if (urlLanguage === 'es') {
            updateURLWithLanguage('en');
        }
    }
    
    // Apply the determined language
    applyLanguage(currentLanguage);
    
    // Add event listeners to all language buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', updateLanguage);
    });
    
    // Preserve language parameter when navigating between pages
    function preserveLanguageOnNavigation(langOverride = null) {
        // Use provided language override, or get from URL, or use currentLanguage variable
        const currentLang = langOverride !== null ? langOverride : (getLanguageFromURL() || currentLanguage);
        const allNavLinks = document.querySelectorAll('a[href^="./"], a[href^="/"], a[href^="index.html"]');
        
        allNavLinks.forEach(link => {
            let href = link.getAttribute('href');
            
            // Skip hash links (same-page anchors), external links, and mailto/tel links
            if (!href || href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://') || 
                href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
                return;
            }
            
            // Store original href to restore if needed
            const originalHref = link.getAttribute('data-original-href') || href;
            if (!link.hasAttribute('data-original-href')) {
                link.setAttribute('data-original-href', originalHref);
            }
            
            // Start with original href (without any lang parameter)
            href = originalHref;
            
            // Separate hash fragment from the URL if it exists
            let hashFragment = '';
            const hashIndex = href.indexOf('#');
            if (hashIndex !== -1) {
                hashFragment = href.substring(hashIndex);
                href = href.substring(0, hashIndex);
            }
            
            // Remove any existing lang parameter from the path part
            href = href.replace(/[?&]lang=es/g, '');
            href = href.replace(/\?&/, '?'); // Clean up if ?& remains
            href = href.replace(/\?$/, ''); // Remove trailing ?
            
            // Add language parameter if we're in Spanish mode (before the hash)
            if (currentLang === 'es') {
                const separator = href.includes('?') ? '&' : '?';
                href = href + separator + 'lang=es';
            }
            
            // Reconstruct the full URL with hash fragment
            link.href = href + hashFragment;
        });
    }
    
    // Initialize navigation link preservation on page load
    preserveLanguageOnNavigation();
    
    // Re-run link preservation when DOM changes (for dynamically added links)
    // Use MutationObserver to watch for new links added to the page
    let linkUpdateTimeout;
    const linkObserver = new MutationObserver(function(mutations) {
        let shouldUpdate = false;
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // Check if the added node is a link or contains links
                        if (node.tagName === 'A' || (node.querySelector && node.querySelector('a[href^="./"], a[href^="/"]'))) {
                            shouldUpdate = true;
                        }
                    }
                });
            }
        });
        if (shouldUpdate) {
            // Debounce to avoid too many updates
            clearTimeout(linkUpdateTimeout);
            linkUpdateTimeout = setTimeout(function() {
                preserveLanguageOnNavigation();
            }, 100);
        }
    });
    
    // Observe the entire document for added nodes (only if body exists)
    if (document.body) {
        linkObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Set initial state
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            
            // Close all other FAQ items with smooth animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    
                    otherItem.classList.remove('open');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.setAttribute('aria-hidden', 'true');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.opacity = '0';
                }
            });
            
            // Toggle current FAQ item
            if (!isOpen) {
                // Open current item
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
                answer.style.maxHeight = answer.scrollHeight + 48 + 'px';
                // Delay opacity for smoother animation
                setTimeout(() => {
                    answer.style.opacity = '1';
                }, 50);
            } else {
                // Close current item
                item.classList.remove('open');
                question.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
                answer.style.opacity = '0';
                answer.style.maxHeight = '0';
            }
        });
        
        // Handle keyboard navigation
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
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

// Navigation highlighting function
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav-menu a');
    
    console.log('updateActiveNavLink called');
    console.log('Found navLinks:', navLinks.length);
    
    if (navLinks.length === 0) {
        console.log('No navigation links found');
        return;
    }
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Get current page pathname
    const currentPage = window.location.pathname;
    console.log('Current page pathname:', currentPage);
    
    // Find and highlight the current page link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        console.log('Checking link:', href);
        
        if (href && href !== '') {
            // Check if this link matches the current page
            const isCurrentPage = currentPage.endsWith(href) || 
                (currentPage.endsWith('/') && href === './index.html') ||
                (currentPage.endsWith('index.html') && href === './index.html') ||
                (currentPage.endsWith('treatments.html') && href === './treatments.html') ||
                (currentPage.endsWith('about.html') && href === './about.html') ||
                (currentPage.includes('faq.html') && href === './faq.html') ||
                (currentPage.includes('contact.html') && href === './contact.html');
            
            console.log('Link href:', href, 'Current page:', currentPage, 'Is current:', isCurrentPage);
            
            if (isCurrentPage) {
                link.classList.add('active');
                console.log('Activated link:', href);
            }
        }
    });
}

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
    
    // Initialize on load (only on desktop)
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

    const initialHash = window.location.hash
    if (initialHash) {
        const target = document.querySelector(initialHash)
        if (target) {
            enableDesktopMode()
            initializeSection()

            // Special handling for overview panel
            if (target.classList.contains('treatment-overview')) {
                // Scroll to the top of the treatments section for overview
                const y = sectionStart
                window.scrollTo({ top: y, behavior: 'instant' })
                handleScroll()
            } else {
                // Map hash -> panel index within treatmentPanels NodeList
                const panelsArray = Array.from(treatmentPanels)
                const idx = panelsArray.findIndex(p => '#' + p.id === initialHash)

                if (idx !== -1) {
                // Jump to the correct scroll offset for that panel range
                const y = sectionStart + (idx * window.innerHeight) + 1
                window.scrollTo({ top: y, behavior: 'instant' })
                // Force one computation to settle transforms
                handleScroll()
                } else {
                // Fallback if not in the list for some reason
                target.scrollIntoView({ behavior: 'instant', block: 'start' })
                handleScroll()
                }
            }
        }
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

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle homepage contact form
    const homepageContactForm = document.getElementById('homepageContactForm');
    if (homepageContactForm) {
        homepageContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Home Page');
        });
    }
    
    // Handle FAQ page contact form
    const faqContactForm = document.getElementById('faqContactForm');
    if (faqContactForm) {
        faqContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'FAQ Page');
        });
    }
    
    // Handle about page contact form
    const aboutContactForm = document.getElementById('aboutContactForm');
    if (aboutContactForm) {
        aboutContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'About Page');
        });
    }
    
    // Handle contact page form (if exists)
    const contactPageForm = document.getElementById('contactForm');
    if (contactPageForm) {
        contactPageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Contact Page');
        });
    }
    
    // Handle treatments page contact form
    const treatmentsContactForm = document.getElementById('treatmentsContactForm');
    if (treatmentsContactForm) {
        treatmentsContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Treatments Page');
        });
    }
    
    // Generic form submission handler
    async function handleFormSubmission(form, formType) {
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormMessage(form, 'Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage(form, 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            // Determine the correct API endpoint based on environment
            const isLocalDevelopment = window.location.protocol === 'file:' || window.location.hostname === 'localhost';
            const apiEndpoint = isLocalDevelopment 
                ? 'https://stemcellmex.vercel.app/api/contact'  // Production API endpoint
                : '/api/contact';  // Relative path for production
            
            // Send data to API endpoint
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    source: formType // Add form source for tracking
                })
            });
            
            if (response.ok) {
                // Show success message
                showFormMessage(form, 'Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset form
                form.reset();
            } else {
                const errorData = await response.json();
                showFormMessage(form, errorData.message || 'Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Check if it's a CORS or network error
            if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
                // Provide alternative contact methods
                showFormMessage(form, 'Unable to send message through the form. Please contact us directly at consultas@stemcellmex.com or call +52 (664) 655-8334.', 'error');
            } else {
                showFormMessage(form, 'Network error. Please check your connection and try again.', 'error');
            }
        } finally {
            // Restore button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }
    
    // Function to show form messages
    function showFormMessage(form, message, type) {
        // Remove any existing messages from the form's parent container
        const formContainer = form.parentNode;
        const existingMessage = formContainer.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.textContent = message;
        
        // Insert message after the form
        formContainer.insertBefore(messageElement, form.nextSibling);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
});

// ===== TREATMENTS PAGE FUNCTIONALITY =====

// Treatments page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the treatments page
    if (window.location.pathname.includes('treatments.html') || document.querySelector('.treatments-hero')) {
        initializeTreatmentsPage();
    }
});

function initializeTreatmentsPage() {
    // Smooth scrolling for "Learn More" buttons
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const treatmentType = this.closest('.treatment-card').dataset.treatment;
            const targetSection = document.getElementById(`${treatmentType}-details`);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });



    // Smooth scrolling for footer treatment links
    const footerTreatmentLinks = document.querySelectorAll('footer a[href^="#"]');
    footerTreatmentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll animations for treatment sections
    const treatmentSections = document.querySelectorAll('.treatment-section');
    const treatmentObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    treatmentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        treatmentObserver.observe(section);
    });

    // Add hover effects for treatment cards
    const treatmentCards = document.querySelectorAll('.treatment-card');
    treatmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Consultation button functionality
    const consultationButtons = document.querySelectorAll('.consultation-btn');
    consultationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to CTA section
            const ctaSection = document.querySelector('.cta-section');
            if (ctaSection) {
                const offsetTop = ctaSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add parallax effect to organic shapes in hero (handled by main parallax system)
    // The main parallax system will handle the organic shapes automatically

    // Add intersection observer for treatment cards
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
    });

    treatmentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
}

// Testimonial Slider Functionality
function initTestimonialSlider() {
    try {
        const slider = document.querySelector('.testimonials-slider');
        if (!slider) return;

        const items = slider.querySelectorAll('.testimonial-item');
        const dots = slider.querySelectorAll('.dot');
        const prevBtn = slider.querySelector('.testimonial-prev');
        const nextBtn = slider.querySelector('.testimonial-next');
        
        let currentSlide = 0;
        let autoSlideInterval;
        let isTransitioning = false;
        const slideInterval = 6000; // 6 seconds

        // Function to show specific slide
        function showSlide(index) {
            if (isTransitioning) return; // Prevent rapid clicking during transitions
            
            isTransitioning = true;
            
            // Remove active class from all items and dots
            items.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide
            if (items[index]) {
                items[index].classList.add('active');
            }
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            
            currentSlide = index;
            
            // Reset transition flag after animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, 500); // Match CSS transition duration
        }

        // Function to go to next slide
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % items.length;
            showSlide(nextIndex);
        }

        // Function to go to previous slide
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + items.length) % items.length;
            showSlide(prevIndex);
        }

        // Function to start auto-sliding
        function startAutoSlide() {
            stopAutoSlide(); // Clear any existing interval first
            autoSlideInterval = setInterval(nextSlide, slideInterval);
        }

        // Function to stop auto-sliding
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null; // Reset to null
            }
        }

        // Function to restart auto-sliding with a small delay
        function restartAutoSlide() {
            stopAutoSlide();
            // Add a small delay to prevent rapid clicking issues
            setTimeout(() => {
                startAutoSlide();
            }, 100);
        }

        // Event listeners for navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                restartAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                restartAutoSlide();
            });
        }

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                restartAutoSlide();
            });
        });

        // Pause auto-slide on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', function() {
            // Only restart if not currently transitioning
            if (!isTransitioning) {
                startAutoSlide();
            }
        });

        // Pause auto-slide when page is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        });

        // Initialize slider
        showSlide(0);
        startAutoSlide();

        // Clean up on page unload
        window.addEventListener('beforeunload', stopAutoSlide);

    } catch (error) {
        handleError(error, 'Testimonial Slider');
    }
}

// Initialize testimonial slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialSlider();
});

// Video Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        const videoSection = document.querySelector('.video-section');
        if (!videoSection) return;

        const backgroundVideo = document.getElementById('background-video');
        const videoPlayBtn = document.getElementById('video-play-btn');
        const videoCtaBtn = document.getElementById('video-cta-btn');
        const videoModal = document.getElementById('video-modal');
        const modalVideo = document.getElementById('modal-video');
        const modalClose = document.getElementById('modal-close');
        const modalBackdrop = document.getElementById('modal-backdrop');
        const body = document.body;

        // Start background video when section is in view
        const videoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (backgroundVideo) {
                        backgroundVideo.play().catch(error => {
                            console.log('Background video autoplay prevented:', error);
                        });
                    }
                } else {
                    if (backgroundVideo) {
                        backgroundVideo.pause();
                    }
                }
            });
        }, { threshold: 0.5 });

        videoObserver.observe(videoSection);

        // Open video modal
        function openVideoModal() {
            if (videoModal && modalVideo) {
                videoModal.classList.add('active');
                body.style.overflow = 'hidden';
                
                // Load and play video in modal
                modalVideo.load();
                modalVideo.play().catch(error => {
                    console.log('Modal video play prevented:', error);
                });
            }
        }

        // Close video modal
        function closeVideoModal() {
            if (videoModal && modalVideo) {
                videoModal.classList.remove('active');
                body.style.overflow = '';
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        }

        // Event listeners
        if (videoPlayBtn) {
            videoPlayBtn.addEventListener('click', openVideoModal);
        }

        if (videoCtaBtn) {
            videoCtaBtn.addEventListener('click', openVideoModal);
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeVideoModal);
        }

        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closeVideoModal);
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });

        // Pause background video when modal is open
        if (videoModal) {
            const modalObserver = new MutationObserver(function(mutations) {
                mutations.forEach(mutation => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (videoModal.classList.contains('active')) {
                            if (backgroundVideo) {
                                backgroundVideo.pause();
                            }
                        } else {
                            if (backgroundVideo) {
                                backgroundVideo.play().catch(error => {
                                    console.log('Background video resume prevented:', error);
                                });
                            }
                        }
                    }
                });
            });
            
            modalObserver.observe(videoModal, { attributes: true });
        }

    } catch (error) {
        handleError(error, 'Video Section');
    }
});
