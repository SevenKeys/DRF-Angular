(function(){
  'use strict';

  var postCtrl = angular.module('layout.controllers',[]);

  postCtrl.controller('IndexController', ['$scope', 'Posts', 'Authentication', 'Snackbar',
  	function($scope, Posts, Authentication, Snackbar){
      $scope.isAuthenticated = Authentication.isAuthenticated();
  	  $scope.posts = [];
  	  activate();

  	  function activate(){
  	  	Posts.all().then(PostsSuccessFn, PostsErrorFn);

  	  	function PostsSuccessFn(data, status, headers, config){
  	  	  $scope.posts = data.data;
  	  	}
  	  	function PostsErrorFn(data, status, headers, config){
  	  	  Snackbar.error(data.error);
  	  	}
  	  }
  	}])
})();