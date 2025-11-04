# 📝 할일 관리 앱 (Todo App)

React + Vite로 만든 할일 관리 애플리케이션입니다.

## 🚀 주요 기능

- ✅ 할일 추가
- ✏️ 할일 수정
- 🗑️ 할일 삭제
- 📋 할일 목록 조회
- 🎨 모던하고 반응형 UI

## 🛠️ 기술 스택

- **React 19.1.1** - UI 라이브러리
- **Vite 7.1.7** - 빌드 도구
- **Axios** - HTTP 클라이언트
- **CSS3** - 스타일링

## 📦 설치 방법

```bash
# 의존성 설치
npm install
```

## 🎮 실행 방법

### 1. 백엔드 서버 실행

먼저 백엔드 서버가 `http://localhost:5000`에서 실행 중이어야 합니다.

### 2. 프론트엔드 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

## 🔌 API 엔드포인트

백엔드 서버는 다음 엔드포인트를 제공해야 합니다:

- `GET /todos` - 모든 할일 조회
- `POST /todos` - 할일 생성 (body: `{ title: string }`)
- `GET /todos/:id` - 특정 할일 조회
- `PUT /todos/:id` - 할일 수정 (body: `{ title: string }`)
- `DELETE /todos/:id` - 할일 삭제

## 📁 프로젝트 구조

```
src/
├── App.jsx          # 메인 컴포넌트
├── App.css          # 스타일
├── main.jsx         # 앱 진입점
├── index.css        # 전역 스타일
└── services/
    └── api.js       # API 통신 로직
```

## 🎨 주요 컴포넌트

### App.jsx

- 할일 목록 관리
- CRUD 기능 구현
- 상태 관리 (useState, useEffect)
- 에러 처리

### services/api.js

- Axios를 사용한 HTTP 요청
- RESTful API 통신
- 모든 CRUD 함수 제공

## 📝 사용 방법

1. **할일 추가**: 상단 입력창에 할일을 입력하고 "추가" 버튼 클릭
2. **할일 수정**: 각 할일의 "수정" 버튼을 클릭하여 편집 모드로 전환
3. **할일 삭제**: 각 할일의 "삭제" 버튼을 클릭 (확인 메시지 표시)

## 🌐 CORS 설정

백엔드 서버에서 CORS를 허용해야 합니다:

```javascript
// Express 예시
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

또는 Vite의 프록시 기능을 사용할 수 있습니다. (이미 `vite.config.js`에 설정됨)

## 🔧 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📜 라이선스

MIT
