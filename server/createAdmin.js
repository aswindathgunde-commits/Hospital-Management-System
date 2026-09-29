const dotenv = require("dotenv");
const mongoose = require("mongoose");

const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect MongoDB
    await mongoose.connect(
      process.env.MONGO_DB_URI
    );

    console.log("MongoDB connected.");

    const adminEmail =
      "admin@medicare.com";

    const adminPassword =
      "Admin@123";

    // Check existing admin
    let admin = await User.findOne({
      email: adminEmail,
    }).select("+password");

    if (admin) {
      // Reset existing admin
      admin.name =
        "Hospital Administrator";

      admin.password =
        adminPassword;

      admin.role = "admin";

      admin.isActive = true;

      // User.js pre-save middleware
      // will hash the password ONE time.
      await admin.save();

      console.log(
        "Existing admin account reset successfully."
      );
    } else {
      // Create new admin
      // DO NOT hash password here.
      // User.js will hash it automatically.
      admin = await User.create({
        name: "Hospital Administrator",

        email: adminEmail,

        password: adminPassword,

        role: "admin",

        isActive: true,
      });

      console.log(
        "Admin account created successfully."
      );
    }

    console.log("----------------------------------");
    console.log("ADMIN LOGIN DETAILS");
    console.log("----------------------------------");
    console.log("Email: admin@medicare.com");
    console.log("Password: Admin@123");
    console.log("Role:", admin.role);
    console.log("----------------------------------");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("----------------------------------");
    console.error("ADMIN CREATION FAILED");
    console.error("----------------------------------");
    console.error(error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

createAdmin();