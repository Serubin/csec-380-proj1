FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY endpoints.py endpoints.py

CMD [ "python", "./endpoints.py" ]

EXPOSE 8000