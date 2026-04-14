/**
 * Косметологическая клиника — общие скрипты
 * Бургер-меню, анимация появления при скролле
 */

// ---------- Бургер-меню (работает на всех страницах) ----------
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Закрываем меню при клике на любую ссылку в навигации
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// ---------- Анимация появления элементов при скролле ----------
// Используем IntersectionObserver для всех элементов с классом .service-card,
// .service-item, .page-title, .btn-telegram, .address-detail, .map-container,
// .directions, .contacts-grid и т.д. (универсально)
document.addEventListener('DOMContentLoaded', function () {
    // Собираем все элементы, которые должны появляться с анимацией
    const animatedItems = document.querySelectorAll(
        '.service-card, .service-item, .page-title, .btn-telegram, ' +
        '.address-detail, .map-container, .directions, .contacts-grid'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // отключаем наблюдение после появления
            }
        });
    }, { threshold: 0.2 }); // срабатывает, когда 20% элемента видно

    animatedItems.forEach(item => observer.observe(item));

    // Также для элементов, которые уже видны при загрузке (например, .page-title на services)
    // Дополнительная проверка не нужна, так как observer сам обработает.
});