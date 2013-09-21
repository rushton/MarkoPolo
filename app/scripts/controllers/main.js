'use strict';

angular.module('markopoloApp')
  .controller('MainCtrl', function ($scope,Geolocation, Location) {
    //$scope.user = Facebook.getUser(FB);
    //console.log($scope.user);
    $scope.user_id = 0
    Geolocation.getLocation(function(pos){
       console.log(pos);
    })

    Geolocation.getLocation(function(place){
       $scope.location = place;
       var doc = {name: 'nick', place: place, user_id: 1};
       Location.save(doc) 
       $scope.$apply()
    })

    Location.find($scope.user_id).then(function(rows) {
       $scope.people = rows.data;
    });
  });
