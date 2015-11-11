(function(){
  'use strict';

  var profileCtrl = angular.module('profile.controllers', []);

  profileCtrl.controller('ProfileController', ['$scope', '$location', '$routeParams', 'Posts', 'Profile', 'Snackbar',
  	function($scope, $location, $routeParams, Posts, Profile, Snackbar){
  	  $scope.profile = undefined;
  	  $scope.posts = [];
  	  activate();

  	  function activate(){
  	  	var username_id = $routeParams.id;
        Posts.get(username_id).then(PostsSuccessFn, PostsErrorFn);
  	  	Profile.get(username_id).then(ProfileSuccessFn, ProfileErrorFn);

  	  	function PostsSuccessFn(data, status, headers, config){
  	  	  $scope.posts = data.data;
  	  	}
  	  	function PostsErrorFn(data, status, headers, config){
  	  	  Snackbar.error('Can not get posts');
  	  	}
  	  	function ProfileSuccessFn(data, status, headers, config){
  	  	  $scope.profile = data.data;
  	  	}
  	  	function ProfileErrorFn(data, status, headers, config){
  		    $location.url('/');
  	  	  Snackbar.error('Can not get profile data');
  	  	}
  	  }
  	}])

   profileCtrl.controller('ProfileSettingsController', ['$scope', '$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar',
   	function($scope, $location, $routeParams, Authentication, Profile, Snackbar){
   	  activate();

   	  function activate(){
   	  	var authenticatedAccount = Authentication.getAuthenticatedAccount();
   	  	var username_id = $routeParams.id;

   	  	if(!authenticatedAccount){
   	  	  $location.url('/');
   	  	  Snackbar.error('You are not authorized to view this page. Please log in');
   	  	}else{
   	  	  if(String(authenticatedAccount.id) !== username_id){
   	  	  	$location.url('/');
   	  	  	Snackbar.error('You are not authorized to view this page.')
   	  	  }
   	  	}
   	  	Profile.get(username_id).then(ProfileSuccessFn, ProfileErrorFn);
   	  	function ProfileSuccessFn(data, status, headers, config){
   	  	  $scope.profile = data.data;
   	  	}
   	  	function ProfileErrorFn(data, status, headers, config){
   	  	  $location.url('/');
   	  	  Snackbar.error('User does not exists');
   	  	}
   	  }
   	  $scope.destroy = function(){
   	  	Profile.destroy($scope.profile).then(ProfileSuccessFn, ProfileErrorFn);
   	  	function ProfileSuccessFn(data, status, headers, config){
   	  	  Authentication.unauthenticate();
   	  	  window.location = '/';
   	  	}
   	  	function ProfileErrorFn(data, status, headers, config){
   	  	  Snackbar.error(data.error);
   	  	}
   	  }
   	  $scope.update = function(){
   	  	Profile.update($scope.profile).then(ProfileSuccessFn, ProfileErrorFn);
   	  	function ProfileSuccessFn(data, status, headers, config){
            $location.url('/');
            Snackbar.show('Your profile is updated!');
   	  	}
   	  	function ProfileErrorFn(data, status, headers, config){
   	  	  Snackbar.error(data);
   	  	}
   	  }
   	}])

})();