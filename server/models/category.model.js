const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    productImage: [
      {
        public_id: {
          type: String,
          required: true,
        },
        imageUrl: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timeStamps: true,
  }
);
const CategoryModel = new mongooose.model("category", categorySchema);
module.exports = CategoryModel;
