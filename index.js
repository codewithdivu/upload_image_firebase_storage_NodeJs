const express = require("express");
const app = express();
// mongodb connection
const connectDB = require("./db/connect");
// dotenv configuration
require("dotenv").config();
// router
const Image = require("./route/images");
// Images

// middlewares
app.use(express.json());
app.use("/", Image);
app.get("/", (req, res) => {
  res.send("hello from HOME PAGE");
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
