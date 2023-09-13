const mongoose = require("mongoose");

const url =
  "mongodb+srv://neymarachuthan:Achuthan%4010@achuthancluster.vqg6s6w.mongodb.net/chat?retryWrites=true&w=majority";

const connection = async () => {
  try {
    const connect = await mongoose.connect(url);
    console.log(connect.connection.host+'red', connect.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connection;
