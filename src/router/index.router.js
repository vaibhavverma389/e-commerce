const express = require("express");
const productModel = require("../models/product.model"); 
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }

  try {
    const products = await productModel.find(filter).sort({ createdAt: -1 });

    const token = req.cookies.token;
    let user = null;

    if (token) {
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.error("JWT Error:", err.message);
      }
    }

    res.render("home.ejs", { products, user });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
