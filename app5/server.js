
var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');
var apiRoutes         = require('./routes/api.js');
var helmet            = require('helmet');

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(helmet.noSniff());
app.use(helmet.xssFilter({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/').get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

apiRoutes(app);  
 

app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
});

