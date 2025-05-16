import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: [{ type: String, enum: ["veg", "non-veg"] }] },
  bestSeller: { type: String },
  price: { type: String },
  description: { type: String },
  image: { type: String },
  firm: [{ type: mongoose.Schema.Types.ObjectId, ref: "Firm" }],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
