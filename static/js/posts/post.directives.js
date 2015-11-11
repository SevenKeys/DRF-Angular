(function(){
  'use strict';

  var postDir = angular.module('post.directives', []);

  postDir.directive('userpost', function(){
  	var directive = {
      controller: 'PostController',
      restrict: 'E',
      scope: {
        scopePost: '=info'
      },
      templateUrl: '/static/post_templates/posts.html'
    };
  	return directive;
  })

})();