# Hometask 02 — Blogs & Posts API

REST API на Express + TypeScript с ресурсами **Blogs** и **Posts**. Данные хранятся в in-memory хранилище (без базы данных).

## Стек

- Node.js, Express 5
- TypeScript
- express-validator — валидация тела запроса
- Jest, Supertest — тестирование
- ESLint, Prettier

## Установка и запуск

```bash
pnpm install

# режим разработки (следит за изменениями и перезапускает сервер)
pnpm watch   # компилирует TS в dist в режиме watch
pnpm dev     # запускает dist/index.js через nodemon

# тесты
pnpm jest

# линт / форматирование
pnpm lint
pnpm format
```

Сервер поднимается на порту из переменной окружения `PORT`, по умолчанию — `5001`.

## Структура проекта

```
src/
  blogs/            # роуты, обработчики, валидация и типы ресурса Blog
  posts/            # роуты, обработчики, валидация и типы ресурса Post
  testing/          # служебный роут для очистки данных в тестах
  repositories/     # доступ к in-memory хранилищу
  db/               # in-memory база данных
  middlewares/       # общие middleware (валидация id, результатов валидации)
  core/             # общие типы (HTTP-статусы, ошибки валидации)
  setup-app.ts      # сборка Express-приложения и подключение роутов
  index.ts          # точка входа, запуск сервера
```

## API

### Blogs — `/blogs`

| Метод  | Путь         | Описание                  |
| ------ | ------------ | -------------------------- |
| GET    | `/blogs`     | Получить список блогов     |
| GET    | `/blogs/:id` | Получить блог по id        |
| POST   | `/blogs`     | Создать блог                |
| PUT    | `/blogs/:id` | Обновить блог по id        |
| DELETE | `/blogs/:id` | Удалить блог по id         |

Тело запроса для `POST`/`PUT`:

```json
{
  "name": "string, 2-15 символов",
  "description": "string, 3-500 символов",
  "websiteUrl": "string, 5-100 символов, формат https://example.com"
}
```

### Posts — `/posts`

| Метод  | Путь         | Описание                  |
| ------ | ------------ | -------------------------- |
| GET    | `/posts`     | Получить список постов     |
| GET    | `/posts/:id` | Получить пост по id        |
| POST   | `/posts`     | Создать пост                |
| PUT    | `/posts/:id` | Обновить пост по id        |
| DELETE | `/posts/:id` | Удалить пост по id         |

Тело запроса для `POST`/`PUT`:

```json
{
  "title": "string, 1-30 символов",
  "shortDescription": "string, 1-100 символов",
  "content": "string, 1-1000 символов",
  "blogId": "string, id существующего блога"
}
```

### Testing — `/testing`

| Метод  | Путь              | Описание                                   |
| ------ | ----------------- | ------------------------------------------- |
| DELETE | `/testing/all-data` | Очистить все данные (используется в тестах) |

## Деплой

Проект настроен для деплоя на [Vercel](https://vercel.com) — конфигурация в [vercel.json](vercel.json). При подключении репозитория к Vercel каждый push в `main` запускает продакшн-деплой.
