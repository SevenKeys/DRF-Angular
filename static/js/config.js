(function(){
  'use strict';

  var postConfig = angular.module('post.config',['ngResource']);

  postConfig.config(['$resourceProvider', '$httpProvider', '$locationProvider',
    function($resourceProvider, $httpProvider, $locationProvider) {
      // Django and Angular both supports tokens. That tell angular
      // which csrf token should use
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
      // Don't strip trailing slashes from calculated URLs
      $resourceProvider.defaults.stripTrailingSlashes = false;
      // Delete hash from url
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
  }]);

  // Pagination path to html, second way
  // postConfig.config(function(paginationTemplateProvider) {
    // paginationTemplateProvider.setPath(
      // '/static/bower_components/angularUtils-pagination/dirPagination.tpl.html');
  // });

})();