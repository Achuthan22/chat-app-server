import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import connection from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";

// routes
import AuthRoute from "./routers/AuthRoute.js";
import UserRoute from "./routers/UserRoute.js";
import MessageRoute from "./routers/MessageRoute.js";
import ChatRoute from "./routers/ChatRoute.js";

const app = express();

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

const port = process.env.PORT || 4000;
//const port = 3000;

connection();
app.listen(port, () => {
  console.log(`server started and listining on ${port}`);
});

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
app.use(errorHandler);
