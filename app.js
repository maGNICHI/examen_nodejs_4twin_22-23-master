const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnection = require("./config/mongoconnection.json");
var path = require("path");
mongo
  .connect(mongoconnection.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
  });

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const HotelRouter = require("./routes/hotel");
const ChambreRouter = require("./routes/chambre");

const { getNonReservee } = require("./controller/chambreController");

app.use("/hotels", HotelRouter);
app.use("/chambres", ChambreRouter);

const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("user connected");
  //socket.emit("msg", "user connected");

  socket.on("x", (data) => {
    socket.broadcast.emit("x", data);
  });

  socket.on("afficher", async (data) => {
    console.log(data);
    r = await getNonReservee(data);
    console.log("afficher");
    console.log(r);
    io.emit("aff", r);
  });

  socket.on("disconnect", () => {
    io.emit("msg", "user diconnecter");
  });
});
server.listen(3000, () => console.log("server is run"));
