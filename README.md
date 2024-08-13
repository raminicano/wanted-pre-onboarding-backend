# wanted-pre-onboarding-backend

배포용, 협업용이 아니기에 main 브랜치에서 작업하고 이슈관리는 따로 하지 않았습니다.

## ERD
<img width="881" alt="image" src="https://github.com/user-attachments/assets/164f917a-956f-42cd-96fd-b556e02499ad">

<br>
<br>
<br>
<br>
<hr>

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



<br>
<br>
<br>
<br>
<hr>


## 사용 스택

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,nodejs,express,mysql,git,github" />
  </a>
</p>

<br>
<br>
<br>
<br>
<hr>


## API 설명

### 1. Job API

#### 1.1. **채용공고 등록**

- **Endpoint**: `/api/jobs`
- **Method**: `POST`
- **Description**: 새로운 채용 공고를 등록합니다.

##### **Request Body**

```json
{
  "company_id": 1,
  "position": "백엔드 주니어 개발자",
  "reward": 1000000,
  "description": "원티드랩에서 백엔드 주니어 개발자를 채용합니다.",
  "technology": "Node.js"
}
```

##### **Response Example (Success)**

- **Status**: `201 Created`

```json
{
    "id": 13,
    "company_id": 1,
    "position": "백엔드 주니어 개발자",
    "reward": 1000000,
    "description": "원티드랩에서 백엔드 주니어 개발자를 채용합니다.",
    "technology": "Node.js"
}
```

#### 1.2. **채용공고 수정**

- **Endpoint**: `/api/jobs/:id`
- **Method**: `PUT`
- **Description**: 특정 채용 공고를 수정합니다.

##### **Request Body**

```json
{
  "company_id": 1,
  "position": "백엔드 주니어 개발자",
  "reward": 2000000,
  "description": "원티드랩에서 백엔드 주니어 개발자를 채용합니다.",
  "technology": "Java"
}
```

##### **Response Example (Success)**

- **Status**: `200 OK`

```json
{
    "message": "Job posting updated"
}
```

##### **Response Example (Not Found)**

- **Status**: `404 Not Found`

```json
{
  "message": "Job posting not found"
}
```

#### 1.3. **채용공고 삭제**

- **Endpoint**: `/api/jobs/:id`
- **Method**: `DELETE`
- **Description**: 특정 채용 공고를 삭제합니다.

##### **Response Example (Success)**

- **Status**: `204 OK`

```json
{
  "message": "Job posting deleted"
}
```

##### **Response Example (Not Found)**

- **Status**: `404 Not Found`

```json
{
  "message": "Job posting not found"
}
```

#### 1.4. **채용공고 목록 가져오기 및 검색**

- **Endpoint**: `/api/jobs`
- **Method**: `GET`
- **Description**: 모든 채용 공고 목록을 가져오거나, 검색어를 사용하여 필터링된 공고 목록을 가져옵니다.

##### **Query Parameters**

- **`search`**: (optional) 채용공고 검색 키워드
  - 이 파라미터를 사용하여 특정 회사 이름, 기술 스택, 포지션을 검색할 수 있습니다.
  - 검색어는 부분 일치로 작동하며, 예를 들어 `search=백엔드`로 검색하면 `백엔드 주니어 개발자` 등의 포지션을 포함하는 공고들이 반환됩니다.
  - `search=JavaScript`로 검색하면 대소문자를 구분하지 않으며, `JavaScript`를 기술 스택으로 사용하는 모든 채용공고를 반환합니다.
  - `search` 파라미터는 회사 이름, 기술 스택, 포지션 모두를 대상으로 검색을 수행하며, 입력된 키워드와 일치하는 공고들을 필터링합니다.

##### **Response Example (Success)**

- **Status**: `200 OK`

```json
[
    {
        "id": 1,
        "name": "원티드",
        "country": "한국",
        "region": "서울",
        "position": "백엔드 주니어 개발자",
        "reward": 1500000,
        "technology": "Python"
    },
    {
        "id": 6,
        "name": "원티드",
        "country": "한국",
        "region": "서울",
        "position": "백엔드 주니어 개발자",
        "reward": 2000000,
        "technology": "Python"
    }
]
```

#### 1.5. **채용 상세 페이지 가져오기**

- **Endpoint**: `/api/jobs/:id`
- **Method**: `GET`
- **Description**: 특정 채용 공고의 상세 정보를 가져옵니다. 해당 회사가 올린 다른 채용공고의 ID 목록도 반환합니다.

##### **Response Example (Success)**

- **Status**: `200 OK`

```json
{
    "id": 1,
    "company_name": "원티드",
    "country": "한국",
    "region": "서울",
    "position": "백엔드 주니어 개발자",
    "reward": 1500000,
    "technology": "Python",
    "description": "원티드랩에서 백엔드 주니어 개발자를 찾습니다.",
    "company_id": 1,
    "other_jobs": [
        6
    ]
}
```

### 2. **Application API**

#### 2.1. **채용공고에 지원**

- **Endpoint**: `/api/applications`
- **Method**: `POST`
- **Description**: 사용자가 특정 채용 공고에 지원합니다. 동일한 채용 공고에 한 번만 지원할 수 있습니다.

##### **Request Body**

```json
{
  "job_posting_id": 3,
  "user_id": 1
}
```

##### **Response Example (Success)**

- **Status**: `201 Created`

```json
{
    "application_date": "2024-08-13T11:31:59.624Z",
    "id": 2,
    "job_posting_id": 3,
    "user_id": 1
}
```

##### **Response Example (Duplicate Application)**

- **Status**: `500 Internal Server Error`

```json
{
    "error": {
        "message": "User has already applied for this job posting.",
        "statusCode": 500
    }
}
```



<br>
<br>
<br>
<br>
<hr>


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

- `Feat: Add user authentication`
- `Fix: Correct typo in database connection`
- `Refactor: Simplify job posting controller logic`
- `Docs: Update API documentation`
- `Test: Add unit tests for job service`

### 4. 커밋 메시지 작성 시 유의사항

- 메시지는 명확하고 간결하게 작성합니다.
- **동사형**이 아닌 **명사형**으로 타입을 작성합니다.
- 커밋 메시지의 설명 부분은 첫 글자를 대문자로 시작합니다.
- 불필요한 커밋을 피하고, 의미 있는 변경 단위로 커밋합니다.

### 5. 커밋 시나리오

- **새로운 API 엔드포인트 추가 시:** `feat: Add API endpoint for job posting creation`
- **데이터베이스 연결 설정 변경 시:** `chore: Update SQL database connection settings`
- **API 문서화 작업 시:** `docs: Add API usage examples in README`
