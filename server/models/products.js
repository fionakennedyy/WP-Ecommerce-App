const { ObjectID, connect } = require('./mongo');
const data = require("../data/products.json");

/**
 * @typedef {Object} Product
 * @property {number} id - The product's ID.
 * @property {string} title - The product's title.
 * @property {string} description - The product's description.
 * @property {number} price - The product's price.
 * @property {number} discountPercentage - The product's discount percentage.
 * @property {number} rating - The product's rating.
 * @property {number} stock - The product's stock.
 * @property {string} brand - The product's brand.
 * @property {string} category - The product's category.
 * @property {string} thumbnail - The product's thumbnail.
 * @property {string[]} images - The product's images.
 */

const COLLECTION_NAME = 'products';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

/**
 * @returns {Promise<Product[]>} An array of products.
 */
async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray(); //find function returns a cursor for a filter
}

/**
 * @param {number} id - The product's ID.
 */
async function get(id) {
  //
  const col = await getCollection();
  return await col.findOne({ _id: ObjectID(id) }) // findOne returns a promise
  /* old: gets from JSON:
  return data.products.find((product) => product.id === id); */
}

async function getByCategory(category) {
  const col = await getCollection();
  return await col.findOne({ category });
  // old: return data.products.filter((product) => product.category === category);
}

async function search(query) {
  col = await getCollection();
  const products = await col.find({
    $or: [
      { title: { $regex: query, $options: 'i' }}, // regular expressions
      { description: ( $regex: query, $options: 'i' )},
    ],
  }).toArray();
  return products;


  /*return data.products.filter((product) => {
    return (
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  });*/
}

//CRUD: create read update delete

/**
 * @param {Product} product - product to create
 * @returns {Promise<Product>} - created product
 */
async function create(product) {
  const newProduct = {
    id: data.products.length + 1,
    ...product,
  };
  const col = await getCollection();
  const result = await col.insertOne(newProduct); // 
  newProduct._id = result.insertedId;

  //const createdProduct = await get(newProduct._id);
  
  return newProduct;
}

/**
 * @param {Product} product - product's data
 * @returns {Product} - updated product
 */
async function update(product) {
  const col = await getCollection();
  const result = await col.findOneAndUpdate( // 3 params:
    { _id: ObjectID(product.id) },  // whats being updates
    { $set: product },  // what are we changing
    { returnDocument: 'after' },  // optional options
  );
  return result;
  /* old: const index = data.products.findIndex((p) => p.id === product.id);
  if(index === -1) {
    throw new Error('Product not found');
  }
  data.products[index] = {
    ...data.products[index],
    ...product,
  };
  return data.products[index];*/
}

/**
 * @param {string} id - product's id
 */
async function remove(id) {
  const col = await getCollection();
  const result = await col.deleteOne({ _id: ObjectID(id) });
  if(result.deletedCount === 0) {
    throw new Error('Product not found');
  }
  /* old: const index = data.products.findIndex(p => p.id === id);
  if(index === -1) {
    throw new Error('Product not found');
  }
  data.products.splice(index, 1);*/
}

async function seed() { // sample data for running without database
  const col = await getCollection();
  await col.insertMany(data.products);
}

module.exports = {
  getAll, get, getByCategory, search, create, update, remove, getCollection, COLLECTION_NAME, seed
};