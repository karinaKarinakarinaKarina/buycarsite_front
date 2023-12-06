FROM python:3.11.6

WORKDIR /app

COPY . /app

EXPOSE 8000

CMD [ "python", "-m", "http.server", "8000" ]