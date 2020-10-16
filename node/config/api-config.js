
const express = require('express');
const bodyParser = require('body-parser');
const corsFilter = require('../filters/cors.filter');

const registerController = require('../app/controller/registrationController');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


corsFilter(router);
app.use('/apis',router);


registerController.init(router);
const apiConfig={
    app:app
}

module.exports = apiConfig;