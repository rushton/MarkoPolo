'use strict';

var myapp = angular.module('markopoloApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'MainCtrl'
      })
      .when('/', {
         templateUrl: 'views/landing.html'
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
