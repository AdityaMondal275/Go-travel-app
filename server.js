const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Replace with your MongoDB connection string
const uri =
  "mongodb+srv://subhajitdas153:subhajit123@cluster0.8eiveap.mongodb.net/";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Example schema and model
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  details: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

// Example route
app.post("/book", async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
