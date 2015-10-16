let moment = require('moment');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'));
let _ = require('lodash');
let path = require('path');

// get next file named invoice-2015-###.html
function makeNextInvoiceName(files) {
    let biggest = _.reduce(files, function (result, file) {
        let m = file.match(/^invoice-2015-(\d\d\d)\.html$/i);
        if (m && m.length > 1) {
            let fileNumber = parseInt(m[1]);
            if (fileNumber > result) {
                result = fileNumber;
            }
        }
        return result;
    }, 0);
    let number = biggest + 1;
    number = _.padLeft(number, 3, '0');
    return `invoice-2015-${number}.html`;
}

fs.readdirAsync('f:\\tmp\\invoices')
    .then(files => makeNextInvoiceName(files))
    .then(name => console.log(name))
    .catch((e) => console.log('bummer ' + e));

