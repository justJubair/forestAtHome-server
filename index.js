"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./models/product.model");
const order_model_1 = require("./models/order.model");
const app = (0, express_1.default)();
const port = 5000;
const corsOption = {
    origin: ["https://forest-at-home-client.vercel.app", "http://localhost:5173"],
};
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOption));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.DB_URL);
            app.listen(port, () => {
                console.log(`ForestAtHome app listening on port ${port}`);
            });
        }
        catch (err) {
            console.log("Error happened 😡", err);
        }
    });
}
main();
// routes
app.post("/api/v1/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req === null || req === void 0 ? void 0 : req.body;
    try {
        const result = yield product_model_1.ProductModel.create(product);
        res.status(200).json({
            success: true,
            message: "Product Posted Successfully",
            data: result,
        });
    }
    catch (err) {
        console.log("Error 😡", err);
    }
}));
app.get("/api/v1/productCount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield product_model_1.ProductModel.estimatedDocumentCount();
    const result = { count };
    res.send(result);
}));
app.get("/api/v1/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const page = parseInt((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page);
        const limit = parseInt((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.limit);
        const skip = page * limit;
        const filter = req === null || req === void 0 ? void 0 : req.query;
        const query = {
            title: { $regex: filter.search || "", $options: "i" },
        };
        const result = yield product_model_1.ProductModel.find(query)
            .skip(skip)
            .limit(limit)
            .sort({
            price: filter.sort === "asc" ? 1 : -1,
        });
        res.status(200).json({
            success: true,
            message: "Products Retrieved Successfully",
            data: result,
        });
    }
    catch (err) {
        console.log("Error 😡", err);
    }
}));
app.get("/api/v1/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req === null || req === void 0 ? void 0 : req.params;
        const result = yield product_model_1.ProductModel.findById(id);
        res.status(200).json({
            success: true,
            message: "Product Retrieved Successfully",
            data: result,
        });
    }
    catch (err) {
        console.log("Error 😡", err);
    }
}));
app.put("/api/v1/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req === null || req === void 0 ? void 0 : req.params;
        const doc = req === null || req === void 0 ? void 0 : req.body;
        const result = yield product_model_1.ProductModel.findByIdAndUpdate(id, doc);
        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            data: result,
        });
    }
    catch (err) {
        console.log("Error 😡", err);
    }
}));
app.delete("/api/v1/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req === null || req === void 0 ? void 0 : req.params;
        const result = yield product_model_1.ProductModel.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
            data: result,
        });
    }
    catch (err) {
        console.log("Error 😡", err);
    }
}));
app.post("/api/v1/order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req === null || req === void 0 ? void 0 : req.body;
        const result = yield order_model_1.OrderModel.create(order);
        res.status(200).json({
            success: true,
            message: "Order Created Successfully",
            data: result,
        });
    }
    catch (err) {
        console.log("Error 😡", err);
    }
}));
// test route,
app.get("/", (req, res) => {
    res.send("ForestAtHome!");
});
