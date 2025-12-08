FROM python:3.9-slim

WORKDIR /app

# 라이브러리 설치
RUN pip install fastapi uvicorn requests

COPY . .

# 서버 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]