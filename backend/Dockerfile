FROM python:3.8-bullseye
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app

RUN pip install -r requirements.txt

COPY . /usr/src/app

