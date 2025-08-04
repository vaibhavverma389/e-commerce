const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Routers
const indexRouter = require("./router/index.router");
const productRouter = require("./router/product.router");
const userRouter = require("./router/user.router");

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

// Export app
module.exports = app;
