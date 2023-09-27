FROM python:3.10.8

WORKDIR /api

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN prisma generate

COPY . .

EXPOSE 3001

COPY . .

CMD [ "python3", "main.py" ]