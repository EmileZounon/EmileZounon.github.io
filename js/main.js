// ==========================================
// Mobile Navigation Toggle
// ==========================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    // Inject close button inside the drawer
    const navClose = document.createElement('button');
    navClose.className = 'nav-close';
    navClose.setAttribute('aria-label', 'Close navigation');
    navClose.innerHTML = '<i class="fas fa-times"></i>';
    navMenu.prepend(navClose);

    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    navClose.addEventListener('click', closeMenu);

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });
}

// ==========================================
// Scroll-based Navbar Background
// ==========================================

const navbar = document.getElementById('navbar');
const hasHeroOrHeader = document.querySelector('.hero') || document.querySelector('.page-header');

function updateNavbar() {
    if (!hasHeroOrHeader || window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// ==========================================
// Active Nav Link Highlighting
// ==========================================

const path = window.location.pathname;
const currentPage = path.split('/').pop() || 'index.html';
// For subdirectory pages, detect the parent section
const inBlogSubdir = path.includes('/blog/');
const inProjectsSubdir = path.includes('/projects/');

document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    const hrefFile = href.split('/').pop();
    if (inBlogSubdir && hrefFile === 'blog.html') {
        link.classList.add('active');
    } else if (inProjectsSubdir && hrefFile === 'work.html') {
        link.classList.add('active');
    } else if (!inBlogSubdir && !inProjectsSubdir && hrefFile === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// ==========================================
// Fade-in on Scroll
// ==========================================

const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
}

// ==========================================
// Lightbox
// ==========================================

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = galleryItems[index].src;
        lightboxImg.alt = galleryItems[index].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigate(direction) {
        currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
        lightboxImg.src = galleryItems[currentIndex].src;
        lightboxImg.alt = galleryItems[currentIndex].alt;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });
}

initLightbox();

// ==========================================
// Contact Form (Formspree)
// ==========================================

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = 'Sending… <i class="fas fa-spinner fa-spin"></i>';
        status.className = 'form-status';
        status.textContent = '';

        try {
            const response = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID', {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.reset();
                status.className = 'form-status success';
                status.textContent = "Message sent! I'll get back to you soon.";
                btn.innerHTML = 'Sent <i class="fas fa-check"></i>';
            } else {
                throw new Error('failed');
            }
        } catch {
            status.className = 'form-status error';
            status.textContent = 'Something went wrong. Please try again or reach out on LinkedIn.';
            btn.disabled = false;
            btn.innerHTML = originalHTML;
        }
    });
}

// ==========================================
// Page Load Animation
// ==========================================

window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});
