const express = require('express');
const elasticsearch = require('elasticsearch');

const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

const app = express();
let els = null; // Populate on ping

const INDEX = 'skit';
const TYPE = 'skitdata';

/**
 * Dynamic elastic search connection
 */
function createElasticConnection () {
    console.log("Attempting connection")
    els = new elasticsearch.Client({
        host: 'elk:9200',
        requestTimeout: Infinity,
        keepAlive: true
    });

    els.ping({
        requestTimeout: 2500,
    }, (error) => {
        console.log("Attempting connection to elastic search failed, retrying")
        if (error)
            setTimeout(createElasticConnection, 2500)
    });

}
createElasticConnection();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.sendFile('static/index.html');
})

/**
 * Get's all skits
 */
app.get('/getskits', (req, res) => {

    els.search({
        index: INDEX,
        type: TYPE
    }).then((resp) => {
        const hits = [];

        for (hit of resp.hits.hits)
            hits.push({id: hit._id, ...hit._source});

        res.send({result: 200, total: resp.hits.total, data: hits });
    }).catch((err) => res.status(500).send( {error: err} ));

});

/**
 * Add new skit
 * @param skit - skit content (max char 140)
 */
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

/**
 * Remove skit by id
 * @param id - skit id
 */
app.delete('/removeskit', (req, res) => {
    if(!req.body.id)
        return res.status(400).send({ error: "missing parameter: id"});

    els.delete({
        index: INDEX,
        type: TYPE,
        id: req.body.id
    }).then((resp) => {
        res.send({result: 204, id: req.body.id})
    }).catch((err) => res.status(500).send( {error: err} ));

});

app.listen(3000, () => console.log("Starting server on port 3000"))
