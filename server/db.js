const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MongoDB connection URI
    const uri = process.env.MONGODB_CONNECTION;

    // Optional MongoDB connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, options);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
