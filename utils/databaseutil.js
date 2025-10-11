const { MongoClient } = require('mongodb');

let cachedClient = null;
let cachedDb = null;

const mongoconnect = async () => {
  if (cachedDb) return cachedDb; // reuse existing connection

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URI not set");
  }

  try {
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    cachedClient = client;
    cachedDb = client.db('lost&found'); // your DB name
    console.log('MongoDB connected successfully!');
    return cachedDb;
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err;
  }
};

const getdb = () => {
  if (!cachedDb) throw new Error('Database not connected');
  return cachedDb;
};

module.exports = { mongoconnect, getdb };