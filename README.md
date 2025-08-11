## FastAPI 서버 실행
- uvicorn main:app --reload
- http://127.0.0.1:8000/docs (기본 ip,포트설정 및 전체 api 리스트)
- main.py 에서 구성된 api를 호출 (기본파일로 구분됨)

## FrontEnd 서버 실행
* npm run dev

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

