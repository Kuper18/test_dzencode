FROM python:3.14-slim

LABEL maintainer="oleh.kuper.dev@gmail.com"

ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# gcc, pkg-config і dev-бібліотека потрібні для збірки mysqlclient
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc pkg-config default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install pipenv

COPY Pipfile Pipfile.lock ./

RUN pipenv install --dev --deploy --system

COPY . .

RUN mkdir -p /files/media

RUN mkdir -p /app/media
RUN adduser --disabled-password --no-create-home appuser
RUN chown -R appuser /app/media

USER appuser
