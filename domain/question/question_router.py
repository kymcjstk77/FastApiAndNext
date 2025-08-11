from fastapi import ( APIRouter, Depends)  ##API 라우더, db의존성/메개변수 with
from database import SessionLocal
from database import get_db
from sqlalchemy.orm import Session
from domain.question import question_schema  ## Pydantic 스키마/입출력 정의 및 검증처리
from domain.question import question_crud ## service와 유사하게 interface역할로 중복처리등 방지
from models import Question
## from starlette import status

## question_crud

router = APIRouter(
    prefix="/api/question",
)

##@router.get("/list")
@router.get("/list", response_model=list[question_schema.Question]) ##response 결과값은 question_schema의 Question 스키마 리스트임을 설정
def question_list(db: Session = Depends(get_db)):
##def question_list():
    ## with get_db() as db:
    ##db = SessionLocal()
    _question_list = db.query(Question).order_by(Question.create_date.desc()).all()
    ##_question_list = question_crud.get_question_list(db) ##service유사
    if _question_list is None: ##null처리
        question_schema.Question = id(0)
    db.close()
    return _question_list


#@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
@router.post("/create")
def question_create(_question_create: question_schema.QuestionCreate, db: Session = Depends(get_db)):
## def question_create(_question_create: question_schema.QuestionCreate):
    ##db = SessionLocal()
    _db_question = question_crud.create_question(db, question_create=_question_create)

    return _db_question


@router.get("/detail/{question_id}", response_model=question_schema.Question)
def question_detail(question_id: int, db: Session = Depends(get_db)):
    question = question_crud.get_question(db, question_id=question_id)
    return question


@router.put("/update")
def question_update(_question_update: question_schema.QuestionUpdate,
                    db: Session = Depends(get_db)):
    db_question = question_crud.get_question(db, question_id=_question_update.question_id)
    if not db_question:
        return "0"
    else:
        question = question_crud.update_question(db=db, db_question=db_question,
                                  question_update=_question_update)
        return question
