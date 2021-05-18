const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  phone_no: { type: Number },
  shop_sanitization: { type: Number },
  social_distancing: { type: Number },
  shop_name: { type: String },
  shop_address: { type: String },
  mask_use: { type: Number },
  recommended: { type: String }
});

module.exports = mongoose.model("Rating", ratingSchema);
