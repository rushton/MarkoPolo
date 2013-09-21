'use strict';

angular.module('markopoloApp')
  .controller('MainCtrl', function ($scope, Facebook, Geolocation) {
    $scope.user = Facebook.getUser(FB);
    $scope.selectedFriends = {};
    $scope.showFriendList = true;

    $scope.spamMe = function() {
        $scope.showFriendList = false;
        console.log($scope.selectedFriends);
    };

    Geolocation.getLocation(function(place){
       $scope.location = place;

       var friendPromise = Facebook.getFriends(FB);
       friendPromise.then(function(data) {
         $scope.friends = data.data;
         Geolocation.findNearby(place.coords,data.data, 5).then(function(d) { 
            console.log(d)
         })
         //Geolocation.findNearby(place,data.data);
       });
       var friendPromise = Facebook.getFriendsLocal(FB);
       friendPromise.then(function(data) {
         $scope.friends = data.data;
       });


    })
  });
