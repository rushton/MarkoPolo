'use strict';

angular.module('markopoloApp')
  .controller('MainCtrl', function ($scope, Facebook, Geolocation) {
    $scope.user = Facebook.getUser(FB);
    Geolocation.getLocation(function(pos){
       console.log(pos);
    })
  });
