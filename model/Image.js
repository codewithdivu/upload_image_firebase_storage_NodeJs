const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Image", ImageSchema);
