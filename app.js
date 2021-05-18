const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const Rating = require("./models/rating");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://test:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.k9rlp.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

let db = mongoose.connection;

db.once("open", () => {
  console.log("Db connected sucessfully");
});

db.on("error", err => {
  console.log(err);
});

app.post("/addratings", async (req, res) => {
  if (!req.body) {
    return res.status(200).json({ message: "Body not present" });
  }
  try {
    const newRating = new Rating({
      phone_no: req.body.phone_no,
      shop_sanitization: req.body.shop_sanitization,
      social_distancing: req.body.social_distancing,
      shop_name: req.body.shop_name,
      shop_address: req.body.shop_address,
      mask_use: req.body.mask_use,
      recommended: req.body.recommended
    });
    const data = await newRating.save();
    return res.status(201).json({
      status: true,
      data: data
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
});

app.get("/getAllRatings", async (req, res) => {
  try {
    const { shop } = req.query;
    const dataGotFromApi = await Rating.find();
    return res.status(200).json({
      status: true,
      data: dataGotFromApi
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
});

app.get("/getYourRatings", async (req, res) => {
  try {
    const { phone } = req.query;
    const dataGotFromApi = await Rating.find({ phone_no: phone });
    return res.status(200).json({
      status: true,
      data: dataGotFromApi
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
});

app.get("/reviewRestraunt", async (req, res) => {
  try {
    const { name } = req.query;
    const data = await Rating.find({ shop_name: name });

    var sanitization = 0,
      distancing = 0,
      maskUsage = 0,
      count = 0;

    data.forEach(entry => {
      sanitization += entry.shop_sanitization;
      maskUsage += entry.mask_use;
      distancing += entry.social_distancing;
      count++;
    });

    var avg_sanitization = sanitization / count;
    var avg_distancing = distancing / count;
    var avg_mask = maskUsage / count;
    return res.status(200).json({
      status: true,
      data: {
        avg_distancing,
        avg_mask,
        avg_sanitization
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
});
app.get("/", (req, res) => {
  return res.status(200).json("Hi I am ratings API");
});

app.get("*", (req, res) => {
  return res.status(200).json({
    message: "this route doesn't exist for now"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
