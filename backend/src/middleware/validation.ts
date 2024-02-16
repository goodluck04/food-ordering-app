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

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant Name is required"),
  body("city").notEmpty().withMessage("City  is required"),
  body("country").notEmpty().withMessage("Country  is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price  is required"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated Delivery Time is required"),
  body("cuisines")
    .isArray()
    .withMessage("Couisines must be  an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu Items must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu Item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Item price is required"),
  handleValidationErrors,
];
