(function () {
  'use strict';

  var authService = angular.module('authentication.services',['ngCookies']);

  authService.factory('Authentication', ['$http', '$cookies', 'Snackbar', 
    function($http, $cookies, Snackbar){
      var Authentication = {
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
        register: register,
        getAuthenticatedAccount: getAuthenticatedAccount,
        setAuthenticatedAccount: setAuthenticatedAccount,
        unauthenticate: unauthenticate
      }
      return Authentication;

      // check user is authenticated
      function isAuthenticated(){
        return !!$cookies.get('authenticatedAccount');
      }
      function login(username, password){
        return $http.post('/api/login/',{
          username: username,
          password: password
        }).then(LoginSuccessFn, LoginErrorFn);
        function LoginSuccessFn(data, status, headers, config){
          Authentication.setAuthenticatedAccount(data.data);
          window.location = '/';
        }
        function LoginErrorFn(data, status, headers, config){
          Snackbar.error('You are entered wrong data');
        }
      }
      function logout(){
        return $http.post('/api/logout/')
        .then(LogoutSuccessFn, LogoutErrorFn);
        function LogoutSuccessFn(data, status, headers, config){
          Authentication.unauthenticate();
          window.location = '/';
        }
        function LogoutErrorFn(data, status, headers, config){
          Snackbar.error('Logout failure');
        }
      }
      function register(username, email, password) {
        return $http.post('/api/accounts/', {
          username: username,
          email: email,
          password: password
        }).then(registerSuccessFn, registerErrorFn);
        function registerSuccessFn(data, status, headers, config) {
          Authentication.login(username, password);
          Snackbar.show('Congratulations, you are registered!');
        }
        function registerErrorFn(data, status, headers, config) {
          Snackbar.error('Register failure!');
          if(Authentication.isAuthenticated()){
            console.log('Account exists');
          }
        }
      }
      // return authenticated account or underfined
      function getAuthenticatedAccount(){
        if(!$cookies.get('authenticatedAccount')){
          return;
        }
        return JSON.parse($cookies.get('authenticatedAccount'));
      }
      // set authenticated account
      function setAuthenticatedAccount(account){
        $cookies.put('authenticatedAccount', JSON.stringify(account));
      }
      function unauthenticate(){
        delete $cookies.remove('authenticatedAccount');
        Snackbar.show('Your account has been deleted!');
      }

  }]);
})();
