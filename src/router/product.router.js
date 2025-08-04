const express = require("express");
const multer = require("multer");
const ImageKit = require("imagekit");
const jwt = require("jsonwebtoken");
const productModel = require("../models/product.model");
const isAuthenticated = require("../middlewares/auth");
require("dotenv").config();

const router = express.Router();

/////////////////////////////////////////////////
const storage = multer.memoryStorage();
const upload = multer({ storage });
///////////////////////////////////////////
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

////////////////////////////////////////////
router.get("/detail/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");

    let decode = null;
    const token = req.cookies?.token;
    if (token) {
      try {
        decode = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.warn("JWT decode failed:", err.message);
      }
    }

    res.render("productDetail", { product, decode });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
///////////////////////////////////////////////////
router.get("/add", isAuthenticated, (req, res) => {
  res.render("productForm", { user: req.user });
});

router.post("/add", isAuthenticated, upload.single("image"), async (req, res) => {
  try {
    const { name, brand, category, price, description } = req.body;

    if (!name || !brand || !category || !price || !description) {
      return res.status(400).send("All fields are required");
    }

    let imageUrl = "";

    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "/products",
      });
      imageUrl = uploadResponse.url;
    }

    const newProduct = new productModel({
      name,
      brand,
      category,
      price: parseFloat(price),
      description,
      stock: 1,
      image: imageUrl,
    });

    await newProduct.save();
    res.redirect("/");
  } catch (err) {
    console.error("Add Product error:", err.message);
    res.status(400).send("Product creation failed: " + err.message);
  }
});

module.exports = router;
