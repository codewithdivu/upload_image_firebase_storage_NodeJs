const Image = require("../model/Image");
// images
const { firebase } = require("../firebase/service-account");
const { findOne } = require("../model/Image");
// uuid
const { v4: uuidv4 } = require("uuid");

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
    req.file.originalname = uuidv4();
    const blob = firebase.file(req.file.originalname);
    const identifier = req.file.originalname;

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
        const image = await Image.create({ imageUrl: url, identifier });
        res.status(200).json({ image });
      }
    );
  }
};

const deleteImage = async (req, res) => {
  const { identifier } = req.body;

  firebase
    .file(identifier)
    .delete()
    .then(async () => {
      console.log(`File deleted.`);
      const deleteImage = await Image.findOneAndDelete({ identifier });
      if (!deleteImage) {
        return res.status(404).send({
          msg: `image not found`,
        });
      } else {
        res.status(201).send({ deleteImage, msg: "successfully deleted" });
      }
    })
    .catch((error) => {
      res.status(400).send({ msg: error.errors, error: true });
    });
};

const updateImage = async (req, res) => {
  const { identifier } = req.body;
  const uploImage = req.file;

  console.log("identifier", identifier);
  console.log("uploadImage", uploImage);

  firebase
    .file(identifier)
    .delete()
    .then(() => {
      if (!req.file) {
        res.status(400).send("Error: No files found");
      } else {
        req.file.originalname = uuidv4();
        const blob = firebase.file(req.file.originalname);
        const newIdentifier = req.file.originalname;
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
            const image = await Image.findOneAndUpdate(identifier, {
              imageUrl: url,
              identifier: newIdentifier,
            });
            res.status(200).json({ image });
          }
        );
      }
    })
    .catch((error) => {
      res.send({ msg: error.errors });
    });
};

module.exports = {
  getAllImages,
  uploadImage,
  deleteImage,
  updateImage,
};
