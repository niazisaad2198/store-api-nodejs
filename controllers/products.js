const Product = require("../models/Product");
//const { createCustomError } = require("../errors/errorHandler");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ msg:'Products testing route' });
};

const getAllProducts = async (req, res) => {
  //const products = await Product.find({});
  res.status(200).json({ msg:'Products route' });
};

module.exports={getAllProducts, getAllProductsStatic}

/*

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ task });
};

const getProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    return next(
      createCustomError(
        { msg: `Product not found with id: ${productId}.` },
        404
      )
    );
  }
  res.status(200).json({ task });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(
      createCustomError(
        { msg: `Product not found with id: ${productId}.` },
        404
      )
    );
  }
  res.status(200).json({ task });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndDelete({ _id: taskId });
  if (!product) {
    return next(
      createCustomError({ msg: `Product not found with id: ${taskId}.` }, 404)
    );
  }
  res.status(200).json({ task });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
*/