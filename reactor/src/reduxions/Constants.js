
var keyMirror = require('react/lib/keyMirror');

export var Actions = keyMirror({
    AsyncStarted: null,
    AsyncFailed: null,
    AsyncFinished: null,
    GenerateInvoice: null,
    InvoiceStarted: null,
    InvoiceGenerated: null
});
