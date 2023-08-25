const ProductModel = require("../models/product.model");
const { productValidation, updateProduct } = require("../utils/validation");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//fetch All products
exports.getProducts = async (req, res) => {
  try {
    const { type, search, sort, category, title } = req.query;

    let query = {};
    let sortOptions = {};

    if (sort === "high") {
      sortOptions = { price: -1 };
    } else if (sort === "low") {
      sortOptions = { price: 1 };
    }

    if (type === "count") {
      const totalProduct = await ProductModel.countDocuments(query);
      return res.status(200).json({ totalProducts: totalProduct });
    }

    if (type === "trending") {
      const totalProduct = await ProductModel.find().limit(4);
      return res.status(200).json({ totalProducts: totalProduct });
    }

    if (type === "all" || type === "category" || type === "search") {
      if (type === "search") {
        query.title = {
          $regex: title,
          $options: "i",
        };
      }

      if (type === "category") {
        query.category = {
          $regex: category,
          $options: "i",
        };

        // Fetch products with the specified category
        const productsByCategory = await ProductModel.find(query)
          .select("-password -adminId")
          .sort(sortOptions);

        if (productsByCategory.length === 0) {
          return res
            .status(404)
            .json({ message: "No products found in the specified category" });
        }

        return res.status(200).json({ products: productsByCategory });
      }

      // Fetch products without category filter for "all" and "search" types
      const products = await ProductModel.find(query)
        .select("-password -adminId")

        .sort(sortOptions);

      return res.status(200).json({ products });
    }

    return res.status(400).json({ message: "Invalid type" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getByProductId = async (req, res) => {
  let productId = req.params.id;
  try {
    const products = await ProductModel.findById({ _id: productId })
      .select("-password")
      .populate("adminId");
    if (products.length < 0) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  let loginId = req.user._id;

  let { error, value } = productValidation.validate(req.body, ProductModel);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  if (!req.files) {
    return res.status(404).json({ error: "Product Images is required" });
  }
  const imagesLength = req.files;
  const uploadImages =
    imagesLength.length &&
    imagesLength.map((imageData, index) => {
      const localPath = path.join(
        __dirname,
        "..",
        `/uploads/${imageData.originalname}`
      );

      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
          localPath,
          {
            folder: "Inventory_backend",
          },
          (error, result) => {
            if (result) {
              fs.unlinkSync(localPath);
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
      });
    });
  const results = await Promise.all(uploadImages);

  const productImages =
    results.length > 0 &&
    results.map((data, index) => {
      return { public_id: data.public_id, imageUrl: data.url };
    });

  const productCreate = new ProductModel({
    title: value.title,
    description: value.description,
    price: value.quantity,
    quantity: value.quantity,
    category: value.category,
    discount: value.discount,
    productImage: productImages,
    adminId: loginId,
  });
  await productCreate.save();

  try {
    return res
      .status(200)
      .json({ message: "Product Create Successfully.", productCreate });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ error: "Product not found or Already Deleted." });
    }

    // Delete associated Cloudinary images
    const imageIds = product.productImage.map((image) => image.public_id);
    await cloudinary.v2.api.delete_resources(imageIds);

    // Delete the product from the database
    await product.deleteOne({ _id: productId });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const { error, value } = updateProduct.validate(req.body, ProductModel);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the product fields
    product.title = value.title;
    product.description = value.description;
    product.price = value.price;
    product.quantity = value.quantity;
    product.category = value.category;
    product.discount = value.discount;

    await product.save();

    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteImageFromProduct = async (req, res, next) => {
  let { productId, imageId } = req.body;

  try {
    const delImage = await cloudinary.v2.api.delete_resources(imageId);

    const product = await ProductModel.findByIdAndUpdate(productId);
    if (!product) {
      return res
        .status(404)
        .json({ error: "Product not found or Already Deleted." });
    }

    const result = (product.productImage = product.productImage.filter(
      (image) => image.public_id.toString() !== imageId
    ));

    // Save the updated product document
    await product.save();
    // await product.save();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
