const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    require: true,
    
  },
  identifier: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Image", ImageSchema);
