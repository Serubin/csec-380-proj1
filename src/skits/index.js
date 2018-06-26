const express = require('express');
const elasticsearch = require('elasticsearch');

const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

const app = express();
const els = new elasticsearch.Client({
    host: 'localhost:9200',
    requestTimeout: Infinity,
    keepAlive: true
});

const INDEX = 'skit';
const TYPE = 'skitdata';

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.sendFile('static/index.html');
})

app.post('/addskit', (req, res) => {
    if(!req.body.skit)
        return res.status(400).send({ error: "missing parameter: skit"});

    if (req.body.skit.length > 140)
        return res.status(400).send({ error: "skit is too long"});


    els.index({
        index: INDEX,
        type: TYPE,
        body: {
            user: 0,
            content: req.body.skit,
            timestamp: new Date().toJSON()
        }
    }).then((resp) => {
        res.send({result: 201, id: resp._id})
    }).catch((err) => res.status(500).send( {error: err} ));

});

app.listen(3000, () => console.log("Starting"))
