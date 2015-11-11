(function(){
  'use strict';

  var profileService = angular.module('profile.services', []);

  profileService.factory('Profile', ['$http', function($http){
  	var Profile = {
  	  destroy: destroy,
  	  get: get,
  	  update: update
  	}
  	return Profile;

  	function destroy(profile){
  	  return $http.delete('/api/accounts/' + profile.id + '/');
  	}
  	function get(id){
  	  return $http.get('/api/accounts/' + id + '/');
  	}
    // on updating we must use "put" not "post"
  	function update(profile){
  	  return $http.put('/api/accounts/' + profile.id + '/', profile);
  	}
  }])

})();