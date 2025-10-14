// Main application logic for Burger 22 menu

const menuNav = document.getElementById('menuNav');
const navSpacer = document.getElementById('navSpacer');
const sections = document.querySelectorAll('.menu-section');

let navOffset = 0;

// Calculate initial offset
function calculateNavOffset() {
    // Only recalculate if nav is NOT sticky
    if (!menuNav.classList.contains('sticky')) {
        navOffset = menuNav.offsetTop;
    }
}

// Recalculate offset on load and resize
window.addEventListener('load', calculateNavOffset);
window.addEventListener('resize', calculateNavOffset);

// Initial calculation
calculateNavOffset();

// Function to detect active section
function updateActiveSection() {
    const navHeight = menuNav.offsetHeight;
    // Use middle of the viewport as the reference point
    const viewportMiddle = window.pageYOffset + navHeight + (window.innerHeight - navHeight) / 3;

    let currentSection = '';

    // Find which section contains the viewport middle
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;
        const sectionId = section.getAttribute('id');

        // Check if viewport middle is within this section
        if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
            currentSection = sectionId;
            break;
        }
    }

    // If still no section (edge case at bottom), use the last section
    if (!currentSection && sections.length > 0) {
        const lastSection = sections[sections.length - 1];
        const lastSectionTop = lastSection.offsetTop;

        if (window.pageYOffset + navHeight >= lastSectionTop) {
            currentSection = lastSection.getAttribute('id');
        }
    }

    // If still no section (edge case at top), use the first section
    if (!currentSection && sections.length > 0) {
        currentSection = sections[0].getAttribute('id');
    }

    // Remove active from ALL nav items
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach(item => {
        item.classList.remove('active');
    });

    // Add active to ONLY the current section
    if (currentSection) {
        const activeNavItem = document.querySelector(`.nav-item[data-section="${currentSection}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');

            // Auto-scroll navigation on mobile
            if (window.innerWidth <= 768) {
                scrollNavToActiveItem(activeNavItem);
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

// Handle scroll with performance optimization
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const scrollPosition = window.pageYOffset;

            // Sticky navigation
            if (scrollPosition >= navOffset) {
                menuNav.classList.add('sticky');
                navSpacer.classList.add('active');
            } else {
                menuNav.classList.remove('sticky');
                navSpacer.classList.remove('active');
                // Recalculate offset when nav becomes unsticky
                calculateNavOffset();
            }

            // Update active section
            updateActiveSection();

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

// Initial active section update
updateActiveSection();
