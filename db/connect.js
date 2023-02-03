const mongooose = require("mongoose");
mongooose.set("strictQuery", true);
const connectDB = (url) => {
  return mongooose.connect(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
