import express, { json } from "express";

import errorHandler from "./middleware/errorhandler";
import connection from "./config/dbConnection";

import ChatRoute from "./routers/ChatRoute";
import MessageRoute from "./routers/MessageRoute";

import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());
dotenv.config();

app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
app.use(errorHandler);

connection();

//const port = process.env.PORT || 5000;
const port = 3000;

httpServer.listen(port, () => {
  console.log("server started and listining on 3000");
});

//const httpServer = require("http").createServer(app);

// const io = require("socket.io")(httpServer, {
//   cors: { origin: "*" },
// });

// io.on("connection", (socket) => {
//   find().then((result) => {
//     console.log(result.sort((item) => item.timeOfDelivery));
//     socket.emit("message", result);
//   });

//   console.log("a user connected");

//   socket.on("message", (msg) => {
//     const message = new Msg({ ...msg });
//     message.save().then(() => {
//       io.emit("message", msg);
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("a user disconnected!");
//   });
// });
