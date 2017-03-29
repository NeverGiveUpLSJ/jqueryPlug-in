var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./db.sqlite3');

var exports = module.exports = {};

exports.insert = function (name, content) {
    "use strict";
    return new Promise(function (resolve, reject) {
        db.run('INSERT INTO COMMENT(NAME, CONTENT) VALUES(?, ?)', [name, content], resolve);
    });
};

exports.select = function (fromID) {
    "use strict";
    return new Promise(function (resolve, reject) {
        db.all('SELECT * FROM COMMENT WHERE ID >= ?', [fromID], function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
};