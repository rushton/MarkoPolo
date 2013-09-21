'use strict';

var myapp = angular.module('markopoloApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  myapp.config(['$httpProvider', function($httpProvider) {
             $httpProvider.defaults.useXDomain = true;
                     delete $httpProvider.defaults.headers.common['X-Requested-With'];
                         }
  ]);
