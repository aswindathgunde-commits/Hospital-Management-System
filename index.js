 const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const routes = require("./routes/api");

const app = express();

const port =
  process.env.PORT || 5000;

/* =====================================================
   DATABASE
===================================================== */

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log(
      "Database connected successfully"
    );
  })
  .catch((error) => {
    console.error(
      "Database connection error:",
      error
    );
  });

mongoose.Promise = global.Promise;

/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* =====================================================
   CORS
===================================================== */

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* =====================================================
   API ROUTES
===================================================== */

app.use("/api", routes);

/* =====================================================
   REACT STATIC FILES
===================================================== */

app.use(
  express.static(
    path.join(
      __dirname,
      "client",
      "dist"
    )
  )
);

/* =====================================================
   REACT ROUTE FALLBACK
===================================================== */

app.get("*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "client",
      "dist",
      "index.html"
    )
  );
});

/* =====================================================
   SERVER
===================================================== */

app.listen(port, () => {
  console.log(
    `Server running on port ${port}`
  );
});