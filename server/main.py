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
    system_instruction = """
    You are a Git Commit Message Generator.
    
    STRICT RULES (Follow these or fail):
    1. [LANGUAGE] Line 1 MUST be Korean. Line 2 and Line 3 MUST be English.
    2. [FORMAT] Output EXACTLY 3 lines. Start EVERY line with a type (feat, fix, style, refactor, chore).
    3. [CONTENT] Do not lie. 'docs' is ONLY for documentation files (README, comments). Code changes should be 'feat' or 'refactor' or 'style'.
    4. [OUTPUT] Raw text only. NO markdown code blocks (```), NO intro.
    
    [PERFECT EXAMPLE]
    feat: 테마 프로바이더 및 루트 레이아웃 설정
    feat: Setup ThemeProvider with color scheme
    style: Configure StatusBar and screen optionsdocker-compose up -d --build
    """

    # 보낼 데이터 포장
    payload = {
        "model": "llama3.2",   # 사용할 AI 모델 이름
        "prompt": f"Code changes:\n{req.diff}",
        "system": system_instruction,
        "stream": False,
        "options": {
            "temperature": 0.1,  # 창의성을 낮춰서 엉뚱한 말 못하게 함
            "top_p": 0.9
        }
    }

    try:
        print("AI에게 질문 전달 중...")

        # AI한테 전송하고 기다림
        response = requests.post(ollama_url, json=payload)

        # AI가 준 응답에서 텍스트만 뽑아서 전달
        result_text = response.json().get("response", "Error")
        print("AI 응답 완료")
        return {"result": result_text.strip()}

    except Exception as e:
        print(f"에러: {e}")
        return {"result": f"AI 서버 연결 실패: {str(e)}"}

