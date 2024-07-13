import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  products: [
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
  ],
});

export const OrderModel = model<IOrder>("Order", orderSchema);
