const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
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
        useCreateIndex: true,
    }
);

let db = mongoose.connection;

db.once("open", () => {
    console.log("Db connected sucessfully");
});

db.on("error", (err) => {
    console.log(err);
});

app.post("/addratings", async (req, res) => {
    if (!req.body) {
        return res.status(200).json({ message: "Body not present" });
    }
    try {
        const newRating = new Rating({
            _id: mongoose.Types.ObjectId(),
            phone_no: req.body.phone_no,
            shop_sanitization: req.body.shop_sanitization,
            social_distancing: req.body.social_distancing,
            shop_name: req.body.shop_name,
            shop_address: req.body.shop_address,
            mask_use: req.body.mask_use,
            recommended: req.body.recommended,
        });
        const data = await newRating.save();
        return res.status(200).json({
            message: "rating added",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

app.get("/getratings", async (req, res) => {
    try {
        const dataGotFromApi = await Rating.find();
        return res.status(200).json(dataGotFromApi);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
        });
    }
});

app.get("/", (req, res) => {
    return res.status(200).json("Hi I am ratings API");
});

app.get("*", (req, res) => {
    return res.status(200).json({
        message: "this route doesn't exist for now",
    });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
