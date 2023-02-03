const express = require("express");
const router = express.Router();
const multer = require("multer");

// controller
const {
  getAllImages,
  uploadImage,
  deleteImage,
} = require("../controller/images");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/upload", upload.single("upload"), uploadImage);

router.route("/upload").get(getAllImages);

router.route("/upload/:url").delete(deleteImage);

module.exports = router;
