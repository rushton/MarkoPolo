'use strict';

angular.module('markopoloApp')
  .controller('MainCtrl', function ($scope,Geolocation) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    Geolocation.getLocation(function(pos){
       console.log(pos);
    })
  });
