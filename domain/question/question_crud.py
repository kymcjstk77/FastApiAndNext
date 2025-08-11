from datetime import datetime

from domain.question.question_schema import QuestionCreate, QuestionUpdate
from models import Question
from sqlalchemy.orm import Session

## 전체조회
def get_question_list(db: Session):
    question_list = db.query(Question)\
        .order_by(Question.create_date.desc())\
        .all()
    return question_list

## 등록
def create_question(db: Session, question_create: QuestionCreate):
    add_cnt = 0
    try:
        db_question = Question(subject=question_create.subject,
                               content=question_create.content,
                               create_date=datetime.now())
        add_cnt = 1
        db.add(db_question) ##단건처리
        db.commit()
    except Exception as e:
        add_cnt = 0
        db.rollback()
    return add_cnt

## 상세조회
def get_question(db: Session, question_id: int):
    question = db.query(Question).get(question_id)
    return question

## 수정
def update_question(db: Session, db_question: Question,
                    question_update: QuestionUpdate):
    add_cnt = 0
    try:
        db_question.subject = question_update.subject
        db_question.content = question_update.content
        db_question.modify_date = datetime.now()
        add_cnt = 1
        db.add(db_question)
        db.commit()
    except Exception as e:
        add_cnt = 0
        db.rollback()
    return add_cnt
