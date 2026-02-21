# 🔍 보안 및 기능 검증 체크리스트

**테스트 환경:** http://localhost:5174/  
**날짜:** 2026-02-21

---

## ✅ 1단계: 프론트엔드 로딩 테스트

### 1.1 페이지 로드
- [ ] http://localhost:5174/ 접속
- [ ] Hero 섹션의 "Drag & Drop your bill" 표시 확인
- [ ] Console에 에러 없음 (`F12` → Console 탭)

### 1.2 reCAPTCHA 스크립트 로드
**방법:**
1. `F12` → Console에서 실행:
```javascript
console.log(typeof grecaptcha !== 'undefined' ? '✅ reCAPTCHA loaded' : '❌ reCAPTCHA NOT loaded');
```

**예상 결과:** `✅ reCAPTCHA loaded`

---

## 🔒 2단계: 보안 기능 테스트

### 2.1 CORS 제한 확인
**테스트 방법:**
다른 도메인에서 API 호출 시도 (차단되어야 함)

1. `F12` → Console에서 실행:
```javascript
fetch('http://localhost:5174/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    contents: [{ parts: [{ text: "test" }] }],
    recaptchaToken: "test123"
  })
}).then(r => r.json()).then(console.log).catch(console.error);
```

**예상 결과:**
- ✅ Response 받음 (localhost는 allowedOrigins에 포함)
- Backend에서 400 또는 403 에러 (reCAPTCHA 검증 실패 예상)

### 2.2 reCAPTCHA 토큰 생성 확인
**테스트 방법:**
1. `F12` → Console에서 실행:
```javascript
grecaptcha.ready(() => {
  grecaptcha.execute('6Lcw_HIsAAAAADUYy4ueF4DQ0D5Dr_uqOXF2xmEJ', { action: 'test' })
    .then(token => {
      console.log('✅ reCAPTCHA Token:', token.substring(0, 50) + '...');
      console.log('Token length:', token.length, 'chars');
    })
    .catch(err => console.error('❌ Token generation failed:', err));
});
```

**예상 결과:**
```
✅ reCAPTCHA Token: 03AGdBq26...
Token length: 500+ chars
```

---

## 📤 3단계: 파일 업로드 테스트

### 3.1 정상 이미지 업로드 (2MB 미만)
**테스트 방법:**
1. 2MB 이하의 의료 영수증 이미지 준비 (JPG/PNG/PDF)
2. "Drag & Drop your bill" 영역에 파일 드래그
3. 또는 "Browse Files" 클릭하여 선택

**예상 결과:**
- [ ] 업로드 진행 표시 ("Checking for errors...")
- [ ] AI가 영수증 분석 시작
- [ ] Quiz 화면으로 전환 (질문 6개 표시)
- [ ] Console에서 확인:
```
[reCAPTCHA] Token generated for action: bill-ocr
[Security] ✓ reCAPTCHA passed (score: 0.X) for IP: ...
```

### 3.2 대용량 파일 업로드 테스트 (10MB 초과)
**테스트 방법:**
1. 10MB 초과 이미지 파일 생성:
   - Windows: Paint에서 4000x4000 이미지 생성하고 JPG로 저장
   - 또는 여러 이미지를 합쳐서 10MB 이상으로 만들기

2. 파일 업로드 시도

**예상 결과:**
- [ ] Alert 메시지: "File Too Large: Your file (XX.XXmb) exceeds the 10MB limit..."
- [ ] 업로드 차단
- [ ] Console에서 확인:
```
[Security] Request rejected - Body too large: XX.XXmb
```

---

## ⏱️ 4단계: Rate Limiting 테스트

### 4.1 3초 간격 Rate Limit
**테스트 방법:**
1. 의료 영수증 업로드 (첫 번째 요청)
2. **즉시** 새로고침하고 다시 업로드 (두 번째 요청)

**예상 결과:**
- [ ] 두 번째 요청에서 Alert: "Rate Limit: Please wait X second(s) before trying again."
- [ ] 업로드 차단
- [ ] Console 에러:
```
[Rate Limit] Blocked IP ... - Wait Xs
```

### 4.2 정상 간격 테스트
**테스트 방법:**
1. 첫 번째 업로드 완료
2. **3초 대기**
3. 두 번째 업로드 시도

**예상 결과:**
- [ ] 정상적으로 업로드 성공
- [ ] Rate limit 에러 없음

---

## 🧪 5단계: 보안 에러 처리 테스트

### 5.1 reCAPTCHA 없이 API 호출 (차단되어야 함)
**테스트 방법:**
`F12` → Console에서 실행:
```javascript
fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts: [{ text: "test" }] }],
    generationConfig: {},
    action: 'test'
    // recaptchaToken 의도적으로 누락
  })
}).then(r => r.json()).then(data => {
  console.log('Response status:', data);
  if (data.error === 'Missing reCAPTCHA token') {
    console.log('✅ Security working: Request blocked without token');
  }
}).catch(err => console.error(err));
```

**예상 결과:**
```json
{
  "error": "Missing reCAPTCHA token",
  "message": "Security verification required"
}
```

### 5.2 잘못된 reCAPTCHA 토큰 (차단되어야 함)
**테스트 방법:**
```javascript
fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts: [{ text: "test" }] }],
    recaptchaToken: 'fake-invalid-token-12345'
  })
}).then(r => r.json()).then(data => {
  console.log('Response:', data);
  if (data.error === 'Security check failed') {
    console.log('✅ Security working: Fake token rejected');
  }
});
```

**예상 결과:**
```json
{
  "error": "Security check failed",
  "message": "...",
  "details": "reCAPTCHA verification failed" 또는 "Bot detected"
}
```

---

## 🎯 6단계: End-to-End 사용자 시나리오

### 시나리오: 의료 영수증 검사 전체 흐름
1. [ ] 페이지 로드 → Hero 섹션 표시
2. [ ] 의료 영수증 이미지 업로드 (2MB 이하)
3. [ ] AI OCR 분석 완료 → 금액/시설명 추출
4. [ ] Quiz 화면 전환 → 6개 질문 표시
5. [ ] 질문에 답변 (Yes/No/Not Sure)
6. [ ] "Analyzing..." 로딩 화면
7. [ ] 최종 결과 화면:
   - Estimated Refund 금액 표시
   - Refund Probability 표시
   - Auditor Note 표시
   - Recommended Tool 버튼
8. [ ] 추천 Tool 클릭 → Tool 페이지 이동

**예상 소요 시간:** 60초 이내

---

## 📊 7단계: Vercel 프로덕션 테스트

### 7.1 프로덕션 배포 확인
**방법:**
1. https://vercel.com/dashboard/deployments 접속
2. 최신 커밋 `9b43425` 배포 상태 확인

**Expected:**
- [ ] Status: ✅ Ready
- [ ] Preview URL 생성됨

### 7.2 프로덕션 환경 변수 확인
**방법:**
Vercel Dashboard → Settings → Environment Variables

**필수 변수:**
- [ ] `GEMINI_API_KEY` - 설정됨
- [ ] `RECAPTCHA_SECRET_KEY` - 설정됨

**없어야 할 변수:**
- [ ] `VITE_GEMINI_API_KEY` - ❌ 삭제되어야 함 (보안 위험)

### 7.3 프로덕션 URL 테스트
**방법:**
1. https://fix-my-medicalbill.vercel.app/ 접속
2. 로컬 테스트와 동일하게 3.1 테스트 반복

**예상 결과:**
- [ ] 로컬과 동일하게 작동
- [ ] API 응답 정상
- [ ] reCAPTCHA 작동

---

## 🚨 알려진 제한사항

### ⚠️ In-Memory Rate Limiting
현재 백엔드의 `Map()` 기반 rate limiting은 Vercel 서버리스 인스턴스가 여러 개 뜨면 공유 안 됨.

**해결책:** Vercel Dashboard에서 별도로 Rate Limiting 설정 필요
- Settings → Firewall → Rate Limiting
- `/api/generate` endpoint에 5 req/60초 제한

### ⚠️ CORS 도메인 리스트
현재 허용 도메인:
```javascript
- https://fixmymedicalbill.com
- https://www.fixmymedicalbill.com  
- https://fix-my-medicalbill.vercel.app
- http://localhost:5173
- http://localhost:4173
```

**만약 다른 도메인 필요하면:** `api/generate.js` L89-96 수정

---

## ✅ 최종 체크리스트

- [ ] 모든 페이지 로드 정상
- [ ] reCAPTCHA 토큰 생성 성공
- [ ] 정상 크기 파일 업로드 성공
- [ ] 10MB 초과 파일 차단 확인
- [ ] Rate limiting (3초) 작동 확인
- [ ] reCAPTCHA 없이 API 호출 차단 확인
- [ ] End-to-End 사용자 시나리오 완료
- [ ] 프로덕션 환경 변수 확인
- [ ] Vercel Dashboard에서 Rate Limiting 수동 설정 (선택)

---

## 🐛 문제 발생 시 디버깅

### Console 에러 확인
```javascript
// F12 → Console에서 실행
console.log('Environment check:');
console.log('- grecaptcha loaded:', typeof grecaptcha);
console.log('- reCAPTCHA site key:', '6Lcw_HIsAAAAADUYy4ueF4DQ0D5Dr_uqOXF2xmEJ');
```

### Network 탭 확인
1. `F12` → Network 탭
2. 파일 업로드
3. `/api/generate` 요청 클릭
4. Headers/Payload/Response 확인

**정상 Request Payload:**
```json
{
  "contents": [...],
  "generationConfig": {...},
  "action": "bill-ocr",
  "recaptchaToken": "03AGdBq26..." // 500+ chars
}
```

**정상 Response:**
```json
{
  "candidates": [...]
}
```

---

**테스트 담당자:** _____________  
**완료 날짜:** _____________  
**최종 결과:** ✅ Pass / ❌ Fail
