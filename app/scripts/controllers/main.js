'use strict';

angular.module('markopoloApp')
  .controller('MainCtrl', function ($scope,Geolocation, Locationposter) {
    $scope.user = Facebook.getUser(FB);
    Geolocation.getLocation(function(pos){
       console.log(pos);
    })

    Geolocation.getLocation(function(place){
       $scope.location = place;
       Locationposter.save({lat: place.coords.latitude, long: place.coords.longitude, user_id: 0}) 
       $scope.$apply()
    })
  });
