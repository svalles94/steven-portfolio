// Modern Portfolio JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Progress bar animation
    updateProgressBar();
    
    // Navbar scroll effect
    initNavbarScroll();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // GSAP animations
    initAnimations();
    
    // Contact form handling - Disabled for now
    // initContactForm();
});

// Progress Bar
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });
}

// GSAP Animations
function initAnimations() {
    // Hero section animations
    gsap.fromTo('.hero-title', {
        y: 100,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.fromTo('.hero-subtitle', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.fromTo('.hero-buttons', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.fromTo('.hero-image', {
        x: 100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    // About section animations
    gsap.fromTo('.about-content', {
        x: -100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.fromTo('.about-image', {
        x: 100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Skills animation
    gsap.fromTo('.skill-item', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Projects animation
    gsap.fromTo('.project-card', {
        y: 100,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Dedicated project sections animations
    gsap.fromTo('.project-overview', {
        x: -100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.standup-section, .tcg-section, .atlantic-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.fromTo('.screenshots-gallery, .project-image-placeholder, .project-image-container', {
        x: 100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.standup-section, .tcg-section, .atlantic-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Contact section animation
    gsap.fromTo('.contact-content', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Initialize parallax on load
// window.addEventListener('load', initParallax);

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .about-content, .about-image');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize intersection observer
initIntersectionObserver();

// Screenshot Gallery Functionality
function changeMainImage(thumbnail) {
    // Find the closest gallery container and then the main screenshot within it
    const galleryContainer = thumbnail.closest('.screenshots-gallery');
    const mainImage = galleryContainer ? galleryContainer.querySelector('.main-screenshot img') : null;
    
    if (mainImage && thumbnail.src) {
        mainImage.src = thumbnail.src;
        mainImage.alt = thumbnail.alt;
        
        // Add smooth transition effect
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.style.opacity = '1';
        }, 150);
    }
}

// Make changeMainImage function globally available
window.changeMainImage = changeMainImage;