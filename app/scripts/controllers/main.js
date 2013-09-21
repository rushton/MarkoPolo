'use strict';

angular.module('markopoloApp')
  .controller('MainCtrl', function ($scope, Facebook, Geolocation, Locationposter) {
    $scope.user = Facebook.getUser(FB);
    Geolocation.getLocation(function(place){
       $scope.location = place;
       Locationposter.save({lat: place.coords.latitude, long: place.coords.longitude, user_id: 0})
       $scope.$apply()
    })

    var friendPromise = Facebook.getFriends(FB);
    friendPromise.then(function(data) {
      $scope.friends = data.data;
    });
  });
