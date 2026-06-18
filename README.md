# ЧистоИваново — сайт клининга для Cloudflare Pages

Полностью рабочий лендинг клининга в Иваново: услуги, прайс, интерактивный калькулятор, корзина выбранных услуг, форма заявки и отправка заявок в Telegram через Cloudflare Pages Function `POST /api/lead`.

## Что внутри

- Vite + React + TypeScript
- Tailwind CSS
- Cloudflare Pages Functions
- SEO-теги для запросов по клинингу в Иваново
- `.env.example` и `.dev.vars.example` без секретов
- `wrangler.toml` с `pages_build_output_dir = "dist"`

## Быстрый запуск локально

```bash
npm install
npm run dev
```

Сайт откроется по адресу `http://localhost:5173`.

## Проверка сборки

```bash
npm run build
```

Готовая статическая сборка появится в папке `dist/`.

## Деплой на Cloudflare Pages

В Cloudflare Pages нужно выбрать **Vite**, а не Next.js.

Обязательные настройки:

```txt
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
Node.js version: 22 или текущая доступная
```

Очень важно: если в Cloudflare сейчас стоит команда

```txt
npx @cloudflare/next-on-pages@1
```

замените её на:

```txt
npm run build
```

Команда `next-on-pages` предназначена для Next.js-проектов. Этот проект собран на Vite + Cloudflare Pages Functions, поэтому для него нужен обычный build в папку `dist`.

## Переменные окружения для Telegram

В Cloudflare Pages откройте:

```txt
Settings → Environment variables → Add variable
```

Добавьте переменные для Production и, при необходимости, Preview:

```txt
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id
```

Секреты нельзя хранить в коде и нельзя коммитить в GitHub.

## Как получить TELEGRAM_BOT_TOKEN

1. Откройте Telegram.
2. Найдите `@BotFather`.
3. Отправьте `/newbot`.
4. Задайте имя и username бота.
5. Скопируйте выданный HTTP API token.
6. Добавьте его в Cloudflare Pages как `TELEGRAM_BOT_TOKEN`.

## Как получить TELEGRAM_CHAT_ID

Вариант 1:

1. Найдите в Telegram `@userinfobot`.
2. Отправьте `/start`.
3. Скопируйте цифры из поля `Id`.
4. Добавьте их в Cloudflare Pages как `TELEGRAM_CHAT_ID`.

Вариант 2:

1. Напишите `/start` своему созданному боту.
2. Откройте в браузере:

```txt
https://api.telegram.org/botВАШ_ТОКЕН/getUpdates
```

3. Найдите поле `chat.id`.

Важно: обязательно нажмите `/start` у своего бота, иначе Telegram может не принимать отправку сообщений от сайта.

## Локальная проверка Cloudflare Function

Для локального теста функции создайте `.dev.vars` из примера:

```bash
cp .dev.vars.example .dev.vars
```

Заполните токен и chat_id, затем выполните:

```bash
npm run cf:dev
```

После этого можно тестировать форму через локальный Cloudflare Pages dev-сервер.

## Как проверить после деплоя

1. Откройте опубликованный сайт.
2. Перейдите к калькулятору.
3. Выберите тип помещения, площадь, услугу и дополнительные услуги.
4. Нажмите «Перейти к оформлению».
5. Заполните ФИО, телефон и адрес.
6. Отправьте заявку.
7. Проверьте, что сообщение пришло в Telegram.

Если Telegram-переменные не настроены или указаны неверно, форма покажет понятную ошибку и предложит клиенту связаться напрямую через Telegram/VK, а также скопировать текст заявки.

## Исправленная причина падения деплоя

В логах Cloudflare был запуск:

```txt
Executing user command: npx @cloudflare/next-on-pages@1
```

Это неправильная команда для данного проекта. Из-за неё Cloudflare пытался собрать сайт как Next.js и падал на маршруте `/api/lead`.

Для этой версии проекта нужно использовать:

```txt
npm run build
```

и output directory:

```txt
dist
```

## Структура проекта

```txt
functions/api/lead.ts   # Cloudflare Pages Function для отправки заявки в Telegram
src/components/         # Секции сайта, калькулятор и форма
src/index.css           # Tailwind и общие классы
public/_headers         # базовые security/cache headers для Cloudflare
public/_redirects       # fallback для SPA
wrangler.toml           # Cloudflare Pages output directory
```
