require("dotenv").config();
const connectDB = require("./db/connect");

const Product = require("./models/Product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // clear the entire collection
    await Product.create(jsonProducts); // populate the collection
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
