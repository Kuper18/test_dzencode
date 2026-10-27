# Inventory App

Small inventory web app (test assignment): users can register, log in, and manage **orders** and **products** (CRUD, UAH/USD prices, images). A Socket.IO service shows how many sessions are currently active.

**Deployed app:** http://34.57.99.243/

| Service | Folder | Dev | Prod |
| --- | --- | --- | --- |
| React (Vite) | `client/` | http://localhost:5173 | http://localhost (port 80, Nginx) |
| Django API | `server/` | http://localhost:8000 | proxied at `/api/` and `/admin/` |
| Socket.IO | `realtime/` | http://localhost:8001 | proxied at `/socket.io/` |
| MySQL 8.4 | Compose `db` | localhost:3306 | internal only |
| Adminer | — | http://localhost:8080 | not started |

Schema files in the repo root (reference only; Docker Compose still creates tables via Django migrations):

- `database_schema.sql` — MySQL dump of the inventory database
- `inventory_schema.mwb` — MySQL Workbench model of the same schema

You need [Docker](https://docs.docker.com/get-docker/) and Docker Compose.

## 1. Environment files

Copy each `.env.example` to `.env` (same folder, drop the `.example` suffix). Do this **before** the first `docker compose` run.

| Example | Copy to | Used for |
| --- | --- | --- |
| `.env.example` | `.env` | Prod build: `SERVER_IP` (Compose variable substitution) |
| `client/.env.example` | `client/.env` | Vite API and Socket.IO URLs (dev) |
| `server/.env.example` | `server/.env` | MySQL, Django, JWT |
| `realtime/.env.example` | `realtime/.env` | `PORT` and `CORS_ORIGIN` (used by `realtime/app.js`) |

PowerShell (from the repo root):

```powershell
Copy-Item .env.example .env
Copy-Item client\.env.example client\.env
Copy-Item server\.env.example server\.env
Copy-Item realtime\.env.example realtime\.env
```

macOS / Linux:

```bash
cp .env.example .env
cp client/.env.example client/.env
cp server/.env.example server/.env
cp realtime/.env.example realtime/.env
```

Keep `MYSQL_HOST=db` when running in Docker (`db` is the Compose service name).

## 2. Development

```bash
docker compose up --build
```

Open http://localhost:5173, register an account, and use the app.

- API: http://localhost:8000/api/
- Django admin: http://localhost:8000/admin/ (create a superuser first, see below)
- Adminer: http://localhost:8080 — system **MySQL**, server `db` (or `mysql-db`), credentials from `server/.env`

Stop:

```bash
docker compose down
```

MySQL data lives in the `mysql_data` volume. Reset the database with `docker compose down -v`.

Optional Django superuser:

```bash
docker compose exec api python manage.py createsuperuser
```

## 3. Production

Set `SERVER_IP` in the **root** `.env` to the host people will open in the browser (`localhost` for a local prod smoke test, or the server IP/domain).

Vite bakes `VITE_*` URLs in at **image build** time:

```yaml
VITE_API_BASE_URL: http://${SERVER_IP}/api
VITE_SOCKET_URL: http://${SERVER_IP}
```

Also tighten env files for a real deploy, for example:

- `server/.env`: `APP_ENV=production`, `DEBUG=False`
- `ALLOWED_HOSTS` — the public host
- `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` — `http://<SERVER_IP>` (add `https://` if you terminate TLS)
- `realtime/.env`: `CORS_ORIGIN=http://<SERVER_IP>` (must match the URL in the browser)

Then:

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Open http://localhost (or `http://<SERVER_IP>`). Nginx on port 80 serves the SPA and proxies API, admin, static/media, and Socket.IO.

Stop:

```bash
docker compose -f docker-compose.prod.yml down
```

## Notes

- Change example secrets (`SECRET_KEY`, `JWT_SECRET`, DB passwords) before any shared or public deploy.
- After changing `SERVER_IP` or `client/.env`, rebuild the frontend image so Vite picks up new URLs (`--build`).
- Socket.IO reads `PORT` (default `8001`) and `CORS_ORIGIN` (default `http://localhost:5173`) from the environment. The prod Compose file injects `realtime/.env`; the dev file does not, so those defaults apply unless you add `env_file` there too.
