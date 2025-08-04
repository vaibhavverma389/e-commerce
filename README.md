# 🛒 E-Commerce Web Application

A simple full-stack **E-Commerce Website** built with **Node.js**, **Express**, **MongoDB**, and **EJS** templating. It includes user registration/login, product management, and secure cookie-based sessions.

## 🚀 Features

- 🧑‍💻 User Registration and Login (with email, password, mobile number)
- 🛍️ Product listing with dynamic rendering
- 🍪 Cookie-based session handling
- 📄 Server-side form validation
- 🎨 Clean and responsive frontend using HTML + CSS (no frontend framework)
- 📁 MVC Project structure for scalability

## 📁 Folder Structure

e-commerce/
├── public/               # Static assets (CSS, JS, images)
│   └── register.css
├── router/               # Application route handlers
│   ├── index.router.js
│   ├── product.router.js
│   └── user.router.js
├── views/                # EJS templates for rendering HTML pages
│   ├── register.ejs
│   ├── login.ejs
│   ├── products.ejs
│   └── index.ejs
├── .env                  # Environment variables (e.g., MONGO_URI, PORT)
├── app.js                # Express app configuration
├── server.js             # Entry point to run the server
└── README.md             # Project documentation




## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, EJS
- **Database**: MongoDB
- **Other Tools**: dotenv, cookie-parser
