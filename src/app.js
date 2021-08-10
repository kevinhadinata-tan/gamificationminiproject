const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const routerApi = require('./routes/api');
const cors = require("cors");
const moment = require('moment');

moment.locale('id');

const app = express();

const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({ extended: false });

dotenv.config();

app.use(cors('*'));

app.use(jsonParser);
app.use(urlParser);

app.use('/api/v1', routerApi());
app.use('/static', express.static('./src/public'));

// 404
app.use(function (req, res, next) {
    res.status(404).send('Not Found');
});

// 500
app.use(function (err, req, res, next) {
    if (err) {
        console.error(err.stack);
    }

    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server running on http://localhost:${port}`);
});