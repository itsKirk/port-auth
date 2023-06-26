const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const MongoDBStore = require("connect-mongo");
const cors = require("cors");
const connectDB = require("./db");

const { initializePassport } = require("./passport");
const app = express();
require("dotenv").config();

// Express session
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      // secure: true,
      httpOnly: false,
    },
    store: MongoDBStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION,
      collectionName: "sessions",
    }),
  })
);

app.use(
  cors({
    //origin: process.env.ALLOWED_URL,
    credentials: true,
  })
);
app.use(express.json());

// Passport middleware
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

const University = require("./models/University");
const universitiesData = require("./seed/universities");

// Connect to the database and check/seeding universities collection
connectDB()
  .then(async () => {
    // Check if universities collection has data
    const count = await University.countDocuments();

    if (count === 0) {
      // Seed universities collection
      await University.insertMany(universitiesData);
      console.log("Universities collection seeded successfully.");
    }
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.get("/", (req, res) => {
  res.json({
    info: "Welcome to JasNat Wares's Data Hub!",
    session: req.session,
  });
});
app.use("/api/universities", require("./routes/universities"));
app.use("/api/users", require("./routes/users"));
