from fastapi import FastAPI         # 웹 서버 만드는 도구
from pydantic import BaseModel      # 데이터 형식 검사
import requests                     # 다른 서버(AI)에 요청 보냄
from fastapi.middleware.cors import CORSMiddleware # 보안(CORS) 설정

# 서버 생성
app = FastAPI()

# CORS 설정
# 웹 브라우저나 앱에서 이 서버로 접속할 수 있게 함
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    # 모든 주소(*) 접속 허용
    allow_credentials=True,
    allow_methods=["*"],    # 모든 방식(GET, POST...) 허용
    allow_headers=["*"],
)

# 데이터 형식 정의
# { "diff": "코드 내용..." }
class CodeRequest(BaseModel):
    diff: str

# API 
@app.post("/generate")
def generate_commit(req: CodeRequest):
    # Docker 안에 있는 Ollama 주소
    ollama_url="http://ollama:11434/api/generate"

    # 프롬프트 작성
    prompt = f"""
    You are a senior developer.
    Based on the following git diff code, write 3 commit messages. 

    Requirements:
    - First message: Korean (한글)
    - Second & Third messages: English
    - Follow 'Conventional Commits' style (feat, fix, docs, etc.)

    [Code Diff]:
    {req.diff}
    """

    # 보낼 데이터 포장
    payload = {
        "model": "tinyllama",   # 사용할 AI 모델 이름
        "prompt": prompt,       # 위에서 만든 명령
        "stream": False         # 한 번에 결과를 다 줌
    }

    try:
        print("AI에게 질문 전달 중...")

        # AI한테 전송하고 기다림
        response = requests.post(ollama_url, json=payload)

        # AI가 준 응답에서 텍스트만 뽑아서 전달
        return {"result": response.json().get("response", "Error")}

    except Exception as e:
        print(f"에러: {e}")
        return {"result": f"AI 서버 연결 실패: {str(e)}"}

