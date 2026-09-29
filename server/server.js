const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const patientRoutes =
  require("./routes/patientRoutes");

const doctorRoutes =
  require("./routes/doctorRoutes");

const staffRoutes =
  require("./routes/staffRoutes");

const appointmentRoutes =
  require(
    "./routes/appointmentRoutes"
  );

const departmentRoutes =
  require(
    "./routes/departmentRoutes"
  );

const prescriptionRoutes =
  require(
    "./routes/prescriptionRoutes"
  );

const billingRoutes =
  require("./routes/billingRoutes");

const dashboardRoutes =
  require(
    "./routes/dashboardRoutes"
  );

const errorMiddleware =
  require(
    "./middleware/errorMiddleware"
  );

const app = express();

const PORT =
  process.env.PORT || 5000;


// =====================================================
// DATABASE
// =====================================================

connectDB();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);


// =====================================================
// ROOT
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "MediCare Hospital Management API is running",
  });
});


// =====================================================
// API ROUTES
// =====================================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/patients",
  patientRoutes
);

app.use(
  "/api/doctors",
  doctorRoutes
);

app.use(
  "/api/staff",
  staffRoutes
);

app.use(
  "/api/appointments",
  appointmentRoutes
);

app.use(
  "/api/departments",
  departmentRoutes
);

app.use(
  "/api/prescriptions",
  prescriptionRoutes
);

app.use(
  "/api/billing",
  billingRoutes
);


// =====================================================
// 404
// =====================================================

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        `Route not found: ${req.method} ${req.originalUrl}`,
    });
  }
);


// =====================================================
// ERROR HANDLER
// =====================================================

app.use(
  errorMiddleware
);


// =====================================================
// SERVER
// =====================================================

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on port ${PORT}`
    );

    console.log(
      "JWT_SECRET loaded:",
      Boolean(
        process.env.JWT_SECRET
      )
    );

    console.log(
      "MongoDB URI loaded:",
      Boolean(
        process.env.MONGO_DB_URI
      )
    );
  }
);