FROM python:3.9-buster

RUN apt-get install libpq-dev

COPY setup.py code/
COPY api /code/api/

WORKDIR /code
RUN pip install .

EXPOSE 8888

CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-c", "python:api.wsgi", "api:app"]