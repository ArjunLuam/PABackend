const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    phone_no: { type: Number },
    san: { type: Number },
    dist: { type: String },
    shopName: { type: String },
    shopAddress: { type: String },
    mask: { type: Number },
    recommended: { type: String },
});

module.exports = mongoose.model("Rating", ratingSchema);
