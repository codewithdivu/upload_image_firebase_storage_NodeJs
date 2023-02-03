const Image = require("../model/Image");
// images
const firebase = require("../firebase/service-account");

const getAllImages = async (req, res) => {
  try {
    const Images = await Image.find({});
    res.status(200).json({ Images });
  } catch (error) {
    res.status(400).send("there is some issues..");
  }
};

const uploadImage = async (req, res) => {
  if (!req.file) {
    res.status(400).send("Error: No files found");
  } else {
    const blob = firebase.bucket.file(req.file.originalname);

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on("error", (err) => {
      console.log(err);
    });

    // blobWriter.on("finish", () => {
    //   res.status(200).send("File uploaded.");
    // });

    blobWriter.end(req.file.buffer);

    blob.getSignedUrl(
      {
        action: "read",
        expires: "03-09-2491",
      },
      async (err, url) => {
        if (err) {
          console.error(err);
          return;
        }
        const dudu = await Image.create({ title: url });
        res.status(200).json({ dudu });
      }
    );
  }
};

const deleteImage = async (req, res) => {
  const url = req.params.url;
  const file = firebase.bucket.file("<file_path>");

  file
    .delete()
    .then(() => {
      console.log(`File deleted.`);
    })
    .catch((error) => {
      console.error(`Error deleting file: ${error}`);
    });
};

module.exports = {
  getAllImages,
  uploadImage,
  deleteImage,
};
