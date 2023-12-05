const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {});

async function connect() {
  /*await client.connect();
  return client.db(DB_NAME);*/
  try {
    await client.connect();
    console.log('Connected to the database');
    return client.db(DB_NAME);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Rethrow error to handle it elsewhere
  }
}

module.exports = {
  connect, ObjectId
}