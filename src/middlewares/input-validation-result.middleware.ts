import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";
import { HttpStatus } from "../core/types/http-statuses";
import {
  ValidationErrorDto,
  ValidationErrorType,
} from "../core/types/validation-error";

export const createErrorMessages = (
  errors: ValidationErrorType[],
): ValidationErrorDto => {
  return { errorsMessages: errors };
};
const formatErrors = (error: ValidationError): ValidationErrorType => {
  if (error.type === "field") {
    return { field: error.path, message: error.msg };
  }

  // Прочие типы ошибок express-validator у нас не используются.
  return { field: "", message: error.msg };
};

export const blogInputValidationResultMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)
    .formatWith(formatErrors)
    .array({ onlyFirstError: true });
  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).json({
      errorsMessages: errors,
    });
  } else {
    next();
  }
};
