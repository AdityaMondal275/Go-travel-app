const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
  },
  { collation: { locale: "en_US", strength: 1 } }
);

mongoose.model("UserInfo", UserDetailsSchema);
