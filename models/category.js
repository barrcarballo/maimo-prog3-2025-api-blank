import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
});

export default mongoose.model("Category", categorySchema, "Categories");
