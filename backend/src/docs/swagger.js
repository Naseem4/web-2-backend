const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Fit Genie API",
            version: "1.0.0",
            description: "Fitness and nutrition API"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },

    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;