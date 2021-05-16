const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    phone_no: { type: Number },
    shop_sanitization: { type: Number },
    social_distancing: { type: String },
    shop_name: { type: String },
    shop_address: { type: String },
    mask_use: { type: Number },
    recommended: { type: String },
});

module.exports = mongoose.model("Rating", ratingSchema);
