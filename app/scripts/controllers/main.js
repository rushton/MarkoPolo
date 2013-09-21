'use strict';

angular.module('markopoloApp')
  .controller('MainCtrl', function ($scope, Facebook, Geolocation) {
    $scope.user = Facebook.getUser(FB);
    Geolocation.getLocation(function(place){
       $scope.location = place;

       var friendPromise = Facebook.getFriends(FB);
       var fbusers = [{location:{name:'Ballard, WA'}}].filter(function(v,k) {
          return v.location && v.location.name;
       });
       Geolocation.findNearby({lat:place.coords.latitude, long:place.coords.longitude},fbusers, 5).then(function(d) { 
          console.log(d);  
       });
       friendPromise.then(function(data) {
         $scope.friends = data.data;
         //Geolocation.findNearby(place,data.data);
       });
    })

  });
