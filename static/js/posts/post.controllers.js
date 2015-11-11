(function () {
  'use strict';

  var postCtrl = angular.module('post.controllers',[]);

  postCtrl.controller('PostController', ['$scope', function($scope){
    // split post body into columns
    var text = $scope.scopePost.body,
        total = text.length,
        number_cols = Math.ceil(total/50),
        text_columns = [];
    for(var i=0; i <= number_cols; i++){
      var total_col = 0,
          column = text.substr(0,65);
      total_col += column.length;
      text = text.slice(total_col);
      text_columns.push(column);
    }
    $scope.columns = text_columns;
  }])

  postCtrl.controller('NewPostController', ['$scope', '$location', 'Posts', 'Authentication', 'Snackbar',
  	function($scope, $location, Posts, Authentication, Snackbar){
  	  $scope.submit = function(){
  		var data = {
  			title: $scope.title,
  			body: $scope.body,
  	  	    owner: Authentication.getAuthenticatedAccount().username
  		};
  	    Posts.create(data).then(newPostSuccessFn, newPostErrorFn);

  	    function newPostSuccessFn(data, status, headers, config){
  	  	  $location.url('/');
          Snackbar.show('New post was added successfully!')
  	    }
  	    function newPostErrorFn(data, status, headers, config){
  	  	  Snackbar.error(data.error);
  	    }
  	  };
  	}])
  
})();