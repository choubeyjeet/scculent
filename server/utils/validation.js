const joi = require("joi");

//create Product validation
const productValidation = joi
  .object({
    title: joi.string().min(3).max(50).required().label("Product Title"),
    description: joi.string().min(10).required().label("Product Descrption"),
    category: joi.string().required().label("Product Category"),
    price: joi.number().required().label("Product Price "),
    quantity: joi.number().required().label("Product Quantity"),
    discount: joi.number().required().label("Product Discount"),
  })
  .unknown(true);
const updateProduct = joi
  .object({
    title: joi.string().min(3).max(50).required().label("Product Title"),
    description: joi.string().min(10).required().label("Product Descrption"),
    category: joi.string().required().label("Product Categories"),
    price: joi.number().required().label("Product Price "),
    quantity: joi.number().required().label("Product Quantity"),
    discount: joi.number().required().label("Product Discount"),
  })
  .unknown(true);
const registerValidation = joi.object({
  firstname: joi.string().min(3).max(50).required(),
  lastname: joi.string().min(3).max(50).required(),
  email: joi.string().min(5).max(50).required().trim().lowercase(),
  password: joi.string().min(8).max(50).required(),
});
const loginValidation = joi.object({
  email: joi.string().min(5).max(50).required().email().trim().lowercase(),
  password: joi.string().required(),
});
const indianPhoneNumberRegex =
  /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
const pinCodeRegex = /^\d{6}$/;
const addressSchemaValidation = joi.object({
  userId: joi.string(), // Assuming userId is a string in this case
  name: joi.string().required().trim().label("Full name"),
  mobileNumber: joi.string().required().max(10).label("Mobile Number").trim(),
  pincode: joi.string().regex(pinCodeRegex).trim().required().max(6),
  address: joi.string().required(),
  city: joi.string().required(),
  state: joi.string().required(),
  country: joi.string().required(),
  landmark: joi.string().required(),
});

module.exports = {
  productValidation,
  updateProduct,
  addressSchemaValidation,
  registerValidation,
  loginValidation,
};
