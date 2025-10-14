// Main application logic for Burger 22 menu

const scrollToTopBtn = document.getElementById('scrollToTop');
const menuNav = document.getElementById('menuNav');
const navSpacer = document.getElementById('navSpacer');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.menu-section');

let navOffset = menuNav.offsetTop;

// Recalculate offset on load
window.addEventListener('load', function() {
    navOffset = menuNav.offsetTop;
});

// Function to detect active section
function updateActiveSection() {
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update active class for navigation
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === currentSection) {
            item.classList.add('active');

            // Auto-scroll navigation to show active item
            scrollNavToActiveItem(item);
        }
    });
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

    // Sticky navigation - only stick if scrolled past the nav AND not at the very top
    if (scrollPosition >= navOffset && scrollPosition > 10) {
        menuNav.classList.add('sticky');
        navSpacer.classList.add('active');
    } else {
        menuNav.classList.remove('sticky');
        navSpacer.classList.remove('active');
    }

    // Show/hide scroll to top button
    if (scrollPosition > 150) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }

    // Update active section
    updateActiveSection();
});

// Scroll to top on click
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Force update offset after scroll animation completes
    setTimeout(function() {
        navOffset = menuNav.offsetTop;
    }, 500);
});

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
