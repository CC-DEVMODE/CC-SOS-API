require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const roomRoute = require("./routes/room-route");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: { message: "too many requests" },
  })
);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/room", roomRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("server running on port " + port));
