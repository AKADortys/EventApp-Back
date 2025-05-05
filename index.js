const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config(); //importation des variables env
const connect = require("./src/config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

connect(); //connection à la bdd
app.use(cookieParser()); //utilisation de la config de cookie parser poour les cookies
app.use(cors()); //les domaines autorisé à définir
app.use(express.json()); //middleware pour les réponse et requêtes

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//routes
app.use("/users", require("./src/routes/user.route"));
app.use("/events", require("./src/routes/event.route"));
app.use("/auth", require("./src/routes/auth.route"));
app.use("/registrations", require("./src/routes/registration.route"));

app.listen(process.env.APP_PORT, () => {
  console.log(`app listening on port ${process.env.APP_PORT}`);
});
