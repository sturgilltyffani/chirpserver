var express = require("express");
var base = 'api/posts';
var app = express();
var path = require("path");
var fs = require("fs");
var bp = require("body-parser");
var ID = require("shortid");
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
app.get(base, function (req, res) {
    fs.readFile(dataPath, 'utf-8', function (error, content) {
        res.send(content);
    });
});

app.post(base, function(req, res) {
    fs.readFile(dataPath, 'utf-8', function (error, content) {
        var jsonContent = JSON.parse(content);
        var chirp = req.body;
        var id = ID.generate();
        chirp.id = id; 
        fp.push(chirp);
        fs.writeFile(dataPath, JSON.stringify(fp), function (error) {
            if (error)
                throw error;
            res.status().send(id).end();
        });
    });

});

app.get(base + "/:id", function(req, res) {
    //do something

});

app.post(function(req, res) {
    //do something 

});

app.delete(base + "/:id", function(req, res) {
    //do something

});

app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});