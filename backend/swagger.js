const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "3.0",
    title: "Shelter API",
    description: "Api for shelter",
  },
  host: "localhost:3000",
  definitions: {
    BikeComponent: {
      id: "string",
      name: "string",
      type: "number",
      user: {
        id: "string",
      },
    },
    SheltersResponse: [
      {
        ID: "string",
        name: "string",
        img: "string",
      },
    ],
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["src/index.ts", "src/controllers/*"];

swaggerAutogen(outputFile, endpointsFiles, doc);
