FROM python:3.8

WORKDIR /app

ENV FLASK_APP=app.py

ENV FLASK_ENV=development

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

#ENTRYPOINT [ “python” ]

#CMD [ “app.py” ]
