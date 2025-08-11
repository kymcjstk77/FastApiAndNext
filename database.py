from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base ## 데이터베이스 모델 구성
from sqlalchemy.orm import sessionmaker, scoped_session

SQLALCHEMY_DATABASE_URL = "sqlite:///./myapi.db" ## 데이터베이스 접속주소

engine = create_engine( ## connect pool생성처리(데이터베이스에 접속하는 객체를 세션수로 제어)
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
##SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False,bind=engine))

Base = declarative_base()

def get_db():   ##db 의존성설정버전
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
