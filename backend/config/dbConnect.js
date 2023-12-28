const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://vuvanhao22:64bj9nq1bEA3QNDc@cluster0.wdkiphj.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((data) => {
      console.log(`mongodb connected with server: ${data.connection.host}`);
    });
};
module.exports = dbConnect;
