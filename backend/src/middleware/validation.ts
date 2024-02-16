import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name Must be string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 Must be string"),
  body("city").isString().notEmpty().withMessage("City Must be string"),
  body("country").isString().notEmpty().withMessage("Coutry Must be string"),
  handleValidationErrors,
];
