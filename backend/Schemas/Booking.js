// In ./Schemas/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInfo",
    required: true,
  },
  itemName: { type: String, required: true },
  itemDetails: { type: String },
  itemImage: { type: String },
  bookingDate: { type: Date, default: Date.now },
});

mongoose.model("Booking", BookingSchema);
