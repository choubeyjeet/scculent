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

module.exports = {
  productValidation,
  updateProduct,
  registerValidation,
  loginValidation,
};
