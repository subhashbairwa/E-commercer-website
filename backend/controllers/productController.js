import { cloudinary } from "../config/cloudinary.js";
import fs from "fs/promises";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    const imagesUrl = [];
    for (const img of images) {
      const result = await cloudinary.uploader.upload(img.path, {
        folder: "products"
      });
      imagesUrl.push(result.secure_url);
      // Temp file delete karo
      await fs.unlink(img.path);
    }

    const product = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === 'true',
      sizes: JSON.parse(sizes),
      images: imagesUrl,
      date: Date.now()
    });

    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message }); // ❌ fixed typo: was `error.meassage`
  }
};

export { listProduct, addProduct, removeProduct, singleProduct };
