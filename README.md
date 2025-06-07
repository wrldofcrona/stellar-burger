# Stellar Burger

**Stellar Burger** — это интерактивный SPA-приложение для сборки и заказа бургеров. Пользователи могут собирать собственные бургеры, регистрироваться, авторизовываться и отслеживать статус заказов в реальном времени.

---

## 🚀 Функциональность

- 👨‍🍳 Конструктор бургеров с drag & drop
- 📦 Просмотр деталей ингредиентов в модальных окнах
- 🛒 Оформление заказов
- 🔐 Регистрация, авторизация и выход из аккаунта
- 👤 Личный кабинет с историей заказов
- 📡 Подключение к WebSocket для получения живой ленты заказов
- 🧪 Тесты: `Jest` (юнит-тесты), `Cypress` (e2e-тесты)

---

## 🧰 Используемые технологии

- **React** + **Redux Toolkit**
- **TypeScript**
- **React Router v6**
- **Webpack** (ручная сборка)
- **Jest** + **React Testing Library**
- **Cypress** для E2E тестирования
- UI-компоненты: `@zlden/react-developer-burger-ui-components`

---

## 📁 Структура проекта

├── src/
│ ├── components/ # UI-компоненты
│ ├── pages/ # Страницы
│ ├── services/ # Redux slices + store
│ ├── utils/ # API, утилиты, типы
│ └── index.tsx # Точка входа
├── cypress/ # E2E тесты и фикстуры
├── public/ # HTML шаблон
├── jest.config.ts # Настройка Jest
├── tsconfig.json # TypeScript конфиг
└── webpack.config.js # Сборка Webpack

yaml
Копировать
Редактировать

---

## 📦 Установка

```bash
git clone https://github.com/wrldofcrona/stellar-burger.git
cd stellar-burger
npm install
🧪 Скрипты
Скрипт	Назначение
npm run start	Запуск дев-сервера (Webpack)
npm run build	Сборка проекта
npm run test	Запуск Jest-тестов
npm run cypress	Запуск Cypress GUI
npm run lint	ESLint проверка
npm run deploy	Деплой на GitHub Pages (не включён)

✅ Покрытие тестами
Все Redux-slice протестированы Jest

Основные пользовательские сценарии протестированы Cypress

Покрытие отображается в консоли после npm run test

🔒 Авторизация
Используется JWT: accessToken в cookie, refreshToken в localStorage

Защищённые маршруты: Профиль, История заказов, Оформление заказа

⚙️ Разработка
Проект разрабатывался в рамках обучения, без CRA, с ручной настройкой Webpack + Babel + TypeScript.

📬 Автор
GitHub: wrldofcrona

