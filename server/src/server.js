'use strict';
var express = require('express');
var logger = require('morgan');
var api = require('./routes/api');
var app = express();
var top = 'C:\\SlowData\\invoices';
app.use(logger('tiny'));
app.use('/api', api);
app.use(express.static('./reactor/dist'));
app.use('/invoices', express.static(top));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('reactor listening at http://%s:%s', host, port);
});
