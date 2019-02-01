
var express = require('express');
var app = express();
var path = require('path');
const port = 8000;

app.use(express.static(__dirname + '/dist/'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));