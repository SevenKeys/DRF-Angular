(function(){
  'use strict';

  var authController = angular.module('authentication.controllers', []);

  authController.controller('RegisterController', ['$scope', 'Authentication', 
  	function($scope, Authentication){
  	  $scope.register = function(){
  	    Authentication.register($scope.username, $scope.email, $scope.password);
  	  };
  }]);

  authController.controller('LoginController', ['$scope', '$location', 'Authentication',
  	function($scope, $location, Authentication){
	  // if user has already authenticated redirect him to main page 
  	  activate();
  	  function activate(){
  	  	if(Authentication.isAuthenticated()){
  	  	  $location.url('/');
  	  	};
  	  };
  	  $scope.login = function (){
  	  	Authentication.login($scope.username, $scope.password);
  	  };
  	}]);

  authController.controller('LogoutController', ['$scope', 'Authentication',
  	function($scope, Authentication){
  	  $scope.logout = function(){
		    Authentication.logout();
  	  };
  	}]);

})();