import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  description: { type: String },
  format: { type: String },
  price: { type: Number },
  tags: [{ type: String }],
  fileUrl: { type: String },
  imageUrl: { type: String },
});

export default mongoose.model("Product", productSchema, "Products");
