function renderBurgers() {
    const grid = document.getElementById('burgerGrid');
    const lang = window.CommonUtils.currentLang;
    const copy = translations[lang];

    grid.replaceChildren(...window.MenuData.burgers.map((burger, index) => {
        const card = document.createElement('article');
        card.className = 'menu-item';
        card.innerHTML = `
            <img class="item-image" loading="lazy" decoding="async">
            <div class="item-content">
                <span class="new-badge" hidden></span>
                <div class="item-header">
                    <h3 class="item-name"></h3>
                    <span class="item-price"></span>
                </div>
                <p class="item-description"></p>
                <div class="item-footer">
                    <p class="zestaw-price">
                        <span class="zestaw-label"></span><br>
                        <span class="combo-classic"></span><br>
                        <span class="combo-wedges"></span>
                    </p>
                </div>
            </div>`;
        const image = card.querySelector('.item-image');
        const aboveFold = index === 0 || (index === 1 && window.matchMedia('(min-width: 900px)').matches);
        if (aboveFold) {
            image.loading = 'eager';
            image.fetchPriority = 'high';
        }
        image.src = '../' + burger.image;
        image.alt = burger.menuAlt;

        card.querySelector('.item-name').textContent = burger.text[lang].name;
        card.querySelector('.item-price').textContent = burger.price;
        card.querySelector('.item-description').innerHTML = burger.text[lang].description;
        card.querySelector('.zestaw-label').textContent = copy.comboTitle;
        card.querySelector('.combo-classic').textContent = copy.comboClassicOption;
        card.querySelector('.combo-wedges').textContent = copy.comboWedgesOption;

        if (burger.id === 'vegeCamemburger') {
            const badge = card.querySelector('.new-badge');
            badge.hidden = false;
            badge.textContent = copy.newItem;
        }
        return card;
    }));
}

const menuNav = document.getElementById('menuNav');
const navItems = [...menuNav.querySelectorAll('.nav-item')];
const sections = [...document.querySelectorAll('.menu-section')];
let activeSection = '';

function setActiveSection(id) {
    if (id === activeSection) return;
    activeSection = id;
    navItems.forEach(item => {
        const isActive = item.dataset.section === id;
        item.classList.toggle('active', isActive);
        if (isActive) {
            item.setAttribute('aria-current', 'location');
            const left = item.offsetLeft - (menuNav.clientWidth - item.offsetWidth) / 2;
            menuNav.scrollTo({ left, behavior: 'smooth' });
        } else {
            item.removeAttribute('aria-current');
        }
    });
}

function updateActiveSection() {
    const threshold = menuNav.getBoundingClientRect().bottom + 24;
    let current = sections[0].id;
    sections.forEach(section => {
        if (section.getBoundingClientRect().top <= threshold) current = section.id;
    });
    setActiveSection(current);
}

let scrollQueued = false;
window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
        updateActiveSection();
        scrollQueued = false;
    });
}, { passive: true });
window.addEventListener('resize', updateActiveSection);
navItems.forEach(item => item.addEventListener('click', () => {
    setActiveSection(item.dataset.section);
}));

function initMenuHeader() {
    const siteHeader = document.querySelector('.site-header');
    if (!siteHeader || !siteHeader.hidden) return;
    siteHeader.hidden = false;
    window.CommonUtils.initLanguageButtons();
    applyAllTranslations();
}

const copyPhoneBtn = document.getElementById('copyPhoneBtn');
copyPhoneBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText('+48573256526');
        copyPhoneBtn.textContent = translations[window.CommonUtils.currentLang].takeaway.copied;
        setTimeout(() => {
            copyPhoneBtn.textContent = translations[window.CommonUtils.currentLang].takeaway.copy;
        }, 2000);
    } catch (error) {
        console.error('Failed to copy phone number:', error);
    }
});

window.addEventListener('languageChanged', renderBurgers);
window.addEventListener('commonReady', initMenuHeader, { once: true });
renderBurgers();
updateActiveSection();
