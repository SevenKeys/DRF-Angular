(function(){
  'use strict';

  angular.module('postApp',
    ['post.routes',
    'authentication.services',
    'post.config',
    'authentication.controllers',
    'post.services',
    'post.controllers',
    'layout.controllers',
    'post.directives',
    'profile.services',
    'profile.controllers',
    'snackbar.services',
    'angularUtils.directives.dirPagination'
    ]);

})();