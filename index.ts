require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ProductModel } from "./models/product.model";
const app = express();
const port = 5000;

// parser
app.use(express.json());
app.use(cors());

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);

    app.listen(port, () => {
      console.log(`ForestAtHome app listening on port ${port}`);
    });
  } catch (err) {
    console.log("Error happened 😡", err);
  }
}

main();

// routes
app.post("/api/v1/product", async (req, res) => {
  const product = req?.body;
  try {
    const result = await ProductModel.create(product);
    res.status(200).json({
      success: true,
      message: "Product Posted Successfully",
      data: result,
    });
  } catch (err) {
    console.log("Error 😡", err);
  }
});

app.get("/api/v1/product", async (req, res) => {
  try {
    const result = await ProductModel.find({ isDeleted: false });
    res.status(200).json({
      success: true,
      message: "Products Retrieved Successfully",
      data: result,
    });
  } catch (err) {
    console.log("Error 😡", err);
  }
});

app.get("/api/v1/product/:id", async (req, res) => {
  try {
    const { id } = req?.params;
    const result = await ProductModel.findById(id);
    res.status(200).json({
      success: true,
      message: "Product Retrieved Successfully",
      data: result,
    });
  } catch (err) {
    console.log("Error 😡", err);
  }
});

app.put("/api/v1/product/:id", async (req, res) => {
  try {
    const { id } = req?.params;
    const doc = req?.body;
    const result = await ProductModel.findByIdAndUpdate(id, doc);
    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      data: result,
    });
  } catch (err) {
    console.log("Error 😡", err);
  }
});

app.delete("/api/v1/product/:id", async (req, res) => {
  try {
    const { id } = req?.params;

    const result = await ProductModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
      data: result,
    });
  } catch (err) {
    console.log("Error 😡", err);
  }
});

// test route,
app.get("/", (req, res) => {
  res.send("ForestAtHome!");
});
