const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection setup
const mongoUrl =
  "mongodb+srv://subhajit123:subhajitdas123@cluster0.8eiveap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const JWT_SECRET =
  "dhgbgdlvfuormx0r[oim[4mu89yxr4jlkfcnrjfkkljhvruiy8457483948298423n42-c48run4n-r3ddms";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((e) => {
    console.log(e);
  });

require("./Schemas/UserDetails");
const User = mongoose.model("UserInfo");

require("./Schemas/Booking");
const Booking = mongoose.model("Booking");

// Routes
app.get("/", (req, res) => {
  res.send({ status: "started" });
});

// Signup
app.post("/register", async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.send({ status: "error", data: "User already exists" });
  }

  const encryptedPass = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name,
      email,
      mobile,
      password: encryptedPass,
    });
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.send({ status: "error", data: "User does not exist" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.send({ status: "error", data: "Password does not match" });
  }
  if (isMatch) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.send({ status: "ok", data: "User logged in", token: token });
    } else {
      return res.send({ status: "error", data: "Failed to login" });
    }
  }
});

// UserData
app.post("/userdata", async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;

    const foundUser = await User.findOne({ email: userEmail });
    if (foundUser) {
      const bookings = await Booking.find({ user: foundUser._id });
      res.send({ status: "ok", data: { user: foundUser, bookings: bookings } });
    } else {
      res.send({ status: "error", data: "User not found" });
    }
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});

// book
app.post("/book", async (req, res) => {
  const { token, itemName, itemDetails, itemImage } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;

    const foundUser = await User.findOne({ email: userEmail });

    if (foundUser) {
      const newBooking = new Booking({
        user: foundUser._id,
        itemName,
        itemDetails,
        itemImage,
      });

      await newBooking.save();
      res.send({ status: "ok", data: "Booking successful" });
    } else {
      res.send({ status: "error", data: "User not found" });
    }
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});

// Server setup
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
