const express = require("express");
const router = express.Router();
const multer = require("multer");

// controller
const {
  getAllImages,
  uploadImage,
  deleteImage,
  updateImage,
} = require("../controller/images");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/upload", upload.single("upload"), uploadImage);

router.patch("/upload", upload.single("upload"), updateImage);
router.route("/upload").get(getAllImages).delete(deleteImage);

module.exports = router;
