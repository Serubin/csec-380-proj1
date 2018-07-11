const express = require('express');
const elasticsearch = require('elasticsearch');

const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

const app = express();
let els = null; // Populate on ping

const INDEX = 'skitdata';
const TYPE = 'skit';
function server (testing) {

    if (typeof testing == "undefined")
        testing = false;

    /**
    * Dynamic elastic search connection
    */
    function createElasticConnection () {

        if (testing) {
            function genPromise() {
                return new Promise(function(resolve, reject) { reject("No els"); });
            }

            els = {
                search: function() { return genPromise(); },
                index: function() { return genPromise(); },
                delete: function() { return genPromise(); }
            };

            return;
        }

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
        res.send("Skit core api");
    })

    /**
    * Get's all skits
    */
    app.get('/getskits', (req, res) => {
        let body = {};

        if(req.query.user) {
            let users = [];

            if(!(req.query.user.constructor === Array))
                users = [ req.query.user ];
            else
                users = req.query.user;

            body = {
                body: {
                    query: {
                        terms: {
                            user: users
                        }
                    }
                }
            };
        }

        els.search({
            index: INDEX,
            type: TYPE,
            ... body
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
        let user = null;

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
                replies: [],
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

    app.listen(7000, () => console.log("Starting server on port 7000"))
    return app;
}

module.exports = server;
