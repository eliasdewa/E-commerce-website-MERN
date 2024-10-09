import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
}, {timestamps: true});

const reviewModel = mongoose.models.Review || mongoose.model('Review', reviewSchema);
export default reviewModel;