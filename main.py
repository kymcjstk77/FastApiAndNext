from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from domain.question import question_router

app = FastAPI()

origins = [
    "http://localhost:3000",  # 로컬 접속허용
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # 허용할 오리진 목록
    allow_credentials=True,
    allow_methods=["*"], # 모든 HTTP 메서드 허용 (GET, POST 등)
    allow_headers=["*"], # 모든 헤더 허용
)

app.include_router(question_router.router)