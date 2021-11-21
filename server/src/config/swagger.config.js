const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Express API',
        version: '1.0.0',
        description: 'NodeJS Soniq RestAPI',
        license: {
          name: 'License',
          url: 'https://choosealicense.com/licenses/mit/',
        },
        contact: {
          name: 'NodeJS Soniq',
          url: '',
          email: 'm.jiyan_aslan@hotmail.com',
        },
      },
    servers: [
            {
                url: "http://localhost:8081",
            },
        ],
    },
    apis: [
        "./src/api/swagger/swagger.yaml"
      ],
};

module.exports = options;