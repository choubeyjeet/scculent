const CategoryModel = require("../../../models/category.model");
const path = require("path");
const cloudinary = require("cloudinary");
const fs = require("fs");
exports.createCategory = async (req, res) => {
  try {
    const imagesLength = req.files;

    const uploadImages =
      imagesLength.length &&
      imagesLength.map((imageData, index) => {
        const localPath = path.join(
          __dirname,
          "..",
          `../../uploads/${imageData.originalname}`
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

    const category = new CategoryModel({
      categoryName: req.body.categoryName,

      productImage: productImages,
    });
    const newCategory = await category.save();

    return res.status(200).json({ message: "Category Created Successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.body;
  try {
    await CategoryModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "Category Deleted Successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.editCategory = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find();
    return res.status(200).json({ data: category });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
