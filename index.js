var express = require("express");
var base = '/api/chirps';
var app = express();
var path = require("path");
var fs = require("fs");
var bp = require("body-parser");
var shortid = require("shortid");
var dataPath = path.join(__dirname, 'data.json');

app
    .disable('x-powered-by')
    .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, UPDATE, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    next();
})
    .use(bp.json())
    .use(bp.urlencoded({ extended: true }));
    
app.route('/api/chirps')
    .get(function (req, res) {
        fs.readFile(dataPath, 'utf-8', function (error, content) {
       
            res.send(content);
        });
    })

    .post(function(req, res) {
    fs.readFile(dataPath, 'utf-8', function (error, content) {
        var jsonContent = JSON.parse(content);
        var chirp = req.body;
        var id = shortid.generate();
        chirp.id = id; 
        jsonContent.push(chirp);
        fs.writeFile(dataPath, JSON.stringify(jsonContent), function (error) {
            if (error)
                throw error;
            res.status(201).send(chirp).end();
        });
    });

});

app.route('/api/chirps/:id')
    .get(function(req, res) {
        fs.readFile(dataPath, 'utf-8', function (error, content) {
            var jsonContent = JSON.parse(content);
            var found = jsonContent.filter(function (post) { return post.id === req.params.id; });
            if (found.length !== 1) {
                res.status(404).end();
                return;
            }
            var post = JSON.stringify(found[0]);
            res.send(post).end();
        });
    })

    .delete(function(req, res) {
    fs.readFile(dataPath, 'utf-8', function (error, content) {
        var jsonContent = JSON.parse(content);
        var foundIndex = -1;
        jsonContent.map(function (post, i) {
            if (post.id === req.params.id) {
                foundIndex = i;
            }
        });
        if (foundIndex === -1) {
            res.status(404).end();
            return;
        }
        jsonContent.splice(foundIndex, 1);
        fs.writeFile(dataPath, JSON.stringify(jsonContent), 'utf-8', function (error) {
            if (error)
                throw error;
            console.error(error);
            res.status(202).end();
        });
    });
});

app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});