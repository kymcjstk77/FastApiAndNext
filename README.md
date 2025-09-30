## FastAPI 서버 실행
- uvicorn main:app --reload
- http://127.0.0.1:8000/docs (기본 ip,포트설정 및 전체 api 리스트)
- main.py 에서 구성된 api를 호출 (기본파일로 구분됨)

## FrontEnd 서버 실행
* npm run dev

## FrontEnd 서버 설치
* nodejs 다운로드/설치
* VSCode 터미널에서 npm 사용 시 발생하는 "이 시스템에서 스크립트를 실행할 수 없으므로..." 오류는 Windows의 보안 정책으로 인해 스크립트 실행이 차단되어 발생하는 현상입니다. 이 문제를 해결하기 위해 PowerShell 관리자 권한 실행 후 Set-ExecutionPolicy RemoteSigned -Scope CurrentUser 명령어를 입력하여 스크립트 실행 정책을 변경하거나, VSCode 터미널을 cmd (명령 프롬프트)로 변경하여 실행해야 합니다. 
* npx create-next-app@latest  next.js 설치
* src 및 pubilc 구성...
* npm error code SELF_SIGNED_CERT_IN_CHAIN
npm error errno SELF_SIGNED_CERT_IN_CHAIN
npm error request to https://registry.npmjs.org/create-next-app failed, reason: self-signed certificate in certificate chain 에러발생시
* npm config set strict-ssl false -g
* 인터넷 내부망 에러 처리
* /src/app/page.tsx (index페이지) 확인
* 기본구조 변경  - app기본 폴더 사용하지 않음 (파일명변경처리 또는 폴더삭제) + pages폴더내 _app.tsx로 기본설정


* package.json 내 dependenices에 필요 라이브러리 추가설정 - npm install dayjs.....
* jsx 자바스크립트 확장 문법(리엑트에서 ui를 쉽게 작성할수 있도록 코드변환처리등..)
* npm install --save-dev @types/react 
* agGuid설치 npm i ag-grid-community ag-grid-react  --save
* @tanstack/react-query @tanstack/react-query-devtools 설치 (Tanstack Query는 서버 상태 관리 라이브러리로, 복잡하고 장황한 코드를 필요로 하지 않고, 상태 관리와 데이터 fetching을 간편하게 해준다.)
* npx @next/codemod built-in-next-font 폰트설치 및 갱신처리
* npm install react-router-dom 설치
* npm i axios
* npm i react-query* 
* npm install @zodios/react @zodios/core axios zod 설치
* npm install @tanstack/react-query @tanstack/react-query-devtools
* npm i zod 또는 npm install @zodios/core @zodios/express next zod axios react react-dom
* npm install --global corepack@latest


* 기본구조 src 내,  app(제거), libs(공통 스크립트의 패키지), utils(공통 스크립트 실파일), stores(dom, 데이터 스크립트저장함수), types(공통 타입스크립트), pages(ui 페이지), components(컨텐츠ui페이지), templates(컨텐츠내 템플릿ui페이지), pubic(물리 폰트,이미지등 폴더경로) 폴더로 구성


## FastAPI 설치/구성 순서
1. 파이썬 파일 다운로드 및 설치
2. 파이썬 설치 확인
- python -v (버전확인)
3. FastAPI 설치
- pip install fastapi
- python -m pip install --upgrade pip  (최신버전 업그레이드)
4. 개발툴설치
- pycharm, vscode
- python interpreter 위치 설정(파이썬 설치 디렉토리)
- nodejs
5. 파이썬용 웹 서버 설치
- uvicorn(유비콘) 비동기 호출용 파이썬 웹서버
- pip install "uvicorn[standard]"
6. orm 설치
- sqlalchemy(sql어처미) pip install sqlalchemy
7. 기본페이지 생성/구성
- main.py
8. database 구성
- database.py
9. database model 구성
- models.py (class 테이블 기준으로 설정/추가)
10. domain 및 router 구성

