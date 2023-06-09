const Product = require("../models/Product");

const getAllProductsStatic = async (req, res) => {
  const results = await Product.find({})
    .sort("name")
    .select("name price")
    .limit(10);
  res.status(200).json({ products: results, nbHits: results.length });
};

const getAllProducts = async (req, res) => {
  // extract information form request parameters
  const {
    name,
    featured,
    price,
    rating,
    company,
    sort,
    fields,
    numericFilters,
  } = req.params;
  const queryObject = {};
  if (name) queryObject.name = { $regex: name, $options: "i" };
  if (featured) queryObject.featured = featured === "true" ? true : false;
  if (price) queryObject.price = price;
  if (rating) queryObject.rating = rating;
  if (company) queryObject.company = company;
  const results = await Product.find(queryObject);

  // sort results by parameters
  if (sort) {
    const sortParamList = sort.split(",").join(" ");
    results = results.sort(sortParamList);
  } else {
    results = results.sort({ createdAt });
  }

  //include and exclude fields from results
  if (fields) {
    const fieldsParamList = fields.split(",").join(" ");
    results = results.select(fieldsParamList);
  }

  // skip and limit results
  const page = Number(req.params.page) || 1;
  const limit = Number(req.params.limit) || 10;
  const skip = (page - 1) * limit;
  results = results.skip(skip).limit(limit);

  // numeric filters for filtering results based on numeric properties like price and rating.
  if (numericFilters) {
    const operatorMaps = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b`${<|<=|=|>|>=}`\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMaps[match]}-`
    );

    const options = [price, rating];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.include(field))
        queryObject[field] = { [operator]: Number(value) };
    });
  }

  res.status(200).json({ products: results, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
