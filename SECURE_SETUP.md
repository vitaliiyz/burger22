# 🔒 МАКСИМАЛЬНО БЕЗОПАСНАЯ настройка Telegram заказов

## ✅ Гарантия безопасности:

- ✅ Токен бота **НИГДЕ** не виден в коде
- ✅ Токен **НИКОГДА** не попадает в браузер
- ✅ GitHub репозиторий может быть **публичным**
- ✅ Автоматический деплой при каждом push
- ✅ **100% безопасно!** 🔒

---

## 📋 Что мы настроим:

```
GitHub Repository (публичный)
  ↓ push код
GitHub Actions (автоматически)
  ↓ читает секреты + деплоит
Cloudflare Worker (backend)
  ↓ отправляет с токеном
Telegram Bot
  ↓ присылает сообщение
📱 Тебе в Telegram!
```

**Токен существует ТОЛЬКО на серверах GitHub и Cloudflare!**

---

## 🚀 Настройка (20 минут):

### Шаг 1: Создай Telegram бота (если еще не создал)

1. Открой Telegram
2. Найди **@BotFather**
3. Отправь: `/newbot`
4. Следуй инструкциям
5. **Сохрани токен** (будет выглядеть как `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
6. Напиши своему боту **любое сообщение** (например: "start")

---

### Шаг 2: Получи Cloudflare API Token

1. Зайди на https://dash.cloudflare.com
2. Зарегистрируйся (если еще нет аккаунта)
3. Нажми на свой профиль (справа вверху) → **My Profile**
4. Слева выбери **API Tokens**
5. Нажми **Create Token**
6. Выбери шаблон **Edit Cloudflare Workers**
7. **Настрой разрешения:**
   - **Account Resources:**
     - Account → **Cloudflare Workers Scripts** → **Edit**
   - **Zone Resources:**
     - Можешь оставить как есть, или выбрать **All zones** если планируешь использовать Workers на разных доменах
8. Нажми **Continue to summary** → **Create Token**
9. **Скопируй токен** (он будет показан только один раз!)

---

### Шаг 3: Добавь секреты в GitHub

1. Открой свой репозиторий на GitHub: `https://github.com/YOUR_USERNAME/burger22`
2. Нажми **Settings** (вкладка вверху)
3. Слева выбери **Secrets and variables** → **Actions**
4. Нажми **New repository secret**

#### Добавь первый секрет:
- **Name:** `TELEGRAM_BOT_TOKEN`
- **Secret:** вставь токен от @BotFather
- Нажми **Add secret**

#### Добавь второй секрет:
- **Name:** `CLOUDFLARE_API_TOKEN`
- **Secret:** вставь Cloudflare API токен
- Нажми **Add secret**

**Готово! Секреты добавлены!** 🎉

---

### Шаг 4: Обнови Worker URL в коде

1. После первого деплоя (он произойдет автоматически после push), зайди на https://dash.cloudflare.com
2. Открой **Workers & Pages**
3. Найди `burger22-orders`
4. Скопируй URL (будет выглядеть как: `https://burger22-orders.YOUR_SUBDOMAIN.workers.dev`)

5. Открой файл `cart/app.js` в своем проекте
6. Найди строку:
   ```javascript
   const CLOUDFLARE_WORKER_URL = 'YOUR_CLOUDFLARE_WORKER_URL_HERE';
   ```
7. Замени на свой URL:
   ```javascript
   const CLOUDFLARE_WORKER_URL = 'https://burger22-orders.YOUR_SUBDOMAIN.workers.dev';
   ```
8. Сохрани файл

---

### Шаг 5: Опционально - Добавь свой домен в Worker

Если ты используешь свой домен (например, `burger22.pl`):

1. Открой `cloudflare-worker.js`
2. Найди массив `allowedOrigins`
3. Добавь свой домен:
   ```javascript
   const allowedOrigins = [
     'https://burger22.pl',           // Твой домен
     'https://www.burger22.pl',       // С www
     'http://localhost:8000',         // Для тестирования
     'http://127.0.0.1:8000',
   ];
   ```
4. Если хочешь СТРОГУЮ проверку, раскомментируй эти строки:
   ```javascript
   // Security: Verify origin (можно отключить для тестирования)
   if (origin && !allowedOrigins.includes(origin)) {
     return new Response('Forbidden', { status: 403 });
   }
   ```

---

### Шаг 6: Push в GitHub и всё!

```bash
git add .
git commit -m "Настроена безопасная отправка заказов через Telegram"
git push
```

**Всё! GitHub Actions автоматически:**
1. ✅ Прочитает секреты из GitHub Secrets
2. ✅ Задеплоит Worker в Cloudflare
3. ✅ Добавит токен бота в Worker Environment Variables
4. ✅ Worker готов принимать заказы!

---

## 🧪 Тестирование:

1. Открой свой сайт
2. Добавь товары в корзину
3. Перейди в корзину → заполни форму
4. Выбери **"Wyślij przez stronę"**
5. Нажми **"Wyślij zamówienie"**
6. **Проверь Telegram** - заказ должен прийти! 🎉

---

## 🔍 Проверка безопасности:

### ✅ Что БЕЗОПАСНО (публично в GitHub):

```
✅ cloudflare-worker.js     - только код, БЕЗ токенов
✅ wrangler.toml            - только конфигурация
✅ .github/workflows/       - только инструкции для деплоя
✅ cart/app.js              - только Worker URL
```

### 🔒 Что СПРЯТАНО (НЕ в GitHub):

```
🔒 TELEGRAM_BOT_TOKEN       - в GitHub Secrets
🔒 CLOUDFLARE_API_TOKEN     - в GitHub Secrets
🔒 Worker Environment Vars  - на серверах Cloudflare
```

**Никто не может увидеть токены!** 🔐

---

## 🛠️ Локальное тестирование (опционально):

Если хочешь тестировать Worker локально:

1. Установи Node.js и npm
2. Установи Wrangler:
   ```bash
   npm install -g wrangler
   ```
3. Создай файл `.dev.vars` (он в .gitignore, НЕ коммитится):
   ```
   TELEGRAM_BOT_TOKEN=твой_токен_здесь
   ```
4. Запусти локально:
   ```bash
   wrangler dev
   ```

---

## 📊 Мониторинг заказов:

### Заказы приходят как обычные сообщения:

```
📱 Твой Telegram
  └─ burger22orders_bot
     └─ 🍔 NOWE ZAMÓWIENIE - Burger 22

        Imię: Jan Kowalski
        Telefon: +48 123 456 789
        Odbiór: Za 30 minut
        Płatność: Gotówka

        Zamówienie:
        • Klasyczny Burger (Medium) x2 = 66 zł
        • Frytki 150g x1 = 14 zł

        RAZEM: 80 zł
```

**Просто открой чат с ботом и всё увидишь!**

---

## ❓ Решение проблем:

### Заказ не приходит:

1. **Проверь GitHub Actions:**
   - Зайди в свой репозиторий → вкладка **Actions**
   - Должна быть зеленая галочка ✅
   - Если красный крестик ❌ - открой и посмотри ошибку

2. **Проверь секреты:**
   - Settings → Secrets → Actions
   - Должны быть оба секрета: `TELEGRAM_BOT_TOKEN` и `CLOUDFLARE_API_TOKEN`

3. **Проверь что написал боту:**
   - Ты ДОЛЖЕН написать боту хотя бы одно сообщение
   - Иначе Worker не найдет твой Chat ID

4. **Проверь Worker URL в коде:**
   - `cart/app.js` должен содержать правильный URL воркера

### GitHub Actions не запускается:

1. Проверь что push был в ветку `main` или `take-away`
2. Проверь что изменился файл `cloudflare-worker.js`, `wrangler.toml` или `.github/workflows/deploy-worker.yml`

### Worker деплоится, но заказы не приходят:

1. Открой Cloudflare Dashboard → Workers → `burger22-orders` → Logs
2. Посмотри ошибки
3. Проверь что токен правильный

---

## 🎯 Что делать если токен утек (экстренный случай):

**Не паникуй! Решается за 2 минуты:**

1. Открой Telegram → @BotFather
2. Отправь `/revoke`
3. Выбери своего бота
4. Получи НОВЫЙ токен
5. Обнови секрет в GitHub:
   - Settings → Secrets → Actions
   - Найди `TELEGRAM_BOT_TOKEN`
   - Нажми Update → вставь новый токен
6. Push любое изменение (чтобы запустить деплой):
   ```bash
   git commit --allow-empty -m "Update bot token"
   git push
   ```

**Готово! Старый токен мертв, новый работает!** ✅

---

## 💰 Стоимость:

- **GitHub Actions:** Бесплатно (2000 минут/месяц для публичных репо)
- **Cloudflare Workers:** Бесплатно (100,000 запросов/день)
- **Telegram Bot:** Бесплатно навсегда

**Итого: 0 zł!** 🎉

---

## 🎉 Поздравляю!

Теперь у тебя:
- ✅ **100% безопасная** система заказов
- ✅ Токен **НИГДЕ** не виден
- ✅ Автоматический деплой
- ✅ Публичный GitHub репозиторий
- ✅ Заказы в Telegram в реальном времени

**Всё работает автоматически! Наслаждайся! 🍔**

---

## 📞 Дополнительная помощь:

Если что-то не работает:
1. Проверь GitHub Actions logs
2. Проверь Cloudflare Worker logs
3. Проверь что все секреты добавлены правильно
4. Убедись что написал боту сообщение

**Удачи! 🚀**
