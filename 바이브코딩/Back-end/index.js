require('dotenv').config(); // 환경변수 로드

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routers/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // 할일 앱 전용 DB

// 환경변수 확인
if (!MONGO_URI) {
  console.error('❌ 오류: MONGO_URI 환경변수가 설정되지 않았습니다.');
  console.error('   .env 파일에 MONGO_URI를 설정해주세요.');
  process.exit(1);
}

// 미들웨어
app.use(cors({
  origin: '*', // 모든 도메인 허용
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json()); // JSON 파싱

// 테스트 엔드포인트
app.get('/', (req, res) => {
  res.json({ message: '서버가 정상적으로 실행 중입니다!' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API가 정상적으로 작동합니다!' });
});

// 라우터 연결
app.use('/api/todos', todoRoutes);

// 404 에러 핸들러
app.use((req, res) => {
  console.log(`404 - 찾을 수 없는 경로: ${req.method} ${req.url}`);
  res.status(404).json({ 
    error: '404 - 경로를 찾을 수 없습니다',
    requestedUrl: req.url,
    method: req.method,
    availableEndpoints: [
      'GET    /',
      'GET    /api',
      'GET    /api/todos',
      'POST   /api/todos',
      'GET    /api/todos/:id',
      'PUT    /api/todos/:id',
      'DELETE /api/todos/:id'
    ]
  });
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('몽고DB 연결 성공');
    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}번에서 실행 중입니다.`);
      console.log('API 엔드포인트:');
      console.log('- GET    /api/todos      : 모든 할일 조회');
      console.log('- POST   /api/todos      : 할일 생성');
      console.log('- PUT    /api/todos/:id  : 할일 수정');
      console.log('- DELETE /api/todos/:id  : 할일 삭제');
    });
  })
  .catch((err) => {
    console.error('몽고DB 연결 실패:', err);
  });
