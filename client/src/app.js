let jQuery = require('jquery');
let ko = require('knockout');

var app = (function($) {
  'use strict';
  var me;

  function generateClicked() {
    $.ajax({
      method: 'POST',
      url: '/api/invoice',
      contentType: 'application/json',
      dataType: 'json',
      data: ko.toJSON(me.model)
    })
    .then(()=>alert('ok'))
    .fail(()=>alert('failed'));
  }

  function initialize() {
    me.model = {
      rate: ko.observable(73),
      hours: ko.observable(),
      period: ko.observable(),
      number: ko.observable('2015-0'),
      generateClicked: generateClicked
    };

    let el = $('#main')[0];
    ko.applyBindings(me.model, el);

    me.model.period('September');
  }

  me = {
    initialize: initialize
  };

  return me;
}(jQuery));


jQuery(document).ready(app.initialize);
