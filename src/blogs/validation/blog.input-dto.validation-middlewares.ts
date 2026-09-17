import { body } from "express-validator";

const nameValidation = body("name")
  .isString()
  .withMessage("name should be a string")
  .trim()
  .isLength({ min: 2, max: 15 })
  .withMessage("Length of name is not correct");

const descriptionValidation = body("description")
  .isString()
  .withMessage("description should be a string")
  .trim()
  .isLength({ min: 3, max: 500 })
  .withMessage("Length of description is not correct");

const urlValidation = body("websiteUrl")
  .isString()
  .withMessage("websiteUrl should be a string")
  .trim()
  .isLength({ min: 5, max: 100 })
  .withMessage("Length of websiteUrl is not correct")
  .matches(
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
  )
  .withMessage("websiteUrl does not match the required pattern");

// Набор middleware-валидаторов тела запроса на создание/обновление водителя.
export const blogInputDtoValidation = [
  nameValidation,
  descriptionValidation,
  urlValidation,
];
