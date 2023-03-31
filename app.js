require("dotenv").config();
require("express-async-errors");

const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

// middleware
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use()

// routes
app.get("/", (req, res) => {
  res.send("Store API");
});

// product routes

app.use("/api/v1/products", productsRouter);

app.use(errorHandler);
app.use(notFound);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server running on port ${port}.`));
  } catch (error) {
    console.log(error);
  }
};

start();
