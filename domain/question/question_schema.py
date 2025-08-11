import datetime

from pydantic import BaseModel, field_validator
##, validator

##from domain.answer.answer_schema import Answer

class Question(BaseModel):
    id: int
    subject: str
    content: str
    create_date: datetime.datetime
 ##   answers: list[Answer] = []

    class Config:
        orm_mode = True ## model 자동으로 스카마 매핑처리 


class QuestionCreate(BaseModel):
    subject: str
    content: str

    ##@field_validator('subject', 'content')
    ##@validator('subject', 'content')
    ##def not_empty(cls, v):
    ##   if not v or not v.strip():
    ##        raise ValueError('빈 값은 허용되지 않습니다.')
    ##    return v

class QuestionUpdate(QuestionCreate):
    question_id: int
