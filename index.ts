require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ProductModel } from "./models/product.model";
import { OrderModel } from "./models/order.model";
const app = express();
const port = 5000;

const corsOption = {
  origin: ["https://forest-at-home-client.vercel.app"],
};

// parser
app.use(express.json());
app.use(cors(corsOption));

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
app.post("/api/v1/product", async (req: Request, res: Response) => {
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

app.get("/api/v1/productCount", async (req: Request, res: Response) => {
  const count = await ProductModel.estimatedDocumentCount();
  const result = { count };
  res.send(result);
});

app.get("/api/v1/product", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req?.query?.page as string);
    const limit = parseInt(req?.query?.limit as string);
    const skip = page * limit;
    const filter = req?.query;
    const query = {
      title: { $regex: filter.search || "", $options: "i" },
    };

    const result = await ProductModel.find(query)
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
  } catch (err) {
    console.log("Error 😡", err);
  }
});

app.get("/api/v1/product/:id", async (req: Request, res: Response) => {
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

app.put("/api/v1/product/:id", async (req: Request, res: Response) => {
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

app.delete("/api/v1/product/:id", async (req: Request, res: Response) => {
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

app.post("/api/v1/order", async (req: Request, res: Response) => {
  try {
    const order = req?.body;

    const result = await OrderModel.create(order);
    res.status(200).json({
      success: true,
      message: "Order Created Successfully",
      data: result,
    });
  } catch (err) {
    console.log("Error 😡", err);
  }
});

// test route,
app.get("/", (req: Request, res: Response) => {
  res.send("ForestAtHome!");
});
