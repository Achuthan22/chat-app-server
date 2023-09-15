import { connect as _connect } from "mongoose";

const url =
  "mongodb+srv://neymarachuthan:Achuthan%4010@achuthancluster.vqg6s6w.mongodb.net/chat?retryWrites=true&w=majority";

const connection = async () => {
  try {
    const connect = await _connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(connect.connection.host + "red", connect.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connection;
