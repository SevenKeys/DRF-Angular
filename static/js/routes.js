(function(){
  'use strict';

  var postRoutes = angular.module('post.routes', ['ngRoute']);
    
  postRoutes.config(['$routeProvider', function($routeProvider){
	$routeProvider
	  .when('/', {
		templateUrl: '/static/post_templates/layout.index.html',
		controller: 'IndexController'
	  })
	  .when('/new-post', {
		templateUrl: '/static/post_templates/new-post.html',
		controller: 'NewPostController'
	  })
	  .when('/register', {
		templateUrl: '/static/post_templates/register.html',
		controller: 'RegisterController'
	  })
	  .when('/login', {
		templateUrl: '/static/post_templates/login.html',
		controller: 'LoginController'
	  })
	  .when('/:id', {
		templateUrl: '/static/post_templates/profile.html',
		controller: 'ProfileController'
	  })
	  .when('/:id/settings', {
		templateUrl: '/static/post_templates/profile-settings.html',
		controller: 'ProfileSettingsController'
	  })
	  .otherwise({
		redirectTo: '/'
	  })
	}
  ]);
})();