const swaggerJSDoc = require("swagger-jsdoc");
const eventSchema = require("./swaggerschema/event.schema");
const registrationSchema = require("./swaggerschema/registration.schema");
const userSchema = require("./swaggerschema/user.schema");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation de l'API Event",
    },
    servers: [
      {
        url: "http://localhost:3300",
        description: "Serveur de développement",
      },
    ],
    components: {
      schemas: {
        Event: eventSchema,
        Registration: registrationSchema,
        User: userSchema,
      },
    },
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"], // fichiers à scanner
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
