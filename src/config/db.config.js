const mongoose = require('mongoose');
 
 
const connectDB = async (uri) => {
  try {
 
    // //approach 1
    // const client = new MongoClient(uri);
 
    // const db = (await client.connect()).db(process.env.MONGO_DB);
 
    // await db.createCollection(process.env.USER_COLLECTION);
// End
 
// Approach 2
    await mongoose.connect(url, {
      useNewUrlParser: true
    });
// End
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};
 
module.exports = connectDB;