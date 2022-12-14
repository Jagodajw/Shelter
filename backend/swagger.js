const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Shelter API",
    description: "Api for shelter",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["src/index.ts", "src/controllers/*"];

swaggerAutogen(outputFile, endpointsFiles, doc);
