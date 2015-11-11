(function ($, _) {
  'use strict';

  var snackService = angular.module('snackbar.services', []);

  snackService.factory('Snackbar', function () {
    
    var Snackbar = {
      error: error,
      show: show
    };
    return Snackbar;

    function _snackbar(content, options) {
      options = _.extend({ timeout: 3000 }, options);
      options.content = content;

      $.snackbar(options);
    }
    function error(content, options) {
      _snackbar('Error: ' + content, options);
    }
    function show(content, options) {
      _snackbar(content, options);
    }
  });

})($, _);