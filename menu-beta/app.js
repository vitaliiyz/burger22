// Main application logic for Burger 22 menu

const menuNav = document.getElementById('menuNav');
const navSpacer = document.getElementById('navSpacer');
const sections = document.querySelectorAll('.menu-section');
const allNavItems = document.querySelectorAll('.nav-item');

let navOffset = 0;

// Calculate initial offset
function calculateNavOffset() {
    navOffset = menuNav.offsetTop;
}

// Recalculate offset on load and resize
window.addEventListener('load', calculateNavOffset);
window.addEventListener('resize', calculateNavOffset);

// Initial calculation
calculateNavOffset();

// Use Intersection Observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

let currentActiveSection = '';

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');

            if (sectionId !== currentActiveSection) {
                currentActiveSection = sectionId;

                // Remove active from all nav items
                allNavItems.forEach(item => {
                    item.classList.remove('active');
                });

                // Add active to current section
                const activeNavItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');

                    // Auto-scroll navigation on mobile
                    if (window.innerWidth <= 768) {
                        scrollNavToActiveItem(activeNavItem);
                    }
                }
            }
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Function to scroll navigation to active item (for mobile horizontal scroll)
function scrollNavToActiveItem(activeItem) {
    if (window.innerWidth <= 768) {
        const navContainer = menuNav;
        const itemLeft = activeItem.offsetLeft;
        const itemWidth = activeItem.offsetWidth;
        const navWidth = navContainer.offsetWidth;
        const scrollLeft = itemLeft - (navWidth / 2) + (itemWidth / 2);

        navContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }
}

// Handle sticky navigation class (for styling changes only)
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const scrollPosition = window.pageYOffset;

            // Sticky navigation styling
            if (scrollPosition >= navOffset) {
                menuNav.classList.add('sticky');
                navSpacer.classList.add('active');

                // Move cart button down on mobile when nav is sticky
                if (window.innerWidth <= 768) {
                    const cartBtn = document.getElementById('cartBtn');
                    if (cartBtn) {
                        cartBtn.classList.add('scrolled');
                    }
                    const burgerBtn = document.getElementById('burgerMenuBtn');
                    if (burgerBtn) {
                        burgerBtn.classList.add('scrolled');
                    }
                }
            } else {
                menuNav.classList.remove('sticky');
                navSpacer.classList.remove('active');

                // Reset cart button position
                const cartBtn = document.getElementById('cartBtn');
                if (cartBtn) {
                    cartBtn.classList.remove('scrolled');
                }
                const burgerBtn = document.getElementById('burgerMenuBtn');
                if (burgerBtn) {
                    burgerBtn.classList.remove('scrolled');
                }
            }

            ticking = false;
        });

        ticking = true;
    }
}, { passive: true });

// Smooth scroll to sections with sticky nav offset
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const navHeight = menuNav.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Note: Burger menu functionality is now handled by common/common.js

// Copy phone number functionality for takeaway info box
document.addEventListener('DOMContentLoaded', () => {
    const copyPhoneBtn = document.getElementById('copyPhoneBtn');

    if (copyPhoneBtn) {
        copyPhoneBtn.addEventListener('click', () => {
            const phoneNumber = '+48 573 256 526';

            navigator.clipboard.writeText(phoneNumber).then(() => {
                // Change button appearance
                copyPhoneBtn.classList.add('copied');
                const iconSpan = copyPhoneBtn.querySelector('.btn-icon');
                const textSpan = copyPhoneBtn.querySelector('span:last-child');

                const originalIcon = iconSpan.textContent;
                const originalText = textSpan.textContent;

                iconSpan.textContent = '✓';
                textSpan.textContent = getCurrentLang() === 'pl' ? 'Skopiowano!' : 'Copied!';

                // Reset after 2 seconds
                setTimeout(() => {
                    copyPhoneBtn.classList.remove('copied');
                    iconSpan.textContent = originalIcon;
                    textSpan.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert('Nie udało się skopiować numeru: +48 573 256 526');
            });
        });
    }
});

function getCurrentLang() {
    return window.CommonUtils?.currentLang || 'pl';
}
