var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function (req, res, next) {
    "use strict";
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, " +
        "If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, " +
        "X-E4M-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
});

var dao = require('./dao');

app.get('/', function (req, res) {
    var fromID = req.query.fromID || 1;
    dao.select(fromID).then(function (result) {
        "use strict";
        res.send(result);
    });
});

app.post('/', function (req, res) {
    "use strict";
    var name = req.body.name;
    if (!name) {
        res.send({
            code: 400,
            message: '用户名未填写'
        });
        return;
    }
    var content = req.body.content;
    if (!content) {
        res.send({
            code: 400,
            message: '内容未填写'
        });
        return;
    }
    dao.insert(name, content).then(function () {
        res.send({
            code: 200,
            message: 'SUCCESS'
        });
    });
});

app.options('/', function (req, res) {
    "use strict";
    res.send();
});

app.listen(3000);