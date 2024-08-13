# wanted-pre-onboarding-backend

배포용, 협업용이 아니기에 main 브랜치에서 작업

## 디렉토리 구조 설계

```
wanted-pre-onboarding-backend/
│
├── src/
│   ├── config/                # 환경설정 파일 (예: DB 설정, 환경 변수 설정)
│   │   └── db.js
│   │
│   ├── controllers/           # 각 라우트에 대한 컨트롤러
│   │   ├── jobController.js
│   │   └── applicationController.js
│   │
│   ├── models/                # 데이터베이스 모델
│   │   ├── Company.js
│   │   ├── User.js
│   │   ├── JobPosting.js
│   │   └── Application.js
│   │
│   ├── routes/                # 각 기능에 대한 라우트 정의
│   │   ├── jobRoutes.js
│   │   └── applicationRoutes.js
│   │
│   ├── services/              # 비즈니스 로직을 처리하는 서비스 계층
│   │   ├── jobService.js
│   │   └── applicationService.js
│   │
│   ├── middlewares/           # 미들웨어 (예: 에러 핸들링, 인증)
│   │   └── errorHandler.js
│   │
│   ├── tests/                 # 유닛 테스트 파일
│   │   ├── jobController.test.js
│   │   ├── jobService.test.js
│   │   └── applicationController.test.js
│   │
│   └── app.js              # Express 애플리케이션 초기화
│
├── .env                       # 환경 변수 설정 파일
├── .gitignore                 # Git에서 제외할 파일들
├── package.json               # 프로젝트 설정 및 의존성 관리
└── README.md                  # 프로젝트 설명 문서
```

---

## Git Commit Message Convention

이 프로젝트에서는 코드의 일관성과 가독성을 유지하고, 변경 사항을 명확히 추적하기 위해 다음과 같은 Git 커밋 메시지 규칙을 따릅니다.

### 1. 커밋 메시지 구조

커밋 메시지는 한 줄로 작성하며, 아래의 형식을 따릅니다:

```
<타입>: <설명>
```

- **타입(Type)**: 커밋의 목적을 나타내는 명사형 단어
- **설명(Subject)**: 변경 사항에 대한 간단한 설명 (최대 50자, 첫 글자는 대문자로 작성)

### 2. 타입(Type) 정의

다음은 프로젝트에서 사용할 커밋 타입입니다:

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **refactor**: 코드 리팩토링 (기능 변경 없음)
- **style**: 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
- **docs**: 문서 추가 또는 수정
- **test**: 테스트 추가 또는 수정
- **chore**: 빌드 작업, 패키지 관리, 설정 파일 등 기타 변경

### 3. 커밋 메시지 예시

- `feat: Add user authentication`
- `fix: Correct typo in database connection`
- `refactor: Simplify job posting controller logic`
- `style: Format code with ESLint`
- `docs: Update API documentation`
- `test: Add unit tests for job service`
- `chore: Configure ESLint and Prettier`

### 4. 커밋 메시지 작성 시 유의사항

- 메시지는 명확하고 간결하게 작성합니다.
- **동사형**이 아닌 **명사형**으로 타입을 작성합니다.
- 커밋 메시지의 설명 부분은 첫 글자를 대문자로 시작합니다.
- 불필요한 커밋을 피하고, 의미 있는 변경 단위로 커밋합니다.

### 5. 커밋 시나리오

- **새로운 API 엔드포인트 추가 시:** `feat: Add API endpoint for job posting creation`
- **데이터베이스 연결 설정 변경 시:** `chore: Update SQL database connection settings`
- **API 문서화 작업 시:** `docs: Add API usage examples in README`
