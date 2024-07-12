import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model<IProduct>("Product", productSchema);
