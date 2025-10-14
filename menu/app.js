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
            } else {
                menuNav.classList.remove('sticky');
                navSpacer.classList.remove('active');
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
