# Inventory App (DzenCode test)

A web app for managing **orders** and **products**: sign up / login, order and product CRUD, UAH/USD prices, image uploads, and a live count of active sessions.

## Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, Redux Toolkit, TanStack Query, React Router, React Bootstrap, Axios, Zod, Socket.IO Client |
| Backend | Django 6, Django REST Framework, SimpleJWT, PostgreSQL, Pillow |
| Realtime | Node.js, Express, Socket.IO |
| Infrastructure | Docker Compose, Adminer |

## Features

- Email registration and login (JWT: access 5 minutes, refresh 7 days)
- User profile
- Orders: list, details, create, delete, totals per currency
- Products: create, update, delete, filter by type, guarantee dates, unique serial number
- Product prices: both **UAH and USD** required, exactly one default price
- Product image upload
- Clock and live Socket.IO active-session count

## Repository layout

```text
.
├── client/          # React SPA (Vite, port 5173)
├── server/          # Django API (port 8000)
├── realtime/        # Socket.IO server (port 3001)
└── docker-compose.yml
```

## Services and ports

| Service | URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| API | http://localhost:8000 |
| Django Admin | http://localhost:8000/admin/ |
| Socket.IO | http://localhost:3001 |
| Adminer (DB UI) | http://localhost:8080 |
| PostgreSQL | localhost:5432 |

## API

Base prefix: `/api`

### Users (`/api/users/`)

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/login/` | no | JWT (`email`, `password`) |
| POST | `/register/` | no | Sign up, returns tokens |
| POST | `/token-refresh/` | no | Refresh access token |
| GET/PUT/PATCH | `/me/` | yes | Current user profile |

### Inventory (`/api/inventory/`)

All endpoints require JWT (`Authorization: Bearer <access>`).

| Resource | Path | Notes |
| --- | --- | --- |
| Products | `/products/` | filter `?product-type=` |
| Upload image | `POST /products/{id}/upload-image/` | `multipart/form-data`, field `image` |
| Orders | `/orders/` | `GET /orders/{id}/` — details with products |

## Quick start (Docker)

You need [Docker](https://docs.docker.com/get-docker/) and Docker Compose.

### 1. Environment variables

Create `server/.env`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=inventory
POSTGRES_HOST=db
POSTGRES_PORT=5432
APP_ENV=development
SECRET_KEY=change-me
JWT_SECRET=change-me-jwt
VERIFYING_KEY=
```

For Docker, `POSTGRES_HOST` must be the Compose service name: `db`.

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
SOCKET_URL=http://localhost:3001
```

Vite only exposes variables prefixed with `VITE_` to the browser. If the socket client does not connect, rename the variable to `VITE_SOCKET_URL` and use that name in the code.

### 2. Run

From the repository root:

```bash
docker compose up --build
```

Open http://localhost:5173, register an account, and use the app.

Stop:

```bash
docker compose down
```

PostgreSQL data is stored in the `app_db` Docker volume. To reset the database:

```bash
docker compose down -v
```

### Django Admin (optional)

```bash
docker compose exec api python manage.py createsuperuser
```

Sign in at http://localhost:8000/admin/ with the superuser email.

Adminer: http://localhost:8080 (system **PostgreSQL**, server `db` or `postgres-db`, credentials from `server/.env`).

## Local run without Docker

You need **Python 3.14**, **Pipenv**, **Node.js 24+**, and a running PostgreSQL instance.

### Database

Create a database and user, then set `POSTGRES_HOST=localhost` (or your Postgres host) in `server/.env`.

### Backend

```bash
cd server
pipenv install --dev
pipenv run python manage.py migrate
pipenv run python manage.py runserver 0.0.0.0:8000
```

### Realtime

```bash
cd realtime
npm ci
node app.js
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Useful commands

```bash
# client
cd client && npm run lint
cd client && npm run build

# server (from the server directory)
pipenv run ruff check .
pipenv run python manage.py test
```

## Data model (short)

- **User** — email as login (no username)
- **Order** — title, description, created at; totals are derived from nested product prices
- **Product** — belongs to an order (`CASCADE`), type, specification, guarantee, image
- **Price** — value + currency (`UAH` / `USD`), unique pair of product + currency

## License

Educational / test project.
