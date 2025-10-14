// Main application logic for Burger 22 menu

const menuNav = document.getElementById('menuNav');
const navSpacer = document.getElementById('navSpacer');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.menu-section');

let navOffset = menuNav.offsetTop;
let scrollTimeout;
let currentActiveSection = '';

// Recalculate offset on load
window.addEventListener('load', function() {
    navOffset = menuNav.offsetTop;
});

// Function to detect active section
function updateActiveSection() {
    const scrollPosition = window.pageYOffset;
    const navHeight = menuNav.offsetHeight;
    const offset = scrollPosition + navHeight + 100;

    let newActiveSection = '';

    // Check each section from top to bottom
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // If the offset point is within this section
        if (offset >= sectionTop && offset < sectionBottom) {
            newActiveSection = section.getAttribute('id');
            break;
        }
    }

    // If no section found (shouldn't happen), try fallback
    if (newActiveSection === '') {
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (offset >= section.offsetTop) {
                newActiveSection = section.getAttribute('id');
                break;
            }
        }
    }

    // ALWAYS update classes, even if section is the same
    // This ensures we clean up any duplicate active states
    navItems.forEach(item => item.classList.remove('active'));

    // Add active to the correct item
    if (newActiveSection !== '') {
        currentActiveSection = newActiveSection;
        const activeItem = document.querySelector(`.nav-item[data-section="${newActiveSection}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            if (window.innerWidth <= 768) {
                scrollNavToActiveItem(activeItem);
            }
        }
    }
}

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

// Handle scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;

    // Sticky navigation - always sticky once scrolled past initial position
    if (scrollPosition >= navOffset) {
        menuNav.classList.add('sticky');
        navSpacer.classList.add('active');
    } else {
        menuNav.classList.remove('sticky');
        navSpacer.classList.remove('active');
    }

    // Update active section immediately
    updateActiveSection();
}, { passive: true });

// Smooth scroll to sections with sticky nav offset
navItems.forEach(item => {
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

// Initial active section update
updateActiveSection();
