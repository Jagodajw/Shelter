const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "3.0",
    title: "Shelter API",
    description: "Api for shelter",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["src/index.ts", "src/controllers/*"];

swaggerAutogen(outputFile, endpointsFiles, doc);
