const express = require("express");

const Msg = require("./models/message");

const errorHandler = require("./middleware/errorhandler");
const connection = require("./config/dbConnection");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routers/userRoutes"));
app.use(errorHandler);

//connection();

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  Msg.find().then((result) => {
    console.log(result.sort((item) => item.timeOfDelivery));
    socket.emit("message", result);
  });

  console.log("a user connected");

  socket.on("message", (msg) => {
    const message = new Msg({ ...msg });
    message.save().then(() => {
      io.emit("message", msg);
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});

connection();

//const port = process.env.PORT || 5000;
const port = 3000;

httpServer.listen(port, () => {
  console.log("server started and listining on 3000");
});
