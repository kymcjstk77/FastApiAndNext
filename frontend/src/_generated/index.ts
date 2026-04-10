import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Question = z
  .object({
    id: z.number().int(),
    subject: z.string(),
    content: z.string(),
    create_date: z.string().datetime({ offset: true }),
  })
  .passthrough();
const QuestionCreate = z
  .object({ subject: z.string(), content: z.string() })
  .passthrough();
const ValidationError = z
  .object({
    loc: z.array(z.union([z.string(), z.number()])),
    msg: z.string(),
    type: z.string(),
  })
  .passthrough();
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();
const question_id = z.number().int();
const QuestionUpdate = z
  .object({
    subject: z.string(),
    content: z.string(),
    question_id: z.number().int(),
  })
  .passthrough();

export const schemas = {
  Question,
  QuestionCreate,
  ValidationError,
  HTTPValidationError,
  question_id,
  QuestionUpdate,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/api/question/create",
    alias: "question_create_api_question_create_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: QuestionCreate,
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/question/detail/:question_id",
    alias: "questionDetailApiQuestionDetailQuestionIdGet",
    requestFormat: "json",
    parameters: [
      {
        name: "question_id",
        type: "Path",
        schema: question_id,
      },
    ],
    response: Question,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/question/list",
    alias: "questionListApiQuestionListGet",
    requestFormat: "json",
    response: z.array(Question),
  },
  {
    method: "put",
    path: "/api/question/update",
    alias: "question_update_api_question_update_put",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: QuestionUpdate,
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
