const express = require("express");
const router = express.Router();

const { getAllImages, createImage } = require("../controller/images");

router.route("/upload").get(getAllImages).post(createImage);

router.route('/upload/image').post()

module.exports = router;
