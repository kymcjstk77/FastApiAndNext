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

