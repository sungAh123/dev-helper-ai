# AI Commit Message Generator

코드를 입력하면 **AI가 커밋 메시지를 생성**해주는 간단한 프로젝트입니다.
프론트엔드는 **Expo(React Native)**, 백엔드는 **Docker 기반 서버**로 구성되어 있습니다.

---

## 미리보기
<img width="452" height="294" alt="image" src="https://github.com/user-attachments/assets/c7e45ace-e920-491a-b34f-65707fbdcd62" />
<img width="452" height="348" alt="image" src="https://github.com/user-attachments/assets/5faa9234-1762-4390-af98-a696fd5dd7da" />
<img width="452" height="176" alt="image" src="https://github.com/user-attachments/assets/71486146-194b-4d4b-a4bb-6ae1aaf936e2" />

---

## 주요 기능

* 코드(diff) 입력
* AI 기반 커밋 메시지 생성
* 결과 메시지 화면 출력

---

## 기술 스택

### Frontend

* Expo (React Native)
* TypeScript

### Backend

* Docker
* docker-compose

---

## 화면 구성

* 코드 입력 TextInput
* 커밋 메시지 생성 버튼
* 결과 출력 영역

---

## 실행 방법

### 1.저장소 클론

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/sungAh123/dev-helper-ai.git)
cd dev-helper-ai
```

### 2.Docker 실행 (백엔드)

```bash
docker-compose up --build
```

### 3.Expo 실행

```bash
npm install
npx expo start
```

---

## 프로젝트 구조

```text
.
├── app/                # Expo Router (프론트엔드)
│   └── index.tsx       # 메인 화면
├── server/             # 백엔드 서버
│   ├── main.py         # 서버 엔트리 포인트
│   └── Dockerfile
├── docker-compose.yml  # 전체 서비스 오케스트레이션
└── README.md

```

---

## 개발자

* GitHub: [https://github.com/sungAh123](https://github.com/sungAh123)
