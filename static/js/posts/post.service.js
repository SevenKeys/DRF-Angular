(function(){
  'use strict';

  var postService = angular.module('post.services',['ngResource']);

  postService.factory('Posts', ['$http', function($http){
    var Posts = {
      all: all,
      create: create,
      get: get
    };
    return Posts;

    function all(){
      return $http.get('/api/posts/');
    }
    function create(content){
      return $http.post('/api/posts/', content);
    }
    function get(id){
      return $http.get('/api/accounts/' + id + '/posts/');
    }
  }])
  
})();