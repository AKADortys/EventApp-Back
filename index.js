const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connect = require("./src/config/database");

connect();
app.use(cors());
app.use(express.json());

app.use("/users", require("./src/routes/user.route"));
app.use("/events", require("./src/routes/event.route"));
app.use("/auth", require("./src/routes/auth.route"));

app.listen(process.env.APP_PORT, () => {
  console.log(`app listening on port ${process.env.APP_PORT}`);
});
