/**
 * Косметологическая клиника — общие скрипты
 */

// ---------- Бургер-меню ----------
(function initBurgerMenu() {
    document.addEventListener('DOMContentLoaded', () => {
        const burger = document.getElementById('burgerBtn');
        const navMenu = document.getElementById('navMenu');

        if (!burger || !navMenu) return;

        const closeMenu = () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        };

        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav a:not(.dropbtn), .dropdown-content a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !burger.contains(e.target)) {
                closeMenu();
            }
        });
    });
})();

// ---------- Анимация появления элементов при скролле ----------
(function initScrollAnimation() {
    document.addEventListener('DOMContentLoaded', () => {
        const animatedItems = document.querySelectorAll(
            '.service-card, .service-item, .page-title, .btn-telegram, ' +
            '.address-detail, .map-container, .directions, .contact-card'
        );
        
        if (animatedItems.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px 80px 0px'
        });
        
        animatedItems.forEach(item => observer.observe(item));
    });
})();

// ---------- Подсветка активного пункта меню ----------
(function initActiveMenuItem() {
    document.addEventListener('DOMContentLoaded', () => {
        let currentFile = window.location.pathname.split('/').pop();
        if (currentFile === '' || currentFile === '/') currentFile = 'index.html';
        
        document.querySelectorAll('.nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const linkFile = href.split('/').pop().split('#')[0];
            if (linkFile === currentFile) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
})();

// ---------- Cookie-баннер ----------
(function initCookieBanner() {
    document.addEventListener('DOMContentLoaded', () => {
        const banner = document.getElementById('cookie-banner');
        if (!banner) return;
        
        const acceptBtn = document.getElementById('accept-cookies');
        if (!acceptBtn) return;
        
        if (localStorage.getItem('cookiesAccepted') === 'true') {
            banner.style.display = 'none';
        }
        
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            banner.style.display = 'none';
        });
    });
})();

// ---------- Выпадающее меню "О нас" на мобильных ----------
(function initMobileDropdown() {
    document.addEventListener('DOMContentLoaded', () => {
        const dropdown = document.querySelector('.dropdown');
        const dropbtn = dropdown?.querySelector('.dropbtn');
        if (!dropdown || !dropbtn) return;

        dropbtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && dropdown.classList.contains('active') && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
})();