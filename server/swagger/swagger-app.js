const fs = require('fs');
const express = require('express');
const app = express();
const swaggerUi = require('express-swaggerize-ui');

var swaggerJSDoc = require('swagger-jsdoc');

const PORT_API = 8080;
const PORT_SERVER = 3010;

var options = {
    swaggerDefinition: {
        info: {
            title: 'Sprints', // Title (required)
            version: '0.0.2', // Version (required)
        },
        host: `localhost:${PORT_API}`
    },
    apis: ['../**/controllers/*.js', '../**/models/*.js']
};

var swaggerSpec = swaggerJSDoc(options);

var text = JSON.stringify(swaggerSpec);

fs.writeFile("docs/api-docs.json", text, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("\n** api-docs.json generated. **");

        app.use('/api-docs.json', function (req, res) {
            res.json(require('./docs/api-docs.json'));
        });
        app.use('/api-docs', swaggerUi());

        let listener = app.listen(PORT_SERVER, () => {

            let address = listener.address().address == "::" ? "localhost" : listener.address().address;
            console.log(`** Server running on ${listener.address().port}... **`);
            console.log(`** Go to ${address}:${listener.address().port}/api-docs to see the Swagger UI or ${address}:${listener.address().port}/api-docs.json to get api-docs.json **`);
        });
    }
});
