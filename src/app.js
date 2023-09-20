require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const http = require("http");
const { Server } = require("socket.io");

const authRoute = require("./routes/auth-route");
const roomRoute = require("./routes/room-route");

const authenticateMiddleware = require("./middlewares/authenticate");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
});

app.set("socketio", io);

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

app.use("/auth", authRoute);
app.use("/room", authenticateMiddleware, roomRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log("server running on port " + port));
