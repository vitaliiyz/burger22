# Burger 22 - Документация для разработчиков

## Общее описание проекта

Burger 22 - это веб-сайт бургерной в Вроцлаве, Польша. Проект представляет собой статический веб-сайт с интерактивным меню, системой корзины заказов и интеграцией с Telegram для приема заказов.

### Основная информация
- **Домен**: burger22.pl
- **Языки интерфейса**: Польский (pl), Английский (en)
- **Репозиторий**: Git с основной веткой `main`
- **Хостинг**: Статический сайт (вероятно GitHub Pages или Cloudflare Pages)
- **Backend**: Cloudflare Workers для обработки заказов

## Технологический стек

### Frontend
- **Vanilla JavaScript** (ES6+) - без фреймворков
- **HTML5** с семантическими тегами
- **CSS3** с градиентами, анимациями и переходами
- **LocalStorage** для хранения:
  - Корзины покупок (`burger22_cart`)
  - Выбранного языка (`burgerLang`)

### Backend
- **Cloudflare Workers** - serverless функции для обработки заказов
- **Telegram Bot API** - для отправки уведомлений о заказах
- **Rate Limiting** - in-memory защита от спама (5 запросов/минуту)

### CI/CD
- **GitHub Actions** - автоматический деплой Cloudflare Worker
- **Wrangler** - CLI для Cloudflare Workers

## Структура проекта

```
burger22/
├── .github/
│   └── workflows/
│       └── deploy-worker.yml      # CI/CD для Cloudflare Worker
├── cart/                          # Страница корзины
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── translations.js
├── common/                        # Общие компоненты
│   ├── cart.js                    # Класс корзины (ShoppingCart)
│   ├── common.js                  # Общие функции (i18n, навигация)
│   ├── common.css                 # Общие стили
│   ├── header.html                # Шаблон шапки
│   ├── footer.html                # Шаблон футера
│   └── images/                    # Изображения (логотипы, иконки)
├── menu/                          # Основная страница меню
│   ├── index.html
│   ├── styles.css
│   ├── app.js                     # Sticky nav, Intersection Observer
│   └── translations.js            # Переводы меню
├── menu-beta/                     # Тестовая версия меню
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── menu-cart.js
│   └── translations.js
├── index.html                     # Главная страница
├── styles.css                     # Стили главной страницы
├── home.js                        # Логика главной страницы
├── contact.html                   # Страница контактов
├── contact.js
├── contact-styles.css
├── cloudflare-worker.js           # Serverless функция для заказов
├── wrangler.toml                  # Конфигурация Cloudflare Worker
├── CNAME                          # Доменное имя
└── .gitignore
```

## Ключевые файлы и модули

### 1. `common/cart.js` - Система корзины
Класс `ShoppingCart` управляет корзиной покупок:
- Методы: `addItem()`, `removeItem()`, `updateQuantity()`, `clearCart()`
- События: Dispatch `cartUpdated` при изменениях
- Хранение: LocalStorage (`burger22_cart`)
- Глобальный доступ: `window.BurgerCart`

### 2. `common/common.js` - Общие утилиты
- **i18n система**: `applyTranslations()`, `switchLanguage()`
- **Загрузка компонентов**: `loadComponent()` для header/footer
- **Burger menu**: Мобильная навигация
- **Обновление счетчика корзины**: `updateCartCount()`
- **Управление путями**: `fixHeaderPaths()` для разных уровней вложенности

Глобальный доступ: `window.CommonUtils`

### 3. `cloudflare-worker.js` - Backend для заказов
- **Валидация**: `validateOrderData()` с лимитами длины полей
- **Security**: CORS, проверка origin, rate limiting по IP
- **Escaping**: `escapeHtml()` для предотвращения XSS
- **Telegram**: Автоматическое получение Chat ID
- **Форматирование**: HTML-сообщения для Telegram

### 4. Система переводов
Каждая страница имеет `translations.js` с объектом:
```javascript
const translations = {
    pl: { /* Польские тексты */ },
    en: { /* Английские тексты */ }
};
```

Переводы применяются через атрибут `data-i18n`:
```html
<h2 data-i18n="nav.menu">Menu</h2>
```

## Соглашения по коду

### HTML
1. **Семантическая разметка**: Используй `<nav>`, `<section>`, `<header>`, `<footer>`
2. **Accessibility**: Всегда добавляй `aria-label` для кнопок без текста
3. **i18n атрибуты**: Используй `data-i18n` для всех переводимых текстов
4. **Мета-теги**: Полный набор для PWA и мобильных устройств

### CSS
1. **Naming**: BEM-подобная методология (например, `.burger-menu-btn`, `.nav-item`)
2. **Градиенты**: Активно используются для кнопок и фонов
3. **Анимации**: Плавные переходы `transition` везде
4. **Responsive**: Mobile-first подход, медиа-запросы для десктопа
5. **CSS переменные**: НЕ используются (можно добавить для улучшения)

### JavaScript
1. **Vanilla JS**: Без зависимостей, чистый ES6+
2. **Event-driven**: CustomEvent для коммуникации между модулями
3. **LocalStorage**: Всегда оборачивай в try-catch
4. **Async/await**: Для fetch запросов
5. **Глобальные объекты**: `window.BurgerCart`, `window.CommonUtils`
6. **Comments**: Русские комментарии в коде
7. **Константы**: UPPERCASE для конфигураций

#### Стиль кода:
```javascript
// ✅ GOOD
const translations = {
    pl: { /* ... */ },
    en: { /* ... */ }
};

async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        // ...
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// ✅ GOOD - Event dispatch
window.dispatchEvent(new CustomEvent('cartUpdated', {
    detail: { items: this.items }
}));
```

### Пути к файлам
**ВАЖНО**: Проект использует относительные пути, которые меняются в зависимости от вложенности:

```javascript
// В header.html используются плейсхолдеры:
INDEX_PATH   → заменяется на index.html или ../index.html
MENU_PATH    → заменяется на menu/index.html или index.html
CART_PATH    → заменяется на cart/index.html или ../cart/index.html
CONTACT_PATH → заменяется на contact.html или ../contact.html

// Функция fixHeaderPaths() в common.js делает замену
```

## Команды для работы

### Cloudflare Worker
```bash
# Локальная разработка Worker
wrangler dev

# Деплой Worker вручную
wrangler deploy

# Просмотр логов Worker
wrangler tail

# Установка секретов
wrangler secret put TELEGRAM_BOT_TOKEN
```

### Git workflow
```bash
# Стандартный flow
git add .
git commit -m "feat: описание изменений"
git push origin main

# Деплой Worker происходит автоматически при push в main
# если изменены: cloudflare-worker.js, wrangler.toml
```

### Локальная разработка
```bash
# Просто открой файлы в браузере
# Для полной работы нужен локальный сервер:

# Python
python3 -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

## Важные паттерны

### 1. Добавление нового раздела меню
```javascript
// В translations.js добавь:
nav: {
    newSection: '🔥 Новый раздел'  // для навигации
},
sections: {
    newSection: 'Новый раздел'     // для заголовка
}

// В HTML добавь:
<a href="#new-section" class="nav-item" data-section="new-section">
    <span data-i18n="nav.newSection">🔥 Новый раздел</span>
</a>

<section id="new-section" class="menu-section">
    <h2 class="section-title" data-i18n="sections.newSection">Новый раздел</h2>
    <!-- Контент -->
</section>
```

### 2. Добавление товара в корзину
```javascript
// Формат item:
const item = {
    id: 'unique-item-id',      // Уникальный ID
    name: 'Название товара',
    price: 25.50,              // Число в PLN
    type: 'burger',            // Тип: burger, side, drink
    image: 'path/to/image.jpg' // Опционально
};

// Добавление:
window.BurgerCart.addItem(item);

// Корзина автоматически dispatch 'cartUpdated' event
```

### 3. Работа с переводами
```javascript
// В translations.js:
const translations = {
    pl: {
        'path.to.text': 'Польский текст'
    },
    en: {
        'path.to.text': 'English text'
    }
};

// В HTML:
<p data-i18n="path.to.text">Текст по умолчанию</p>

// Применение после загрузки:
applyAllTranslations();
```

### 4. Динамическая загрузка header/footer
```javascript
// common.js автоматически загружает компоненты:
await loadComponent('common-header', basePath + 'header.html');
await loadComponent('common-footer', basePath + 'footer.html');

// В HTML нужны только контейнеры:
<div id="common-header"></div>
<div id="common-footer"></div>
```

## Безопасность

### Frontend
1. **XSS защита**: Используй `textContent` вместо `innerHTML` для пользовательского ввода
2. **LocalStorage**: Не храни чувствительные данные
3. **CORS**: Проверяй origin при fetch запросах

### Backend (Cloudflare Worker)
1. **Rate Limiting**: 5 запросов/минута с одного IP
2. **Origin check**: Только burger22.pl и www.burger22.pl
3. **Input validation**: Длина полей, типы данных
4. **HTML escaping**: `escapeHtml()` перед отправкой в Telegram
5. **Секреты**: НИКОГДА не коммить токены (используй GitHub Secrets)

### Файлы с секретами (НЕ коммитить!)
- `.dev.vars` - локальные переменные для Wrangler
- `.env` - любые env файлы
- Любые файлы с токенами/паролями

## GitHub Secrets

Необходимые секреты в GitHub Actions:
- `CLOUDFLARE_API_TOKEN` - API токен Cloudflare
- `TELEGRAM_BOT_TOKEN` - токен Telegram бота

## Особенности проекта

### 1. Многоязычность
- Язык сохраняется в `localStorage` (`burgerLang`)
- По умолчанию: польский (`pl`)
- Переключение через кнопки с `data-lang` атрибутом
- Event `languageChanged` для реакции на смену языка

### 2. Корзина заказов
- Сохраняется в LocalStorage
- Глобальный доступ через `window.BurgerCart`
- Event-driven обновления UI
- Поддержка количества товаров

### 3. Sticky Navigation
- Intersection Observer для отслеживания секций
- Автоматическая прокрутка навигации на мобильных
- RequestAnimationFrame для производительности

### 4. Mobile-First
- Burger menu для мобильных устройств
- Responsive дизайн с медиа-запросами
- Touch-friendly элементы
- Viewport meta для iOS

## Типичные задачи

### Добавить новый бургер
1. Создай изображение в `menu/images/burgers/`
2. Добавь переводы в `menu/translations.js`:
   ```javascript
   burgers: {
       newBurger: {
           name: 'Название',
           desc: 'Описание с <strong>выделениями</strong>'
       }
   }
   ```
3. Добавь HTML в `menu/index.html`:
   ```html
   <div class="menu-item">
       <img src="images/burgers/new-burger.jpg" alt="">
       <div class="item-info">
           <h3 class="item-name" data-i18n="burgers.newBurger.name">Название</h3>
           <p class="item-description" data-i18n="burgers.newBurger.desc">Описание</p>
           <span class="item-price">25 zł</span>
       </div>
   </div>
   ```

### Изменить стили
1. Для общих стилей → `common/common.css`
2. Для страницы меню → `menu/styles.css`
3. Для главной → `styles.css`
4. Для контактов → `contact-styles.css`
5. Для корзины → `cart/styles.css`

### Добавить страницу
1. Создай директорию (например, `about/`)
2. Добавь файлы: `index.html`, `styles.css`, `app.js`, `translations.js`
3. Подключи общие компоненты:
   ```html
   <div id="common-header"></div>
   <div id="common-footer"></div>

   <script src="../common/cart.js"></script>
   <script src="../common/common.js"></script>
   <script src="app.js"></script>
   <script src="translations.js"></script>
   ```
4. Добавь ссылки в `header.html` и `footer.html`

### Обновить Cloudflare Worker
1. Редактируй `cloudflare-worker.js`
2. Тестируй локально: `wrangler dev`
3. Коммит и push в `main` → автоматический деплой
4. Или ручной деплой: `wrangler deploy`

### Работать с баннером объявлений

Баннер для важных объявлений отображается на всех страницах сайта (главная, меню, корзина, контакты).

**Расположение:**
- HTML: `common/header.html` (в начале файла)
- Стили: `common/common.css` (раздел "Announcement Banner")
- Переводы: `common/common.js` (объект `commonTranslations.notice`)

**Чтобы показать/обновить баннер:**
1. Раскомментируй (если закомментировано) секцию баннера в `common/header.html`:
   ```html
   <!-- Найди эти строки и раскомментируй -->
   <div class="announcement-banner">
       <div class="announcement-banner-icon">🎄</div>
       <div class="announcement-banner-content">
           <h3 class="announcement-banner-title" data-i18n="notice.title">...</h3>
           <p class="announcement-banner-message" data-i18n="notice.message">...</p>
       </div>
   </div>
   ```

2. Обнови тексты в `common/common.js` для обоих языков (pl и en):
   ```javascript
   const commonTranslations = {
       pl: {
           notice: {
               title: 'Заголовок объявления',      // Краткий заголовок
               message: 'Подробное сообщение'      // Детальное сообщение
           },
           // ...
       },
       en: {
           notice: {
               title: 'Announcement title',
               message: 'Detailed message'
           },
           // ...
       }
   };
   ```

3. (Опционально) Смени иконку в `common/header.html`:
   - Замени эмодзи в `<div class="announcement-banner-icon">🎄</div>`

**Чтобы скрыть баннер:**
- Закомментируй весь блок `<div class="announcement-banner">...</div>` в `common/header.html`

**Примеры использования:**

```javascript
// Рождественское закрытие
notice: {
    title: 'Zamknięte 24-25 grudnia',
    message: 'Wracamy 26 grudnia. Wesołych Świąt!'
}

// Специальное предложение
notice: {
    title: 'Nowa promocja!',
    message: 'Kup 2 burgery, dostaniesz 3. Tylko dziś!'
}

// Изменение часов работы
notice: {
    title: 'Nowe godziny otwarcia',
    message: 'Od poniedziałku pracujemy 10:00-23:00'
}

// Временное закрытие
notice: {
    title: 'Przerwa techniczna',
    message: 'Zamknięte 15-17 stycznia na remont'
}

// Новогодний график (с HTML-тегом для переноса строки)
notice: {
    title: 'Sylwester i Nowy Rok - Zmienione godziny',
    message: '31.12: 12:00-17:00 | 01.01: Zamknięte<br>Szczęśliwego Nowego Roku!'
}
```

**Примеры иконок (эмодзи):**
- 🎄 - Рождество
- 🎉 - Акция/праздник
- 📢 - Важное объявление
- ⚠️ - Предупреждение
- 🔥 - Горячее предложение
- ⏰ - Изменение времени работы
- 🛠️ - Технические работы
- 🎁 - Подарок/сюрприз

**Важно:**
- Баннер отображается на ВСЕХ страницах сайта
- Переводы находятся в `common/common.js`, а не в page-specific translations
- В поле `message` можно использовать HTML-теги (например `<br>` для переноса строки)
- Стили адаптивны для мобильных устройств
- Баннер имеет анимацию появления (slideInDown) и пульсирующую иконку

## Debug советы

### LocalStorage
```javascript
// Просмотр корзины
console.log(JSON.parse(localStorage.getItem('burger22_cart')));

// Очистка корзины
localStorage.removeItem('burger22_cart');

// Смена языка
localStorage.setItem('burgerLang', 'en');
```

### События
```javascript
// Слушай события корзины
window.addEventListener('cartUpdated', (e) => {
    console.log('Cart updated:', e.detail);
});

// Слушай смену языка
window.addEventListener('languageChanged', (e) => {
    console.log('Language changed to:', e.detail.lang);
});
```

### Cloudflare Worker
```bash
# Реал-тайм логи
wrangler tail

# Локальная разработка с логами
wrangler dev
```

## Производительность

### Best Practices
1. **Lazy loading**: Компоненты загружаются асинхронно
2. **Event delegation**: Меньше event listeners
3. **RequestAnimationFrame**: Для scroll обработчиков
4. **Intersection Observer**: Вместо scroll events для секций
5. **LocalStorage**: Минимизация операций чтения/записи

### Оптимизации
- Используй `passive: true` для scroll listeners
- Debounce/throttle для частых событий
- Минимизация DOM манипуляций
- CSS transitions вместо JS анимаций

## Контакты проекта

- **Телефон**: +48 573 256 526
- **Адрес**: Вроцлав, Польша
- **Домен**: burger22.pl
- **Сервисы доставки**: Pyszne.pl, Uber Eats, Wolt, Glovo, Bolt Food

## Полезные ссылки

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

**Создано для Claude Code** - используй этот файл как справочник для быстрого понимания проекта и внесения изменений.
