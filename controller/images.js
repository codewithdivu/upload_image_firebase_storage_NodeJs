const Image = require("../model/Image");

const getAllImages = async (req, res) => {
  try {
    const Images = await Image.find({});
    res.status(200).json({ Images });
  } catch (error) {
    res.status(400).send("there is some issues..");
  }
};

const createImage = async (req, res) => {
  try {
    const dudu = await Image.create(req.body);
    res.status(200).json({ dudu });
  } catch (error) {
    res.status(400).send("there is some issues....");
  }
};

module.exports = {
  getAllImages,
  createImage,
};
