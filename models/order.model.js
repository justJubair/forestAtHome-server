"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
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
exports.OrderModel = (0, mongoose_1.model)("Order", orderSchema);
