const express = require("express");
const app = express();
// mongodb connection
const connectDB = require("./db/connect");
// dotenv configuration
require("dotenv").config();
// router
const Image = require("./route/images");
// Images
const firebase = require("./firebase/service-account");
const multer = require("multer");

// middlewares
app.use(express.json());
app.use("/", Image);
app.get("/", (req, res) => {
  res.send("hello from HOME PAGE");
});



const upload = multer({
  storage: multer.memoryStorage(),
});

app.post("/upload/image", upload.single("upload"), (req, res) => {
  console.log("req", req.body);
  console.log("reqfiile", req.file);
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

    blobWriter.on("finish", () => {
      res.status(200).send("File uploaded.");
    });

    blobWriter.end(req.file.buffer);
  }
});

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`sever is listening at port ${port}..........`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
