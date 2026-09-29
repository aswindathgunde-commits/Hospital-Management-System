const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_DB_URI;

    if (!mongoURI) {
      throw new Error("MONGO_DB_URI is not defined in .env");
    }

    const connection = await mongoose.connect(mongoURI);

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );

    return connection;
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);

    throw error;
  }
};

module.exports = connectDB;