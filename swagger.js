const swaggerAutogen = require('swagger-autogen')();
// const baseURL = ENV.baseURL;
const port = process.env.PORT || 8080;

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'gameapp.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);